$(document).ready(function () {
    //       MENU
    let header = $(".js-header");

    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            header.addClass('white-bg');
        } else {
            header.removeClass('white-bg');
        }
    });

    $("a.nav_link").click(function () {
        $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        }, {
            duration: 2000,
            aesing: 'swing'
        });
        return false;
    });

    $(".header_burger").click(function (event) {
        $(".header_burger, .header_menu").toggleClass("active");
        $("body").toggleClass("lock");
    });

    //  TABS
    let tab = $('.container .tab_wrapper > div');
    tab.hide().filter(':first').show();

    $('.container .tabs_list a').click(function () {
        tab.hide();
        tab.filter(this.hash).show();
        $('.container .tabs_list a').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    //   Stars
    $(function () {
        $('.example').barrating({
            theme: 'css-stars'
        });
    });
});

//   AJAX + Slider Products
$.ajax({
    url: '../../data/products_list.json',
    type: 'get',
    dataType: 'json',
    success: function (products_list) {
        let list_html = '',
            item;
        for (let p in products_list) {
            item = products_list[p];
            list_html += `                <div>
                    <div class="top">
                        <select class="example">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <div class="name">${item.name}</div>
                        <img src="${item.image}" alt="${item.alt}">
                        <div class="bottom">
                            <div class="price"><span>${item.price}</span></div>
                            <a href="#" class="hvr-pulse">Shop</a>
                        </div>
                    </div>
                </div>`;
        }
        $(list_html).replaceAll("#prod_list");
        $('.slider_products').bxSlider({
            pager: false,
            controls: true,
            auto: true,
            pause: 10000,
            minSlides: 1,
            maxSlides: 3,
            slideMargin: 50,
            slideWidth: 610,
            moveSlides: 1,
            shrinkItems: true
        });
    },
    error: function (err) {
        alert(err.status);
    }
});

//    Slider Reviews
$('.slider_reviews').bxSlider({
    pager: false,
    controls: true,
    auto: true,
    pause: 10000,
    moveSlides: 1,
    shrinkItems: true
});

//    Accordion
let accodion = function () {
    let data = $(".accordion").attr("data-accordion");

    $(".accordion_header").on("click", function () {
        if (data === "close") {
            $(".accordion_body").slideUp();
            if ($(this).hasClass("active")) {
                $(this).toggleClass("active");
            } else {
                $(".accordion_header").removeClass("active");
                $(this).toggleClass("active");
            }
        } else {
            $(this).toggleClass("active");
        }
        $(this).next(".accordion_body").not(".animated").slideToggle();
    });
}
accodion();