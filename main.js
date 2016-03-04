javascript:(
  (function x() {
    setTimeout(function t() {
      if (!window.jQuery) {
        var jq = document.createElement('script'); 
        jq.type = 'text/javascript'; 
        jq.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        var sc = document.getElementsByTagName('script')[0];
        sc.parentNode.insertBefore(jq, sc);
      }
    }, 0);  
  
    setTimeout(function() {
      //modify page contents
      document.head.innerHTML = '';
      
      var logo = jQuery('[src*=logo], [src*=Logo]')[0];
      var logo_src = (logo) ? logo.src : 'https://static2.businessinsider.com/image/52f914bd6da811fa73092e3f-960/flappy-bird-icon-faby.jpg'; 
      document.body.innerHTML = '';
      
      var CUR_URL = window.location.href;
     
      var PIPE_SPACING = 25;
      var PIPE_WIDTH = 20;
      var PIPE_STOP = 0;
      var PIPE_MOVE = 1;
      var PIPE_VEL = PIPE_MOVE;
     
      var SHIP_WIDTH = 10;
      var SHIP_HEIGHT = 5;
      var SHIP_LEFT = 5;

      // remove page
      document.body.parentNode.style.height = '100%';
      document.body.parentNode.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.width = '100%';
      document.body.style.background = 'url(https://data3.whicdn.com/images/100689138/large.jpg) repeat-x';
      document.body.style.backgroundSize = 'auto 100%';
      document.body.style.backgroundPositionX = '0px';

      // MOOVBIRDY
      var ship = document.createElement('img');
      ship.src = logo_src;
      ship.style.width = SHIP_WIDTH + '%';
      ship.style.height = SHIP_HEIGHT + '%';
      ship.style.position = 'absolute';
      ship.style.top = '47.5%';
      ship.style.background='transparent';
      ship.style.border='1px solid black';
      ship.style.borderRadius='3px';
      ship.style.left = SHIP_LEFT + '%';
      ship.style.zIndex = '99999';
      ship.vel = 0;
      ship.style.webkitBackfaceVisibility = "hidden";
      ship.style.webkitUserSelect='none';
      document.body.appendChild(ship);

      //top pipe
      var pipe_top = document.createElement('iframe');
      pipe_top.src = CUR_URL;
      pipe_top.width = PIPE_WIDTH+'%';
      pipe_top.height = Math.floor(Math.random() * (100 - PIPE_SPACING + 1))+'%';
      pipe_top.style.position = 'absolute';
      pipe_top.style.top = '0';
      pipe_top.style.right = '0';
      pipe_top.style.border = '1px solid black';
      pipe_top.style.pointerEvents='none';
      pipe_top.style.webkitUserSelect='none';
      document.body.appendChild(pipe_top);

      //bottom pipe
      var pipe_bot = document.createElement('iframe');
      pipe_bot.src = CUR_URL;
      pipe_bot.width = PIPE_WIDTH+'%';
      pipe_bot.height = (100 - parseInt(pipe_top.height) - PIPE_SPACING) + '%';
      pipe_bot.style.position = 'absolute';
      pipe_bot.style.bottom = '0';
      pipe_bot.style.right = '0';
      pipe_bot.style.border = '1px solid black';
      pipe_bot.style.pointerEvents='none';
      pipe_bot.style.webkitUserSelect='none';
      document.body.appendChild(pipe_bot);

      //start button
      var start_button = document.createElement('img');
      start_button.src = 'https://ttholke.files.wordpress.com/2014/12/play-button.jpeg';
      start_button.style.position = 'absolute';
      start_button.style.top   = '50%';
      start_button.style.right = '50%';
      start_button.style.width = '100px';
      start_button.style.height = '100px';
      start_button.style.margin = '-50px -50px 0 0';
      start_button.style.border = '1px solid black';
      start_button.style.borderRadius = '20px';
      document.body.appendChild(start_button);

      var score = document.createElement('div');
      score.style.fontSize = '50px';
      score.style.fontWeight = 'bold';
      score.style.textAlign = 'center';
      score.style.padding = '100px 0 0';
      score.style.color = 'white';
      score.style.textShadow = '2px 3px 0px #000';
      score.style.webkitUserSelect='none';
      
      // set score to 0;
      score.innerHTML = 0;
      
      document.body.appendChild(score);

      // helper function to test if collisions occur
      function isColliding() {
        var pipe_right    = parseFloat(pipe_top.style.right);
        var pipe_bottom   = parseFloat(pipe_top.height);
        var ship_top      = parseFloat(ship.style.top);

        var canhit = (pipe_right + PIPE_WIDTH + SHIP_WIDTH + SHIP_LEFT >= 100) && (pipe_right + SHIP_LEFT < 100);  
        var hittop = (pipe_bottom > ship_top);
        var hitbot = (pipe_bottom + PIPE_SPACING < ship_top + SHIP_HEIGHT);
        return canhit && (hittop || hitbot);
      }

      // MAIN LOOP
      function main(){
        jQuery(start_button).unbind('click');
        jQuery(start_button).hide();

        jQuery(document.body).on('click', function() {
          ship.vel = 1.7;
        });

        y = setInterval(function() {
          // update ship velocity, location, and rotation
          ship.vel -= .13;
          ship.style.webkitTransform = "rotate("+ship.vel*-7+"deg)";
          ship.style.top = (parseFloat(ship.style.top) - ship.vel) + '%';

          // update pipes x pos
          pipe_top.style.right = (parseFloat(pipe_top.style.right) + PIPE_VEL) + '%';
          pipe_bot.style.right = (parseFloat(pipe_bot.style.right) + PIPE_VEL) + '%';
        
          // reset pipes if off screen
          if (parseFloat(pipe_top.style.right) >= 100) {
            pipe_top.style.right = 0;
            pipe_bot.style.right = 0;
            
            pipe_top.height = Math.floor(Math.random() * (100 - PIPE_SPACING + 1))+'%';
            pipe_bot.height = (100 - parseInt(pipe_top.height) - PIPE_SPACING) + '%';
          
            // update score after passing bars
            score.innerHTML = parseInt(score.innerHTML) + 1;
          }
          
          // test if have lost
          if (isColliding()) {
            jQuery(document.body).unbind('click');
            
            PIPE_VEL = PIPE_STOP;
          }

          // completely die and reset game :P
          if (parseFloat(ship.style.top) >= 95) {
            alert('YOUR SCORE WAS: ' + score.innerHTML)
            clearInterval(y);

            score.innerHTML = '0';
            
            PIPE_VEL = PIPE_MOVE;
            pipe_top.height = Math.floor(Math.random() * (100 - PIPE_SPACING + 1))+'%';
            pipe_bot.height = (100 - parseInt(pipe_top.height) - PIPE_SPACING) + '%';

            ship.style.top = '47.5%';
            ship.style.webkitTransform='';
            pipe_top.style.right = 0; 
            pipe_bot.style.right = 0; 

            jQuery(start_button).bind('click', main);
            jQuery(start_button).show();
          }
        }, 20);
      }
      x = jQuery(start_button).on('click', main);
    }, 2000)
  })())
