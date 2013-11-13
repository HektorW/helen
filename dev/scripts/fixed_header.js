$(function() {
  'use strict';

  var $header = $('header'),
      $menu_link = $('#menu_link'),
      $links = $header.find('nav#menu a'),
      $window = $(window),
      header_height = $header.outerHeight();


  $menu_link.click(function(ev) {
    $header.toggleClass('revealed');

    ev.preventDefault();
    return false;
  });


  $('body').click(function() {
    $header.removeClass('revealed');
  });

  $links.click(function(ev) {
    var href = $(this).attr('href'),
        $anch = $('.image_separator[data-above-page='+href.replace('#', '')+']');

    $header.removeClass('revealed');

    $window.scrollTop($anch.offset().top - (header_height-1));

    ev.preventDefault();
  });
});