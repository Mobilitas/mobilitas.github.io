jQuery(document).ready(function($) {

    var bh = $('.sidebar-container').height();
    var pos = $('#buynow-buttons').position();

    if ($(window).width() > 840) {
        $('#buynow-buttons').top
    }

    $(window).scroll(function() {

        var c = $(document).scrollTop();
        var b = $(window).height();
        var w = $(document).width();

        if ($(window).width() > 840) {
            if (c > 60 + pos.top) {
                $('#buynow-buttons').css('position', 'fixed').css('width', $('.rightbox').width()).addClass('fixed');
            } else {
                $('#buynow-buttons').removeAttr('style').removeClass('fixed');
            }
        } else {
            $('#buynow-buttons').removeAttr('style').removeClass('fixed');
        }
        console.log(bh);
    });

    $(window).resize(function() {
        if ($(window).width() <= 840) {
            $('#buynow-buttons').removeAttr('style').removeClass('fixed');
        } else {
            $('#buynow-buttons').css('width', $('.rightbox').width());
        }
    });
});