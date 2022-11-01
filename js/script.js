$(document).ready(() => {
    $('[data-anchor]').click(function () {
        $('html, body').animate({
            scrollTop: $('[data-target=' + $(this).attr('data-anchor') + ']').offset().top - 60
        }, 'slow');
    });

    // $('.gallery__item').click(function () {
    //     $('.gallery__item').removeClass('active');
    //     $(this).addClass('active');
    // });
});