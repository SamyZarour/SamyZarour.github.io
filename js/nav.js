var didScroll=false;
var lastScrollTop = 0;
var delta = 5;
var greenColor = "#70ccc0";

$(window).ready(function(){
    setTab();
    lastScrollTop = $(this).scrollTop();
    if(lastScrollTop > 0){
        $('header').addClass('nav-up');
    }
});

$(window).scroll(function(event){
    didScroll = true;
    setTab();
});

setInterval(function(){
    $('#arrow').css('bottom','15px');
    setTimeout(function(){
        $('#arrow').css('bottom','30px');
    }, 500);
}, 5000);

setInterval(function(){
    setTab();
}, 700);

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 400);

function hasScrolled() {
    var st = $(window).scrollTop();
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > 0){
        $('header').addClass('nav-up');
    } else {
        $('header').removeClass('nav-up');
    }
    lastScrollTop = st;
}

function setTab(){
    if( $('#intro-page').offset().top + $('#intro-page').height() > lastScrollTop && lastScrollTop >= $('#intro-page').offset().top){
        $('.navbar-right li:nth-child(1)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(1)').css("background-color","transparent");
    }
    if( $('#about-page').offset().top + $('#about-page').height() > lastScrollTop && lastScrollTop >= $('#about-page').offset().top){
        $('.navbar-right li:nth-child(2)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(2)').css("background-color","transparent");
    }
    if( $('#skills-page').offset().top + $('#skills-page').height() > lastScrollTop && lastScrollTop >= $('#skills-page').offset().top){
        $('.navbar-right li:nth-child(3)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(3)').css("background-color","transparent");
    }
    if( $('#portfolio-page').offset().top + $('#portfolio-page').height() > lastScrollTop && lastScrollTop >= $('#portfolio-page').offset().top){
        $('.navbar-right li:nth-child(4)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(4)').css("background-color","transparent");
    }
    if( $('#exp-page').offset().top + $('#exp-page').height() > lastScrollTop && lastScrollTop >= $('#exp-page').offset().top && lastScrollTop + $(window).height() <= $('#contact-page').offset().top){
        $('.navbar-right li:nth-child(5)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(5)').css("background-color","transparent");
    }
    if( lastScrollTop+$(window).height() > $('#contact-page').offset().top){
        $('.navbar-right li:nth-child(6)').css("background-color",greenColor);
    }
    else{
        $('.navbar-right li:nth-child(6)').css("background-color","transparent");
    }
}
