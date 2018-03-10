const skySettings:any = {
  colors: ['#100046','#b2541e'],
  stars:{
    count: 250,
    minSize: 1,
    maxSize: 3,
    color: '#ffffff'
  }
}

var dots = [];

window.onload = init;

function init(){
//Get the canvas
var sky = document.getElementById("sky");
//set background
sky.setAttribute("style", "background: linear-gradient("+appendColors(skySettings.colors)+")");

createStars();
}

function appendColors(colors:any){
  console.log(colors);
  if(!Array.isArray(colors))
    return;
  if(colors.length === 1)
    return colors[0];

  var str = colors[0];

  for(var i = 1; i<colors.length; i++){
    str += (", " + colors[i]);
  }
  console.log(str);
  return str;
}

function createStars(){
    var canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("sky");
    var ctx : CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var j, dot;
    for(j = 0; j < skySettings.stars.count; j++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * (skySettings.stars.minSize - skySettings.stars.maxSize + 1) + skySettings.stars.minSize, 0, Math.PI * 2, false);
      ctx.fillStyle = skySettings.stars.color;
      ctx.fill();
    }
}
