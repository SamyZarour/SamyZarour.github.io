var circularized = false;
var first = true;
var didScroll=false;

var ICON_NUMBER = 9;
var PIE_SLICE = 360/ICON_NUMBER;

var lastScrollTop = 0;
var delta = 5;
var greenColor = "#70ccc0";

var lastScrollTop;
var lastId;

var menuItems;
var scrollItems;

$(document).ready(function() {
    setupTab();
    var sizes = setMacIconSize();
	circularize(sizes[0], sizes[1]);
    infoOnHover();
    lastScrollTop = $(this).scrollTop();
    if(lastScrollTop > 0){
        $('header').addClass('nav-up');
    }
});

// SKILLS

function setMacIconSize(){

    squareSize = $('.square').width();
    iconSize = squareSize*0.1;

    $('.skill-icon').css('top','calc(50% - ' + iconSize/2 + 'px)');
    $('.skill-icon').css('left','calc(50% - ' + iconSize/2 + 'px)');
    $('.skill-icon').children('img').css('height',iconSize+'px');
    $('.square').css('margin',3*iconSize+'px 25%');

    return [squareSize, iconSize];
}

function circularize(squareSize, iconSize) {
    if(first){
        animateIcons(squareSize, iconSize);
        first = false;
    }
    $(window).scroll(function(event) {
        animateIcons(squareSize, iconSize);
    });
}

function animateIcons(squareSize, iconSize) {
    var macPosition = $('.square').offset().top + $('.square').height()/2;
    shiftIcon = squareSize*0.5 + iconSize*1.5;
    if (!$('.skill-icon').hasClass('circularized') && $(window).scrollTop()+$(window).height() > macPosition && $(window).scrollTop() < macPosition) {
        $('.skill-icon').each(function(index, el) {
            var ID = "icon" + "0" + (index + 1);
            $(this).attr('id', ID);
            $('#'+ID).css("-moz-transform","rotate(" + (index*PIE_SLICE) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*PIE_SLICE) + "deg)");
            $('#'+ID).css("-ms-transform","rotate(" + (index*PIE_SLICE) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*PIE_SLICE) + "deg)");
            $('#'+ID).css("-o-transform","rotate(" + (index*PIE_SLICE) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*PIE_SLICE) + "deg)");
            $('#'+ID).css("-webkit-transform","rotate(" + (index*PIE_SLICE) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*PIE_SLICE) + "deg)");
        });
        // what is setTimeOut and what is this even doing actually. Once animation is done it turns on the descr
        setTimeout(function() {
            $('.skill-icon').addClass('circularized');
            $('#info00').css('opacity', '1');
            circularized = true;
        }, 1500);
    }
}

function infoOnHover() {
    $('.skill-icon').hover(function() {
        if (!circularized) {
            return false;
        }
        $('.skill-icon').not(this).css('opacity', '0.6');
        var infoID = "#info" + this.id.slice(4);
        $("#info00").css('opacity', 0);
        $(infoID).css('opacity', 1);
    }, function() {
        if (!circularized) {
            return false;
        }
        $('.skill-icon').not(this).css('opacity', '1');
        var infoID = "#info" + this.id.slice(4);
        $(infoID).css('opacity', 0);
        $("#info00").css('opacity', 1);
    });

    $('.skill-icon').click(function(){
        console.log("printed");
        if (!circularized) {
            return false;
        }
        $(this).css('opacity', '1');
        $('.skill-icon').not(this).css('opacity', '0.6');
        var infoID = "#info" + this.id.slice(4);
        $(".mac-screen:not(" + infoID + ")").css('opacity', 0);
        $(infoID).css('opacity', 1);
    });
}

// ARROW

setInterval(function(){
    $('#arrow').css('bottom','15px');
    setTimeout(function(){
        $('#arrow').css('bottom','30px');
    }, 500);
}, 5000);

// NAV

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
    lastId = "";
    setTab();
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

$(window).scroll(function(event){
    didScroll = true;
    setTab();
});

function setupTab(){
    topMenu = $(".navbar-nav");
    menuItems = topMenu.find("a");
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });
    setTab();
}

function setTab(){
    var fromTop = $(this).scrollTop();
    var cur = scrollItems.map(function(){
        if ($(this).offset().top <= fromTop + 30) return this;
    });
    console.log(cur.length);
    curId = cur.length;
    if(curId == 0 || $('#contact-page').offset().top < fromTop + $(this).height()) menuItems[curId].focus();
    else menuItems[curId-1].focus();
    // if(cur.length>0){
    //     curId = cur[cur.length-1];
    //     var id = ($('#contact-page').offset().top < fromTop + $(this).height()) ? scrollItems[scrollItems.length-1][0].id : curId.id;
    //     menuItems[0].focus();
    // }
}