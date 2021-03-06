class canvasSky{
private settings:any;
private canvas : HTMLCanvasElement;
private ctx : CanvasRenderingContext2D;

constructor(elementId:string, configFile:string = null){
  this.canvas = <HTMLCanvasElement> document.getElementById(elementId);
  this.ctx = this.canvas.getContext("2d");
  if(configFile === null){
    this.loadDefaultConfig();
  }else{
    this.loadConfig(configFile);
  }
};

private loadConfig(configFile:string):void{
  var request = new XMLHttpRequest();
  request.onload = () => {
    this.settings = JSON.parse(request.responseText);
    this.init();
  };
  request.open("get", configFile, true);
  request.send();
};

private init():void{
//resize canvas
this.canvas.width = this.getWidth();
this.canvas.height = this.getHeight();

//redraw canvas on window resize if mode = responsive
if(this.settings.mode === 'responsive'){
  window.addEventListener('resize', () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = this.getWidth();
    this.canvas.height = this.getHeight();
    this.drawStars();
  }, true);
}

//set background color
this.canvas.setAttribute("style", "background: linear-gradient("+this.appendColors(this.settings.colors)+")");

this.drawStars();
};

private appendColors(colors:Array<string>):string{
  if(colors.length === 1)
    return colors[0];

  var str = colors[0];
  for(var i = 1; i<colors.length; i++){
    str += (", " + colors[i]);
  }
  return str;
};

private drawStars():void{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var j, dot;
    for(j = 0; j < this.settings.stars.count; j++) {
      this.ctx.beginPath();
      this.ctx.arc(Math.random() * this.canvas.width, Math.random() * this.canvas.height, Math.random() * (this.settings.stars.minSize - this.settings.stars.maxSize + 1) + this.settings.stars.minSize, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.settings.stars.color;
      this.ctx.fill();
    }
};

private getHeight():number{
  if(this.settings.size === "fullpage"){
    return window.innerHeight;
  }
  if(this.settings.size.height.slice(-1) === "%"){
    return window.innerHeight / 100 * this.settings.size.height.substring(0, this.settings.size.height.length - 1);
  }
}

private getWidth():number{
  if(this.settings.size === "fullpage"){
    return window.innerWidth;
  }
  if(this.settings.size.width.slice(-1) === "%"){
    return window.innerWidth / 100 * this.settings.size.width.substring(0, this.settings.size.width.length - 1);
  }
}

private loadDefaultConfig():void{
this.settings = {
  size: {
    width: "100%",
    height: "50%"
  },
  mode: 'responsive',
  colors: ['#100046','#b2541e'],
  stars:{
    count: 250,
    minSize: 1,
    maxSize: 3,
    color: '#ffffff'
  }
};
this.init();
}

};
