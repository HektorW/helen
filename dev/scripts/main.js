$(function() {
  var parallax = false;
  var enable_header_transition;

  if('ontouchstart' in window) {
    enable_header_transition = false;
  }
  else {
    enable_header_transition = true;
  }

  var $header = $('header');


  var img_top = window.innerHeight * 0.2;
  var img_height = 340;

  // var logo_trigger = $('.logo').height() + $('.logo').offset().top;
  var logo_trigger = img_top + img_height;
  var main_top = $('.main').offset().top;
  var $logo = $('.top_logo img');



  // Fix links from header
  // Push scroll down a bit beacause of floating header
  $('.tabs a.tab').each(function() {
    var $o = $(this);
    var elem = $($o.attr('href'));

    var margin = parseInt($('header').height(), 10);
    var scrollToY = elem.offset().top - margin;


    $o.click(function(ev) {
      ev.preventDefault();

      window.scrollTo(0, scrollToY);
    });
  });
  

  // If header should animate
  // If not it starts as compressed
  if(enable_header_transition) {
    $header.addClass('small');
    // Use a timeout to avoid initial transition from compressed to start-state
    setTimeout(function() {
      $header.addClass('transition_enabled');
    },0);

    function checkScroll(ev) {
      var scrollY = window.pageYOffset;

      if(main_top - scrollY < logo_trigger) {
        $header.removeClass('small');
        $logo.addClass('hide');
      }
      else {
        $header.addClass('small');
        $logo.removeClass('hide');
      }
    }

    $(window).scroll(checkScroll);
    checkScroll({});
  }


  if(parallax) {
    $('.image_separator').parallax({
      startOffset: 0,
      speed: 1.2
    });
    $('.first_page').parallax();
  }
});


(function($) {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return setTimeout(callback, 16);
    };

  var scheduled = false,
      lastScrollValue = -1,
      objs = [];

  function addObject(obj) {
    if(!objs.length) {
      $('html').addClass('parallax');
      $(window).scroll(onScroll);
    }

    objs.push(obj);
    requestRepaint();
  }
  function onScroll(ev) {
    lastScrollValue = window.pageYOffset;
    requestRepaint();
  }
  function requestRepaint() {
    if(!scheduled)
      window.requestAnimationFrame(repaint);
    scheduled = true;
  }
  function repaint() {
    scheduled = false;
    $('.debug').text(lastScrollValue + ', ' + (lastScrollValue + window.innerHeight));
    for(var i = 0, len = objs.length; i < len; ++i) {
      objs[i].check(lastScrollValue);
    }
  }


  $.fn.parallax = function(settings) {
    settings = settings || {};

    settings.speed = settings.speed || 1.2,
    settings.startOffset = settings.startOffset || 0,
    settings.endOffset = settings.endOffset || 0,

    this.each(function() {
      var $t = $(this),
          $para = $('#para-'+$t.attr('data-para-id')), // Could load resources here
          visible = false,
          speed = parseFloat($('').attr('data-para-speed') || settings.speed);

      var bounds = {
        startY: $t.offset().top,
        endY: $t.offset().top + $t.height()
      };


      var picHeight = $para.height();
      var fillHeight = $t.height();
      var windowHeight = window.innerHeight;


      $t.check = function(scrollValue) {
        $('.debug').html(
          $('.debug').html() + '<br>' +
          bounds.startY + ', ' + bounds.endY
        );

        var upperY = scrollValue,
            windowH = window.innerHeight,
            lowerY = upperY + windowH;

        if(bounds.startY < lowerY && bounds.endY > upperY) {

          if(!visible) {
            visible = true;
            $para.css('visibility', 'visible');
          }

          var s = ((bounds.startY) - upperY);

          var y = (s+settings.startOffset) - (s / speed);

          $para.css('transform', 'translate3D(0,'+y+'px,0)');
          // $para.css('top', y+'px');
        }
        else {
          if(visible) {
            visible = false;
            $para.css('visibility', 'hidden');
          }
        }
      };

      addObject($t);
    });
  };
}(jQuery));

// ;C:\Program Files\nodejs\


// Cornify
// (function(){
//   var d=document,s=d.createElement('script');d.body.appendChild(s);
//   s.onload=addlots=window.addlots=function(){
//     for(var i=0;i<20;i++)cornify_add();
//   };
//   s.src='http://www.cornify.com/js/cornify.js';
// })();