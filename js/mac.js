allowed = false;
iconSize = 41;
squareSize = 0;
shiftIcon = 0;
iconNumber = 9;
pieSlice = 360/iconNumber;
first = true;

$(document).ready(function() {

    setMacIconSize();
	circularize();
    infoOnHover();
});

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
    console.log("Lower bound: " + $(window).scrollTop());
    console.log("Upper bound: " + ($(window).scrollTop() + $(window).height()));
    console.log("Current position: " + macPosition + "\n");
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
}
