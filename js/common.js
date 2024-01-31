$(function() {
    /* INITIALIZE */
    var $tabBtn = $('.tab__btn');
    
    /* FUNCTION */
    var initialize = function () {
        console.log(document.title + ' initialize start...');

        kvSwiper();
        portfolioTab();
        initPopup();
        getHeaderHeight();

        /* EVENT */
        {
            window.addEventListener('resize', resizeWindow);
        };
    },
    resizeWindow = function() {
        getHeaderHeight();
    };

    function kvSwiper() {
        var kvSwiper = new Swiper('.kv-swiper', {
            loop: true,
            navigation: {
                nextEl: '.kv-swiper__navi-btn-next',
                prevEl: '.kv-swiper__navi-btn-prev',
            },
        });
    }

    function portfolioTab() {
        if ($('.tab').length === 0) return;

        if ($('.tab-all-btn').hasClass('on') === true) {
            $('.tab__item').addClass('active');
        }

        $tabBtn.on('click', function(e) {
            if ($(this).hasClass('active') === true) {
                $(e.target).preventDefault();
            }

            $('.tab__item').css('display','none');

            var $filter = $(e.target).data('filter'),
                $tabContainer = $(e.target).closest('.tab'),
                $tabItem = $tabContainer.find('.tab__item');

            if ($filter === null) return;

            $tabBtn.removeClass('active');
            $tabItem.removeClass('active');
            $(this).addClass('active');
        
            $tabItem.each(function () {
                var itemFilters = $(this).data('type').split(' ');
        
                if ($filter === '*' || itemFilters.includes($filter)) {
                    $(this).css('display', 'block');
                    // $(this).fadeIn(700);
                    $(this).addClass('active');
                } else {
                    $(this).css('display', 'none');
                    $(this).removeClass('active');
                }
            });
        });
    }

    function initPopup() {
        if($('.popup-wrap').length < 1) return;
        
        $('.popup-open').on('click', function (e) {
            e.preventDefault();
            var slt = $(this).attr('href');
            $(slt).show().siblings().hide();
            $('.popup-wrap').addClass('active');
            $('body').addClass('body-lock');
        });
    
        $('.btn-popup-close').on('click', function(e){
            $('.popup-wrap').removeClass('active');
            $('body').removeClass('body-lock');
        });
    }

    function getHeaderHeight() {
        var headerHeight = $('.header').outerHeight();

        $('body').css('margin-top', headerHeight);
    }

    // Document Load
    window.addEventListener('load', initialize()) ;
});