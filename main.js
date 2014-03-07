javascript:(function t() {
  var CUR_URL = window.location.href;
  
  var PIPE_WIDTH = 20;
  var PIPE_STOP = 0;
  var PIPE_MOVE = 1;
  var PIPE_VEL = PIPE_MOVE;
 
  var logo_src = jQuery('[src*=logo], [src*=Logo]')[0].src;


  // remove page
  document.body.innerHTML = '';

  // MOOVBIRDY
  var ship = document.createElement('img');
  ship.src = logo_src;
  ship.style.width = '10%';
  ship.style.height = '5%';
  ship.style.position = 'absolute';
  ship.style.top = '0px';
  ship.style.background='black';
  ship.style.left = 0;
  ship.vel = 0;
  document.body.appendChild(ship);

  //top pipe
  var pipe_top = document.createElement('iframe');
  pipe_top.src = CUR_URL;
  pipe_top.width = PIPE_WIDTH+'%';
  pipe_top.height = Math.floor(Math.random() * 71)+'%';
  pipe_top.style.position = 'absolute';
  pipe_top.style.top = '0';
  pipe_top.style.right = '0';
  pipe_top.style.border = '1px solid black';
  pipe_top.style.pointerEvents='none';

  //bottom pipe
  var pipe_bot = document.createElement('iframe');
  pipe_bot.src = CUR_URL;
  pipe_bot.width = PIPE_WIDTH+'%';
  pipe_bot.height = (100 - parseInt(pipe_top.height) - 30) + '%';
  pipe_bot.style.position = 'absolute';
  pipe_bot.style.bottom = '0';
  pipe_bot.style.right = '0';
  pipe_bot.style.border = '1px solid black';
  pipe_bot.style.pointerEvents='none';

  //start button
  var start_button = document.createElement('img');
  start_button.src = 'http://www.designdownloader.com/item/pngl/arrow_m01_right/arrow_m01_right-20111002134151-00025.png';
  start_button.style.position = 'absolute';
  start_button.style.top   = '50%';
  start_button.style.right = '50%';
  start_button.style.width = '100px';
  start_button.style.height = '100px';
  start_button.style.margin = '-50px -50px 0 0';

  var score = document.createElement('div');
  score.style.fontSize = '30px';
  score.style.textAlign = 'center';
  score.style.margin = 'auto';

  score.innerHTML = 0;

  document.body.style.height = '100%';
  document.body.style.width = '100%';
  
  document.body.parentNode.style.height = '100%';
  document.body.parentNode.style.width = '100%';

  document.body.appendChild(pipe_top);
  document.body.appendChild(pipe_bot);
  document.body.appendChild(ship);
  document.body.appendChild(start_button);
  document.body.appendChild(score);

  // MAIN LOOP

  function isColliding() {
    var pipe_right    = parseFloat(pipe_top.style.right);
    var pipe_bottom   = parseFloat(pipe_top.height);
    var ship_top      = parseFloat(ship.style.top);

    var canhit = (pipe_right + 30 >= 100);  
    var hittop = (pipe_bottom > ship_top);
    var hitbot = (pipe_bottom + 30 < ship_top + 5);
    return canhit && (hittop || hitbot);
  }

  function main(){
    jQuery(start_button).hide();

    jQuery(document.body).on('click', function() {
      ship.vel = 1.5;
    });

    y = setInterval(function() {
      // update ship velocity, location, and rotation
      ship.vel -= .11;
      ship.style.webkitTransform = "rotate("+ship.vel*-7+"deg)";
      ship.style.top = (parseFloat(ship.style.top) - ship.vel) + '%';

      // update pipes x pos
      pipe_top.style.right = (parseFloat(pipe_top.style.right) + PIPE_VEL) + '%';
      pipe_bot.style.right = (parseFloat(pipe_bot.style.right) + PIPE_VEL) + '%';
     
      // update score
      score.innerHTML = parseInt(score.innerHTML) + PIPE_VEL;
      if (parseInt(score.innerHTML) < 10) {
        
      } else if (parseInt(score.innerHTML) % 500 < 5) {
        score.style.fontSize='100px';
      } else if (parseInt(score.innerHTML) % 100 < 5) {
        score.style.fontSize='50px';
      } else {
        score.style.fontSize='30px';
      }

      // reset pipes if off screen
      if (parseFloat(pipe_top.style.right) >= 100) {
        pipe_top.style.right = 0;
        pipe_bot.style.right = 0;
        
        pipe_top.height = Math.floor(Math.random() * 71)+'%';
        pipe_bot.height = (100 - parseInt(pipe_top.height) - 30) + '%';
      }
      
      // test if have lost
      if (isColliding()) {
        jQuery(document.body).unbind('click');
        
        PIPE_VEL = PIPE_STOP;
      }
      if (parseFloat(ship.style.top) >= 95) {
        alert('YOUR SCORE WAS: ' + score.innerHTML)
        clearInterval(y);

        score.innerHTML = '0';
        
        PIPE_VEL = PIPE_MOVE;

        ship.style.top = 0;

        pipe_top.style.right = 0; 
        pipe_bot.style.right = 0; 

        jQuery(start_button).show();
      }
    }, 20);
  }
  x = jQuery(start_button).on('click', main);
}());
