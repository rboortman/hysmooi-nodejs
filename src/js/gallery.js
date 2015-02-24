(function ($, window, undefined) {
   $(document).ready(function() {
      $('a.actueel').fancybox({
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'centerOnScroll': 'true'
      });
      $('a.gereviseerd').fancybox({
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'centerOnScroll': 'true'
      });
      $('a.revisie').fancybox({
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'centerOnScroll': 'true'
      });
      $('a.spuiten').fancybox({
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'centerOnScroll': 'true'
      });
   });
})(window.jQuery, window);