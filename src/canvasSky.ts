class canvasSky{
private skySettings:any = {
  size: 'fullpage',
  mode: 'responsive',
  colors: ['#100046','#b2541e'],
  stars:{
    count: 250,
    minSize: 1,
    maxSize: 3,
    color: '#ffffff'
  }
};

private settings:any;

private canvas : HTMLCanvasElement;
private ctx : CanvasRenderingContext2D;

constructor(){
  this.canvas = <HTMLCanvasElement> document.getElementById("sky");
  this.ctx = this.canvas.getContext("2d");
  this.loadConfig();
};

private loadConfig():void{
  var request = new XMLHttpRequest();
  request.onload = () => {
    this.skySettings = JSON.parse(request.responseText);
    this.init();
  };
  request.open("get", "src/settings.json", true);
  request.send();
}

private init(){
//resize canvas
if(this.skySettings.size === 'fullpage'){
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
}
//redraw canvas on window resize if mode = responsive
if(this.skySettings.mode === 'responsive'){
  window.addEventListener('resize', () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawStars();
  }, true);
}

//set background color
this.canvas.setAttribute("style", "background: linear-gradient("+this.appendColors(this.skySettings.colors)+")");

this.drawStars();
};

private appendColors(colors:Array<string>){
  if(colors.length === 1)
    return colors[0];

  var str = colors[0];
  for(var i = 1; i<colors.length; i++){
    str += (", " + colors[i]);
  }
  return str;
};

private drawStars(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    var j, dot;
    for(j = 0; j < this.skySettings.stars.count; j++) {
      this.ctx.beginPath();
      this.ctx.arc(Math.random() * this.canvas.width, Math.random() * this.canvas.height, Math.random() * (this.skySettings.stars.minSize - this.skySettings.stars.maxSize + 1) + this.skySettings.stars.minSize, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.skySettings.stars.color;
      this.ctx.fill();
    }
  }
};

window.onload = () => {new canvasSky()};
