javascript:(function t() {
  var CUR_URL = window.location.href;
  
  var PIPE_WIDTH = '200px';

 
 
  var logo_src = jQuery('[src*=logo], [src*=Logo]')[0].src;


  // remove page
  document.body.innerHTML = '';

  // MOOVBIRDY
  var ship = document.createElement('img');
  ship.src = logo_src;
  ship.style.width = '20%';
  ship.style.height = '10%';
  ship.style.position = 'absolute';
  ship.style.top = '0px';
  ship.vel = 0;
  document.body.appendChild(ship);


  //top pipe
  var page_parts_top = document.createElement('iframe');
  page_parts_top.src = CUR_URL;
  page_parts_top.width = PIPE_WIDTH;
  page_parts_top.height = Math.floor(Math.random() * 81)+'%';
  page_parts_top.style.position = 'absolute';
  page_parts_top.style.top = '0';
  page_parts_top.style.right = '0';
  
  //bottom pipe
  var page_parts_bot = document.createElement('iframe');
  page_parts_bot.src = CUR_URL;
  page_parts_bot.width = PIPE_WIDTH;
  page_parts_bot.height = (100 - parseInt(page_parts_top.height) - 30) + '%';
  page_parts_bot.style.position = 'absolute';
  page_parts_bot.style.bottom = '0';
  page_parts_bot.style.right = '0';

  var start_button = document.createElement('div');
  start_button.innerHTML = 'Click to Play';
  start_button.style.position = 'absolute';
  start_button.style.right = '50%';
  start_button.style.margin = '0 -20px 0 0';
  start_button

  document.body.style.height = '100%';
  document.body.style.width = '100%';

  document.body.appendChild(page_parts_top);
  document.body.appendChild(page_parts_bot);
  document.body.appendChild(ship);
  document.body.appendChild(start_button);

  // MAIN LOOP
  function main(){
    jQuery(start_button).hide();

    jQuery(document.body).on('click', function() {
      ship.vel = 1.5;
    });

    y = setInterval(function() { 
      ship.vel -= .1;
      ship.style.webkitTransform = "rotate("+ship.vel*-7+"deg)";
      ship.style.top = (parseFloat(ship.style.top) - ship.vel) + '%';
      if (parseFloat(ship.style.top) >= 90) {
        alert('you lose!');
        clearInterval(y);
        jQuery(start_button).show();
      }
    }, 20);
  }
  x = jQuery(start_button).on('click', main);
})();
