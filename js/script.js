$(document).ready(() => {
    $('[data-anchor]').click(function () {
        $('html, body').animate({
            scrollTop: $('[data-target=' + $(this).attr('data-anchor') + ']').offset().top - 60
        }, 'slow');
    });

    $('[data-project]').click(function() {
        $('[data-project]').removeClass('active');
        $(this).addClass('active');
        $('.projects').removeClass('active');
        $('.projects--' + $(this).attr('data-project')).addClass('active');
    });

    Fancybox.bind(".gallery__item");
});