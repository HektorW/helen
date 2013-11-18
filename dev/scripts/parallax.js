// #TODO
// 
// * Listen to window size change and update vars

// Setup
$(function() {
  // Decide if we should parallax
  var parallax = !Modernizr.touch;

  if(window.innerWidth < 800) // Find some nice break value, Also uodate on window size change
    parallax = false;

  if(parallax) {
    $('.image_separator').parallax();
  }
  else {
  }

});

// Parallax plugin
(function($) {
  function calc() {
    setTimeout(function() {
      jQuery.each(parallax_objects, function(i, v) {
        v.calculateValues();
      });
      DEBUG('calculated', '');
    },300);
  }
  calc();

  // Plugin vars
  // ===================
      // Flag for if we have scheduled a repaint with rAF
  var scheduled_repaint = false,
      // Y-value of scrollbar
      lastScrollValue = -1,
      // All objects that is handled by plugin
      parallax_objects = [],
      // Contains values that are common for all parallax objects
      // currently #unused
      values = {};

  // #DEBUG
  window.PARA = parallax_objects;
  window.calc = calc;

  // Fix requestAnimationFrame
  var requestAnimationFrame =
      window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.msRequestAnimationFrame     ||
      function(callback) {
        return setTimeout(callback, 16);
      };

  // End plugin vars
  // ===================


  // fn.parallax
  // ===================
  $.fn.parallax = function(settings) {


    // Settings
    // ===================
    settings = settings || {};

    settings.speed = settings.speed || 0.6,
    settings.startOffset = settings.startOffset || 0,
    settings.endOffset = settings.endOffset || 0,
    // ===================



    // each
    // ===================
    this.each(function() {
      var $t = $(this);

      // self
      // ===================
      var self = {
        // Container
        // .image_separator
        $container: $t,
        // Div inside container
        // This will be fixed position and follow the position of the container
        $para_div: $t.find('.para_div'),
        // Actual image that is parallaxed
        $para_img: $t.find('.para_img'),
        // Flag for if the container is visible
        visible: false,
        // Identifier for each parallax object
        name: $t.attr('data-para-id'),

        toString: function() {
          var o = {
            visible: this.visible
          };
          if(this.visible) {
            o.div_top = Math.floor(this.div_top);
            o.img_top = Math.floor(this.img_top);
          }

          return JSON.stringify(o);
        },

        OUT_D: function() {
          DEBUG(this.name, this.toString());
        }
      };
      // End self
      // ===================
          


      // Calculate values
      // ===================
      self.calculateValues = function() {
        // bounds
        // ===================
        self.bounds = {
          top: Math.floor(self.$container.offset().top),                 // .image_separator.top
          bottom: Math.floor(self.$container.offset().top + self.$container.height()) // .image_separator.top + .image_separator.height
        };
        // ===================
        
        self.OUT_D();
      };
      self.calculateValues();
      // End calculate values
      // ===================


      // #DEBUG
      window[self.name.toUpperCase()] = {
        t: self.$container,
        div: self.$para_div,
        img: self.$para_img,
        visible: self.visible,
        bounds: self.bounds
      };

      // check
      // ===================
      self.check = function(scrollValue) {
        // scrollValue:
        //    Range: 0 - document.body.scrollHeight


            // scroll_value -> Current Y-value of scrollbar 
        var scroll_value = scrollValue,
            // windowH -> inner height of window
            windowH = window.innerHeight,
            // lowerY -> Scrollbar Y-value + inner height of indow
            // Indicates the lowest visible point of screen
            lowerY = scroll_value + windowH;

        DEBUG('LowerY', lowerY);

        // Check if the container is visible
        // 
        if(self.bounds.top < lowerY && self.bounds.bottom > scroll_value) {

          if(!self.visible) {
            self.visible = true;
            self.$para_div.css('visibility', 'visible');            
          }

          var top = self.bounds.top - scroll_value;

          top -= 10;

          self.div_top = top;
          self.img_top = top - (top / settings.speed);

          self.$para_div.css(
            'transform',
            'translate3D(0,' + self.div_top + 'px,0)'
          );
          self.$para_img.css(
            'transform',
            'translate3D(0,' + self.img_top + 'px,0)'
          );

          self.OUT_D();

          // var s = (($t.bounds.top) - scroll_value);

          // var y = (s+settings.startOffset) - (s / settings.speed);

          // $para_div.css('transform', 'translate3D(0,'+y+'px,0)');
          // $para_div.css('top', y+'px');
        }
        else {
          if(self.visible) {
            self.visible = false;
            self.$para_div.css('visibility', 'hidden');
          }
        }
      };
      // End check
      // ===================

      
      addParallaxObject(self);
    });
    // End each
    // ===================
  };
  // End fn.parallax
  // ===================


  

  function addParallaxObject(parallax_obj) {
    if(!parallax_objects.length) {
      $('html').addClass('parallax');
      $('html').removeClass('no_parallax');
      $(window).scroll(onScroll);
    }

    parallax_objects.push(parallax_obj);
    requestRepaint();
  }
  function onScroll(ev) {
    lastScrollValue = window.pageYOffset;
    requestRepaint();
  }
  function requestRepaint() {
    if(!scheduled_repaint)
      requestAnimationFrame(repaint);
    scheduled_repaint = true;
  }
  function repaint() {
    scheduled_repaint = false;

    DEBUG('scroll', lastScrollValue);

    // $('.debug').text(lastScrollValue + ', ' + (lastScrollValue + window.innerHeight));
    for(var i = 0, len = parallax_objects.length; i < len; ++i) {
      parallax_objects[i].check(lastScrollValue);
    }
  }
}(jQuery));







var DEBUG = (function() {
  var map = {};

  function f(name, msg) {
    map[name] = msg;

    output();
  }

  function output() {
    var $elem = $('#D');
    $elem.empty();

    for(var name in map) {
      $elem.append(
        '<p><strong>'+name+'</strong> -> '+map[name]+'</p>'
      );
    }
  }

  return f;
}());

