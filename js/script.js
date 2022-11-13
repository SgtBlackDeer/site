$(document).ready(() => {
    $('[data-anchor]').click(function () {
        $('html, body').animate({
            scrollTop: $('[data-target=' + $(this).attr('data-anchor') + ']').offset().top - 60
        }, 'slow');
    });

    Fancybox.bind(".gallery__item");
});