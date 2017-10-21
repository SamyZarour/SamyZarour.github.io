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
});