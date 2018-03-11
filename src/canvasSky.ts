class canvasSky{
private skySettings:any = {
  colors: ['#100046','#b2541e'],
  stars:{
    count: 250,
    minSize: 1,
    maxSize: 3,
    color: '#ffffff'
  }
};

private canvas : HTMLCanvasElement;
private ctx : CanvasRenderingContext2D;

constructor(){
  this.canvas = <HTMLCanvasElement> document.getElementById("sky");
  this.ctx = this.canvas.getContext("2d");
  this.init();
};

private init(){
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
