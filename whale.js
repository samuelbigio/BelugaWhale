
var rotate_deg = 0;
var solo_whale_rotate_deg =0
var solo_whale_rotate_rate = 0
var x_momentum = 40;
var y_momentum = 30;
var rotate_rate = 3;
const  MAX_MOMENTUM = 30
const  SOLO_WHALE_MAX_MOMENTUM = 35
var SOLO_whale_state = "Y_direction"
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
    img = document.getElementById('image');
    barewhale_img = document.getElementById('barewhale');
    img_y = parseInt(img.style.top);
    img_x = parseInt(img.style.left);
    barewhale_y = parseInt(barewhale_img.style.top);
    barewhale_x = parseInt(barewhale_img.style.left);

    // EVADE Check if img is close enough to evade if not go to the center
    if (Math.abs(barewhale_x - img_x) + Math.abs(barewhale_y - img_y)  < img.width*6)
    {

        if (img_y>= barewhale_y)
        {
            new_y = -SOLO_WHALE_MAX_MOMENTUM
        }
        else{
            new_y = SOLO_WHALE_MAX_MOMENTUM
        }

        if (img_x>= barewhale_x)
        {
            new_x = -SOLO_WHALE_MAX_MOMENTUM
            //if (img_x + img.width*2 > barewhale_x)
               // barewhale_img.style.transform = "rotateY(0deg)"
        }
        else
        {
            new_x = SOLO_WHALE_MAX_MOMENTUM
            //if (img_x - img.width*2 < barewhale_x)
              //  barewhale_img.style.transform = "rotateY(180deg)";

        }

    }
    else
    {
        console.log(barewhale_x + " " +window.innerWidth/2 )
        if (barewhale_x > window.innerWidth/2)
            new_x= -SOLO_WHALE_MAX_MOMENTUM
        else
            new_x = SOLO_WHALE_MAX_MOMENTUM

         if (barewhale_y > window.innerHeight/2)
            new_y= -SOLO_WHALE_MAX_MOMENTUM
        else
            new_y= SOLO_WHALE_MAX_MOMENTUM

    }



    new_x = new_x + barewhale_x
    new_y = new_y + barewhale_y

    if (new_x + barewhale_img.width >= window.innerWidth)
    {

        new_x = barewhale_x // barewhale_img.width/2
    }

    else if (new_x + barewhale_img.width <= 0)
    {
         new_x = barewhale_x

    }

    if (new_y + barewhale_img.height >= window.innerHeight){

        new_y =  barewhale_y // barewhale_img.height/2
    }
    else if (new_y + barewhale_img.height <= 0)
    {
        new_y =   barewhale_y

    }


    console.log(new_x + " " + new_y)
    barewhale_img.style.left = new_x + "px";
    barewhale_img.style.top = new_y + "px";


}
function whale_moves2()
{
    img = document.getElementById('image');
    barewhale_img = document.getElementById('barewhale');
    img_y = parseInt(img.style.top);
    img_x = parseInt(img.style.left);
    barewhale_y = parseInt(barewhale_img.style.top);
    barewhale_x = parseInt(barewhale_img.style.left);

    // EVADE Check if img is close enough to evade if not go to the center
    if (Math.abs(barewhale_x - img_x) + Math.abs(barewhale_y - img_y)  < img.width*6)
    {

        if (img_y>= barewhale_y + img.height  * 2 )
        {
            new_y = -SOLO_WHALE_MAX_MOMENTUM
        }
        else if (img_y<= barewhale_y - img.height * 2){
            new_y = SOLO_WHALE_MAX_MOMENTUM
        }
        else new_y = 0



        if (img_x>= barewhale_x + img.width * 2)
        {
            new_x = -SOLO_WHALE_MAX_MOMENTUM
            //if (img_x + img.width*2 > barewhale_x)
               // barewhale_img.style.transform = "rotateY(0deg)"
        }
        else if (img_x<= barewhale_x - img.width  *2)
        {
            new_x = SOLO_WHALE_MAX_MOMENTUM
            //if (img_x - img.width*2 < barewhale_x)
              //  barewhale_img.style.transform = "rotateY(180deg)";

        }
        else new_x = 0

    }
    else
    {
        console.log(barewhale_x + " " +window.innerWidth/2 )
        if (barewhale_x > window.innerWidth/2)
            new_x= -SOLO_WHALE_MAX_MOMENTUM
        else
            new_x = SOLO_WHALE_MAX_MOMENTUM

         if (barewhale_y > window.innerHeight/2)
            new_y= -SOLO_WHALE_MAX_MOMENTUM
        else
            new_y= SOLO_WHALE_MAX_MOMENTUM

    }



    new_x = new_x + barewhale_x
    new_y = new_y + barewhale_y
    // Boundary check
    if (new_x + barewhale_img.width >= window.innerWidth)
    {

        new_x = barewhale_x // barewhale_img.width/2
    }

    else if (new_x + barewhale_img.width <= 0)
    {
         new_x = barewhale_x

    }

    if (new_y + barewhale_img.height >= window.innerHeight){

        new_y =  barewhale_y // barewhale_img.height/2
    }
    else if (new_y + barewhale_img.height <= 0)
    {
        new_y =   barewhale_y

    }


    console.log(new_x + " " + new_y)
    if (SOLO_whale_state == 'Y_direction')
    {
        barewhale_img.style.left = new_x + "px";
        SOLO_whale_state = 'X_direction'

    }
    else
    {
        barewhale_img.style.top = new_y + "px";
        SOLO_whale_state = 'Y_direction'


    }


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