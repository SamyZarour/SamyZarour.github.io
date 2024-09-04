$(document).ready(function(){
  var zindex = 10;

  $("div.project").click(function(e){
    e.preventDefault();

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true;
    }

    if ($("div.projects").hasClass("showing")) {
      // a project is already in view
      $("div.project.show")
        .removeClass("show");

      if (isShowing) {
        // this project was showing - reset the grid
        $("div.projects")
          .removeClass("showing");
      } else {
        // this project isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no projects in view
      $("div.projects")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");
      zindex++;
    }

  });

  $(window).on('scroll', function(event){
   var scrollPos = $(document).scrollTop();
   $(".navbar li a").each(function () {
     var currLink = $(this);
     var refElement = $(currLink.attr("href"));
     if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
       currLink.addClass("active").parent().siblings().find('a').removeClass("active");
     }
     else if(refElement.attr('id') != 'contact-page'){
       currLink.removeClass("active");
       if(refElement.attr('id') == 'timeline-page' && refElement.position().top + refElement.height() <= scrollPos + $(window).height()){
        $('a[href="#contact-page"]').addClass("active").parent().siblings().find('a').removeClass("active");
       }
     }
   });
 });

  $('nav').find('a').click(slowScroll);
  $('#point-down').click(slowScroll);
});

var slowScroll = function(env){
    env.preventDefault();
    var href = $(this).attr('href');
    var anchor = $(href).offset().top;
    $('html, body').animate({scrollTop: anchor}, 1000);
    return false;
  };