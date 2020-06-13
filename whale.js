
var rotate_deg = 0;
var x_momentum = 30;
var y_momentum = 20;
var rotate_rate = 3;
const  MAX_MOMENTUM = 30
var  SOLO_WHALE_MAX_MOMENTUM_X = 40
var SOLO_WHALE_MAX_MOMENTUM_Y = 40
var STELLA_MAX_MOMENTUM_Y = 45
var STELLA_MAX_MOMENTUM_X = 50
var respawn_rate = 5
var state = "SOLO"
var both_state_count = 0
var food_list = []
var food_max = 4

/*
TODO:
1. rename barrewhale [DONE]
2. make movement more random
    change speed for stella (repurposed)
3. kill animation of whale
4. drop grapes and chocolate [DONE]
5. kill animation of stella
6. counter, increase stella speed in counter by 5
7. reset chaser to opposite corner [DONE] / kinda


new todo

1. make a dead period for stella and barewhale
2. make dead icon move a lil
3. clear foods when state changes/ food collision
4. remove food from html body
5. still need the counter
6. da song!

*/
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



function tick(){
    mainMovement()
    if (state == "SOLO")
        {
        whale_moves()
         collision()
        }

    // respawn rate of stella
    else if (state == "BOTH" && both_state_count <= respawn_rate)
    {
        //stella = document.getElementById('stella');
        respawn()

    }

    else if (state == "CHASE")
    {
        whale_moves()
        collision()
        food_collision()


    }

    else if (state == "STELLA_DEAD" || state == "WHALE_DEAD")
    {
        dead()

    }
}

function get_respawn_cords(respawn_image)
{
    respawn_corner = Math.floor(Math.random()*4) + 1;
    if (respawn_corner == 1)
    {
        x =  0
        y =  0
        SOLO_WHALE_MAX_MOMENTUM_X = Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
        SOLO_WHALE_MAX_MOMENTUM_Y = Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

        STELLA_MAX_MOMENTUM_X = Math.abs(STELLA_MAX_MOMENTUM_X)
        STELLA_MAX_MOMENTUM_Y  = Math.abs(STELLA_MAX_MOMENTUM_X)
    }

    else if (respawn_corner == 2)
    {
        x =   (window.innerWidth - respawn_image.width)
        y =  0

        SOLO_WHALE_MAX_MOMENTUM_X =  -Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
        SOLO_WHALE_MAX_MOMENTUM_Y = Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

        STELLA_MAX_MOMENTUM_X = -Math.abs(STELLA_MAX_MOMENTUM_X)
        STELLA_MAX_MOMENTUM_Y  = Math.abs(STELLA_MAX_MOMENTUM_X)

    }
    else if (respawn_corner == 3)
    {
            x =   0
            y =  (window.innerHeight - respawn_image.height)


            SOLO_WHALE_MAX_MOMENTUM_X = Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
            SOLO_WHALE_MAX_MOMENTUM_Y = -Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

            STELLA_MAX_MOMENTUM_X = Math.abs(STELLA_MAX_MOMENTUM_X)
            STELLA_MAX_MOMENTUM_Y  = -Math.abs(STELLA_MAX_MOMENTUM_X)
    }
    else
    {
        x =   (window.innerWidth - respawn_image.width )
        y =  (window.innerHeight - respawn_image.height)

        SOLO_WHALE_MAX_MOMENTUM_X = -Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
        SOLO_WHALE_MAX_MOMENTUM_Y = -Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

        STELLA_MAX_MOMENTUM_X = -Math.abs(STELLA_MAX_MOMENTUM_X)
        STELLA_MAX_MOMENTUM_Y  = -Math.abs(STELLA_MAX_MOMENTUM_X)

    }

    return [x,y]

}
function respawn()
{
    if (both_state_count >= respawn_rate)
    {
    chaser.src = "stella.png"
    chaser.width = 150
    respawn_cords = get_respawn_cords(chaser)
    chaser.style.left =  (respawn_cords[0])+ "px";
    chaser.style.top =  (respawn_cords[1]) + "px";

    chaser.style.visibility = "visible"
    //chaser.src = "stella.png"
    both_state_count= 0
    state = "CHASE"
    }
    else
        both_state_count +=1

}

function whale_moves()
{
    /*
    Whale changes direction when it hits the window border. flip whale momentum by opposite direction to
    mimic bouncing off border
    (look into scaling the momentum by window size)
    */
    img = document.getElementById('image');
    chaser = document.getElementById('chaser');
    img_y = parseInt(img.style.top);
    img_x = parseInt(img.style.left);
    chaser_y = parseInt(chaser.style.top);
    chaser_x = parseInt(chaser.style.left);
    if (state == "CHASE")
    {
        max_x_momentum = STELLA_MAX_MOMENTUM_X
        max_y_momentum = STELLA_MAX_MOMENTUM_Y
    }
    else
    {
        max_x_momentum = SOLO_WHALE_MAX_MOMENTUM_X
        max_y_momentum = SOLO_WHALE_MAX_MOMENTUM_Y
    }
    new_x = chaser_x - max_x_momentum
    new_y = chaser_y  - max_y_momentum


     if (new_x < 0  || new_x + chaser.width > window.innerWidth  )
     {
        SOLO_WHALE_MAX_MOMENTUM_X *= -1
        STELLA_MAX_MOMENTUM_X *=-1
     }

    if (new_y < 0 || new_y + chaser.height > window.innerHeight )
    {
        SOLO_WHALE_MAX_MOMENTUM_Y *= -1
        STELLA_MAX_MOMENTUM_Y *=-1

    }

    // This block makes whale always face the person and stella always face the direction she is moving
    if ((new_x > img_x  && state != "CHASE") || (STELLA_MAX_MOMENTUM_X > 0 && state == "CHASE"))
        chaser.style.transform = "scaleX(-1)"
    else
        chaser.style.transform = "scaleX(1)"
    chaser.style.left = new_x + "px";
    chaser.style.top = new_y + "px";
}


function dead()
{

    chaser = document.getElementById('chaser');
    chaser_y = parseInt(chaser.style.top);
    chaser_x = parseInt(chaser.style.left);
    new_y = chaser_y  + Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

    //chaser.style.left = new_x + "px";
    chaser.style.top = new_y + "px";

    if ( new_y> window.innerHeight )
    {

       if (state == "STELLA_DEAD")
        {
            state = "CHASE"
            chaser.src = "stella.png"

        }

        else
        {
            state = "SOLO"
            chaser.src = "barewhale.png"

        }

        //STELLA_MAX_MOMENTUM_X +=5
        respawn_cords = get_respawn_cords(chaser)
        chaser.style.left =  (respawn_cords[0])+ "px";
        chaser.style.top =  (respawn_cords[1]) + "px";
    }



}

function collision(){
    let img = document.getElementById('image')
    let chaser = document.getElementById('chaser')

    chaser_y = parseInt(chaser.style.top)
    chaser_x = parseInt(chaser.style.left)
    img_y = parseInt(img.style.top)
    img_x = parseInt(img.style.left)


    if (img_x + chaser.width >= chaser_x && img_x <= chaser_x + chaser.width  &&
     img_y + chaser.height >= chaser_y && img_y <= chaser_y + chaser.height)
     {
        if ( state == "SOLO")
        {
            img.src = "both.png"
            state = "BOTH"
            chaser.style.visibility = 'hidden'
        //chaser.src = "stelladed.png"
        }
        else
        {

        state = "WHALE_DEAD"
        img.src = "baresam.png"
        chaser.src = 'WhaleDED.png'
        chaser.width = 300
        chaser.style.transform = "rotate(0deg)";
        chaser.style.transform = "scaleY(-1)"
        remove_food()

        }

      }
}

function mainMovement(){
     var img = document.getElementById('image')
     rotate_deg += rotate_rate % 360
     img.style.transform =  "rotate(" + rotate_deg + "deg)";

     new_x = img.offsetLeft  + x_momentum
     new_y = img.offsetTop  +  y_momentum

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

      img.style.left = new_x + "px";
      img.style.top = new_y + "px";

}


var timer = setInterval(tick, 50)

// INIT
window.onload = function () {
    chaser =  load_img('barewhale.png','chaser')
    baresam = load_img('baresam.png','image')

    if (window.innerWidth < 1000)
        baresam.width = 50

    else
        baresam.width = 100

    chaser.width = 100
    chaser_y = window.innerHeight - (chaser.width * 3)
    chaser_x = window.innerWidth - (chaser.width * 3)
    chaser.style.left = chaser_x + "px";
    chaser.style.top = chaser_y + "px";

}


function food_collision()
{
    let img = document.getElementById('chaser')

    for (i=0; i < food_list.length; i++)
    {

        food = food_list[i]
        food_y = parseInt(food.style.top)
        food_x = parseInt(food.style.left)
        img_y = parseInt(img.style.top)
        img_x = parseInt(img.style.left)


        if (img_x + food.width >= food_x && img_x <= food_x + food.width  &&
         img_y + food.height >= food_y && img_y <= food_y + food.height)
         {
            //if ( state == "SOLO")
            {
                //img.src = "both.png"
                state = "STELLA_DEAD"
                //chaser.style.visibility = 'hidden'
                chaser.src = "stelladed.png"
                chaser.style.transform = "scaleY(-1)"
                remove_food()
                break;
            }

        }

    }

}

function remove_food()
{
    for (i=0; i< food_list.length; i++)
    {
    food_temp = food_list[i]
    food_temp.parentNode.removeChild(food_temp);
    }

    food_list = []

}

function add_food(x,y)
{


    if (food_list.length < food_max)
    {

       food = load_img('food' + ((food_list.length % 2) + 1 ) +  '.PNG', 'food'+  food_list.length.toString(10))
       food_list.push(food)
       food.width = 70
      food.style.left = x + "px";
      food.style.top = y + "px";

    }

    else
    {
       food_replace = food_list[0]
       food_list.shift();
       food_list.push(food_replace)
       food_replace.style.left = x + "px";
        food_replace.style.top = y + "px";


    }


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

       if (state == "CHASE")
       {

          add_food(parseInt(img.style.left), parseInt(img.style.top))

       }


} );

    //var image_x = document.getElementById('image');
    //image_x.parentNode.removeChild(image_x);
