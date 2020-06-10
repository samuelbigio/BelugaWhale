
var rotate_deg = 0;
var x_momentum = 30;
var y_momentum = 20;
var rotate_rate = 3;
const  MAX_MOMENTUM = 30
var  SOLO_WHALE_MAX_MOMENTUM_X = 40
var SOLO_WHALE_MAX_MOMENTUM_Y = 40
var state = "SOLO"

function load_img(filename,id)
{
   var loaded_image = document.createElement('img');
  loaded_image.id = id;
  loaded_image.style.position = "absolute";
  loaded_image.style.transform = "rotate(" + rotate_deg + ")";

  document.body.appendChild(loaded_image);
  loaded_image.src = filename;
  return loaded_image


}

window.addEventListener('mousedown', e => {

      var img = document.getElementById('image');
      x_momentum = (e.offsetX - img.offsetLeft)/10
      y_momentum = (e.offsetY - img.offsetTop)/10

      if (x_momentum > MAX_MOMENTUM) x_momentum =  MAX_MOMENTUM;
      if (x_momentum < -MAX_MOMENTUM) x_momentum = -MAX_MOMENTUM
      if (y_momentum > MAX_MOMENTUM) y_momentum = MAX_MOMENTUM;
      if (y_momentum < -MAX_MOMENTUM) y_momentum = -MAX_MOMENTUM

      if (Math.abs(x_momentum) + Math.abs(y_momentum )> MAX_MOMENTUM ){
        rotate_rate = 15
        }
       else
       {
       rotate_rate = 3
       }
        //img.style.left = e.offsetX + "px";
        //img.style.top =  e.offsetY + "px";


} );

function tick(){
    mainMovement()
    collesion()
    if (state = "SOLO")
        whale_moves()
}

function whale_moves()
{
    /*
    Whale changes direction when it hits the window border. flip whale momentum by opposite direction to
    mimic bouncing off border
    (look into scaling the momentum by window size)
    */
    img = document.getElementById('image');
    barewhale_img = document.getElementById('barewhale');
    img_y = parseInt(img.style.top);
    img_x = parseInt(img.style.left);
    barewhale_y = parseInt(barewhale_img.style.top);
    barewhale_x = parseInt(barewhale_img.style.left);



    new_x = barewhale_x - SOLO_WHALE_MAX_MOMENTUM_X
    new_y = barewhale_y  - SOLO_WHALE_MAX_MOMENTUM_Y

    if (new_x < 0  || new_x + barewhale_img.width > window.innerWidth  )
        SOLO_WHALE_MAX_MOMENTUM_X *= -1


    if (new_y < 0 || new_y + barewhale_img.height > window.innerHeight )
        SOLO_WHALE_MAX_MOMENTUM_Y *= -1

    console.log(new_x + " " + new_y)
    barewhale_img.style.left = new_x + "px";
    barewhale_img.style.top = new_y + "px";


}


function collesion(){
let img = document.getElementById('image')
let barewhale_img = document.getElementById('barewhale')

barewhale_y = parseInt(barewhale_img.style.top)
barewhale_x = parseInt(barewhale_img.style.left)
img_y = parseInt(img.style.top)
img_x = parseInt(img.style.left)

if (img_x + barewhale_img.width >= barewhale_x && img_x <= barewhale_x + barewhale_img.width  &&
 img_y + barewhale_img.height >= barewhale_y && img_y <= barewhale_y + barewhale_img.height  )
 {
    img.src = "both.png"
    state = "BOTH"
    barewhale_img.style.visibility = 'hidden'


  }
}

function mainMovement(){
         var img = document.getElementById('image')


         rotate_deg += rotate_rate % 360
         img.style.transform =  "rotate(" + rotate_deg + "deg)";


         new_x = img.offsetLeft  + x_momentum
         new_y = img.offsetTop  +  y_momentum

         //alert(img.offsetTop + " " + img.width + " " + window.innerWidth + " " + new_x )

         if (new_x + img.width/2 >= window.innerWidth)
         {

            new_x = -img.width/2
         }

         else if (new_x + img.width/2 <= 0)
         {
             new_x = window.innerWidth - img.width/2

         }

         if (new_y + img.height/2 >= window.innerHeight){

            new_y = -img.height/2
         }
         else if (new_y + img.height/2 <= 0)
         {
             new_y = window.innerHeight - img.height/2

         }


         //console.log(window.innerWidth)
         img.style.left = new_x + "px";
          img.style.top = new_y + "px";



}


var timer = setInterval(tick, 50)

window.onload = function () {



    barewhale_img =  load_img('barewhale.png','barewhale')
    baresam = load_img('baresam.png','image')

    if (window.innerWidth < 1000)
        baresam.width = 50

    else
        baresam.width = 200


    barewhale_img.width = 100

    barewhale_y = window.innerHeight - (barewhale_img.width * 3)
    barewhale_x = window.innerWidth - (barewhale_img.width * 3)
    barewhale_img.style.left = barewhale_x + "px";
    barewhale_img.style.top = barewhale_y + "px";



}

/*


/*

document.addEventListener('mousemove', e =>
{
    document.body.innerHTML +=  window.innerWidth +  "  hello  " +  window.innerHeight;


});



*/