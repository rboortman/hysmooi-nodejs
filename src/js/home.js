(function ($, window, undefined) {
   var animationDuration;

   animationDuration = 600;

   $(document).ready(function () {
      $('.separator').click(showText);
      $('#to_new').click(function(event) {
         if (!$('#new_background').is(':visible')) {
            $('#new_holder').show();
            $('#new_background').show();
         }
      });
   });

   function showText () {
      $('#new_holder').slideToggle(animationDuration);
      $('#new_background').slideToggle(animationDuration);
      return false;
   }
})(window.jQuery, window);