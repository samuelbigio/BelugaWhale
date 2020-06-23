
var rotate_deg = 0;
var x_momentum = 30;
var y_momentum = 20;
var rotate_rate = 3;
const  MAX_MOMENTUM = 30
var  SOLO_WHALE_MAX_MOMENTUM_X = 11
var SOLO_WHALE_MAX_MOMENTUM_Y = 16
var STELLA_MAX_MOMENTUM_Y = 10
var STELLA_MAX_MOMENTUM_X = 20
var respawn_rate = 5
var state = "SOLO"
var both_state_count = 0
var food_list = []
var food_max = 4
var stella_counter = 0

var counter_screen_time = 0
var flash = "false"

var baresam_width = 0
var whale_width = 0
var stella_width = 0
var food_width = 0


/*

TODO:
3. Deploy
4. refactor

*/
function load_img(filename,id)
{
   var loaded_image = document.createElement('img');
  loaded_image.id = id;
  loaded_image.style.position = "absolute";
  loaded_image.style.transform = "rotate(" + rotate_deg + ")";
  loaded_image.style.userSelect = "none"
  loaded_image.style.userDrag = "none"
  //loaded_image.style. = "none"


  document.body.appendChild(loaded_image);
  loaded_image.src = filename;
  return loaded_image

}

function load_music()
{
    var music = document.createElement('AUDIO')
    music.id = 'music'
    music.src = 'music.mp3'
    document.body.appendChild(music);
    music.load()
    //music.muted = "muted"
    music.loop = "true"
    //music.autoplay = ""
    return music



}



function tick(){

    music = document.getElementById('music')
    //music.play()
    //Turn red past song breakdown
    if (music != null && music.currentTime >= 61.73 && ( state == "CHASE" || state == "STELLA_DEAD"))
        document.body.style.backgroundColor = "FireBrick";
    else
       document.body.style.backgroundColor = "white";
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


    // Flash counter for set amount of ticks
    if (flash == "true" && counter_screen_time < 30 )
    {
        counter_screen_time +=1

        if (counter_screen_time == 30)
        {
        counter_screen_time = 0
        flash = "false"
        counter = document.getElementById('counter')
        counter.style.visibility = "hidden"
        }

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
        x =   (window.innerWidth - respawn_image.width *2)
        y =  0

        SOLO_WHALE_MAX_MOMENTUM_X =  -Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
        SOLO_WHALE_MAX_MOMENTUM_Y = Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

        STELLA_MAX_MOMENTUM_X = -Math.abs(STELLA_MAX_MOMENTUM_X)
        STELLA_MAX_MOMENTUM_Y  = Math.abs(STELLA_MAX_MOMENTUM_X)

    }
    else if (respawn_corner == 3)
    {
            x =   0
            y =  (window.innerHeight - respawn_image.height *2)


            SOLO_WHALE_MAX_MOMENTUM_X = Math.abs(SOLO_WHALE_MAX_MOMENTUM_X)
            SOLO_WHALE_MAX_MOMENTUM_Y = -Math.abs(SOLO_WHALE_MAX_MOMENTUM_Y)

            STELLA_MAX_MOMENTUM_X = Math.abs(STELLA_MAX_MOMENTUM_X)
            STELLA_MAX_MOMENTUM_Y  = -Math.abs(STELLA_MAX_MOMENTUM_X)
    }
    else
    {
        x =   (window.innerWidth - respawn_image.width * 2 )
        y =  (window.innerHeight - respawn_image.height * 2)

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
    chaser.src = "assets/stella.png"
    chaser.width = stella_width
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
    if (img == null)
        return
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
            chaser.src = "assets/stella.png"

        }

        else
        {
            state = "SOLO"
            chaser.src = "assets/barewhale.png"
            chaser.width = whale_width
            stella_counter = 0
            update_counter()


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
    if (img == null)
        return
    chaser_y = parseInt(chaser.style.top)
    chaser_x = parseInt(chaser.style.left)
    img_y = parseInt(img.style.top)
    img_x = parseInt(img.style.left)


    if (img_x + chaser.width >= chaser_x && img_x <= chaser_x + chaser.width  &&
     img_y + chaser.height >= chaser_y && img_y <= chaser_y + chaser.height)
     {
        if ( state == "SOLO")
        {
            img.src = "assets/both.png"
            state = "BOTH"
            chaser.style.visibility = 'hidden'

        //chaser.src = "stelladed.png"
        }
        else
        {

        state = "WHALE_DEAD"
        img.src = "assets/baresam.png"
        chaser.src = 'assets/WhaleDED.png'
        chaser.width = whale_width * 4
        chaser.style.transform = "rotate(0deg)";
        chaser.style.transform = "scaleY(-1)"
        remove_food()

        }

      }
}

function mainMovement(){
     var img = document.getElementById('image')
     if (img == null)
        return
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

function dynamic_widths()
{

    baresam_width = window.innerWidth * .08
    whale_width = window.innerWidth * .075
    stella_width = window.innerWidth * .15
    food_width = window.innerWidth * .05


}

function on_click_mute()
{
    btn = document.getElementById('mute');
    music = document.getElementById('music')
    //alert(music.mute)
    if (music.mute == "false")
    {
        music.mute = "true"
        music.pause()
        music.volume = "0"
        btn.innerHTML  = '<img src="assets/mute.png" width = 40 height = 30  />'
    }
    else
    {
        music.play()
        music.mute = "false"
        music.volume = "1"
        btn.innerHTML  = '<img src="assets/mute_none.png" width = 40 height = 30 />'
    }




}
function mute_buttons()
{
    var btn = document.createElement('button');
    btn.id = 'mute';
    //loaded_image.style.position = "absolute";
    //loaded_image.style.transform = "rotate(" + rotate_deg + ")";
    //btn.style.cursor = "pointer"

    btn.innerHTML  = '<img src="assets/mute_none.png" width = 40  />'
    btn.style.padding = '1px'

    btn.width = 40
    document.body.appendChild(btn);
    btn.onclick  = on_click_mute
    //loaded_image.src = filename;
    return btn
}

function add_counter()
{
    element = document.createElement("div")
    element.id = "counter"
    element.innerHTML = "0"
    element.style.alignItems  = "center"
    element.style.justifyContent = "center"
    element.style.textAlign = "center"
    //element.style.font  = "normal bold 50px arial,serif"
    element.style.font  = "normal bold 50px Brush Script MT"

    element.style.visibility = "hidden"
    document.body.appendChild(element)


}


var timer = setInterval(tick, 50)

// INIT
window.onload = function () {

    music = load_music()

    chaser =  load_img('assets/barewhale.png','chaser')
    baresam = load_img('assets/baresam.png','image')

    dynamic_widths()
    baresam.width = baresam_width
    chaser.width = whale_width

    chaser_y = window.innerHeight - (chaser.width * 3)
    chaser_x = window.innerWidth - (chaser.width * 3)
    chaser.style.left = chaser_x + "px";
    chaser.style.top = chaser_y + "px";
    music.mute = "false"


    //mute_btn =  load_img('assets/mute.png','mute')
    //mute_btn.width = 40

    mute_buttons()
    add_counter()
   make_ios_clickable()

    //make screen not scrollable and revert to top
   document.body.style.position = "relative"
   document.body.style.overflow = "hidden"



}

function make_ios_clickable()
{

   var full_scren_div = document.createElement('div');
  full_scren_div.id = "full_screen"
  //full_screen.style.overflow = "hidden"
  full_scren_div.onclick = alert_onclick
  full_scren_div.style.minHeight = "100vh";
  document.body.appendChild(full_scren_div);
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
                chaser.src = "assets/stelladed.png"
                chaser.style.transform = "scaleY(-1)"
                remove_food()
                stella_counter +=1
                update_counter()

                break;
            }

        }

    }

}

function update_counter()
{
    counter = document.getElementById('counter')
    counter.innerHTML = stella_counter
    if (stella_counter != 0)
    {
        counter.style.visibility = "visible"
        counter_screen_time = 0
        flash = "true"
    }

}

function alert_onclick()
{
return

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

       food = load_img('assets/food' + ((food_list.length % 2) + 1 ) +  '.PNG', 'food'+  food_list.length.toString(10))
       food_list.push(food)
       food.width = food_width
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

window.addEventListener('resize',dynamic_widths)

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

        music = document.getElementById('music')
        if (music.mute == "false")
            music.play()
        //alert(music.currentTime)

} );

    //var image_x = document.getElementById('image');
    //image_x.parentNode.removeChild(image_x);
