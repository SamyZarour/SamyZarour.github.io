var allowed = false;
var iconSize = 41;
var squareSize = 0;
var shiftIcon = 0;
var iconNumber = 9;
var pieSlice = 360/iconNumber;
var first = true;

var didScroll=false;
var lastScrollTop = 0;
var delta = 5;
var greenColor = "#70ccc0";
var first = true;

var lastId;
var topMenu;
var topMenuHeight;
        // All list items
var menuItems;
var scrollItems;

$(document).ready(function() {
    setupTab();
    setMacIconSize();
	circularize();
    infoOnHover();
    // setTab();
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
}

function circularize() {
    if(first){
        animateIcons();
        first = false;
    }
    $(window).scroll(function(event) {
        animateIcons();
    });
}

function animateIcons() {
    var macPosition = $('.square').offset().top + $('.square').height()/2;
    shiftIcon = squareSize*0.5 + iconSize*1.5;
    // console.log("Lower bound: " + $(window).scrollTop());
    // console.log("Upper bound: " + ($(window).scrollTop() + $(window).height()));
    // console.log("Current position: " + macPosition + "\n");
    if (!$('.skill-icon').hasClass('circularized') && $(window).scrollTop()+$(window).height() > macPosition && $(window).scrollTop() < macPosition) {
        $('.skill-icon').each(function(index, el) {
            var ID = "icon" + "0" + (index + 1);
            $(this).attr('id', ID);
            $('#'+ID).css("-moz-transform","rotate(" + (index*pieSlice) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*pieSlice) + "deg)");
            $('#'+ID).css("-ms-transform","rotate(" + (index*pieSlice) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*pieSlice) + "deg)");
            $('#'+ID).css("-o-transform","rotate(" + (index*pieSlice) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*pieSlice) + "deg)");
            $('#'+ID).css("-webkit-transform","rotate(" + (index*pieSlice) + "deg) translate("+ shiftIcon + "px) rotate(-" + (index*pieSlice) + "deg)");
        });
        setTimeout(function() {
            $('.skill-icon').addClass('circularized');
            $('#info00').css('opacity', '1');
            allowed = true;
        }, 1500);
    }
}

function infoOnHover() {
    $('.skill-icon').hover(function() {
        if (!allowed) {
            return false;
        }
        $('.skill-icon').not(this).css('opacity', '0.6');
        var infoID = "#info" + this.id.slice(4);
        $("#info00").css('opacity', 0);
        $(infoID).css('opacity', 1);
    }, function() {
        if (!allowed) {
            return false;
        }
        $('.skill-icon').not(this).css('opacity', '1');
        var infoID = "#info" + this.id.slice(4);
        $(infoID).css('opacity', 0);
        $("#info00").css('opacity', 1);
    });

    $('.skill-icon').click(function(){
        if (!allowed) {
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
    topMenuHeight = topMenu.outerHeight();
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
     if ($(this).offset().top <= fromTop)
       return this;
    });
    cur = cur[cur.length-1];
    var id = ($('#contact-page').offset().top < fromTop + $(this).height()) ? scrollItems[scrollItems.length-1][0].id : cur[0].id;
    if (lastId !== id) {
       lastId = id;
       menuItems.filter("[href='#"+id+"']").focus();
    }  
}