// Mobile header (collapsed menu)
$(function() {
  'use strict';

  var $header = $('header'),
      $menu_link = $('#menu_link'),
      $links = $header.find('nav#menu a'),
      $window = $(window),
      header_height = $header.outerHeight();

  header_height = 56;

  $menu_link.click(function(ev) {
    $header.toggleClass('revealed');

    ev.preventDefault();
    // return false; // Prevent bubbling to body
  });

  // $('.menu_container').click(function() {
  //   return false; // Prevent bubbling to body
  // });


  // // 
  // $('body').click(function() {
  //   $header.removeClass('revealed');
  // });

  $links.click(function(ev) {
    var href = $(this).attr('href'),
        $anch = $('.image_separator[data-above-page='+href.replace('#', '')+']');

    $header.removeClass('revealed');

    $window.scrollTop($anch.offset().top - (header_height-1) /*+ 260*/ /* translate3d */);

    ev.preventDefault();
  });
});

// Desktop header
$(function() {
  'use strict';

  var $window = $(window),
      $header = $('header'),
      $big_logo = $('big_logo'),
      logo_height = 340, // Static value
      logo_top = window.innerHeight * 0.2, // Static value
      trigger_point = logo_top + logo_height,
      main_top = window.innerHeight; // Should be right

  function checkScroll() {
    var scroll_y = window.pageYOffset;

    if(main_top - scroll_y < trigger_point) {
      $header.addClass('expanded');
    }
    else {
      $header.removeClass('expanded');
    }
  }

  $window.scroll(checkScroll);
  checkScroll();
});