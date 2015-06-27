/**
 * Menu Card public facing js file
 *
 * @package Menu_Card
 * @author  Furqan Khanzada <furqan.khanzada@gmail.com>
 * @license   GPL-2.0+
 * @link      https://wordpress.org/plugins/menu-card/
 */
 

(function ($) {
	"use strict";
	$(function () {
		// Place your public-facing JavaScript here
        var $body = $('body'),
            $container = $body.find('#menu-card'),
            category = $container.data('category');

        // Terminate if element is not exist
        if(!$container.length)
            return;

        var data = {
            'action': 'get_posts_by_category',
            'category': category && category.split(',')
        };

        var getTemplate = jQuery.get(ajax_object.template_url),
            getPosts = jQuery.post(ajax_object.ajax_url, data);

        $.when(getTemplate, getPosts).done(function(template, posts){
            // the code here will be executed when all 2 ajax requests resolve.
            // status, and jqXHR object for each of the 2 ajax calls respectively.
            //var columns = posts[0]
            //Making columns
            var count = 1;
            var index = 0;
            var data = [];
            _.each(posts[0], function(cat, key){
                var obj = {};
                obj[key] = cat;
                data[index] ? data[index].push(obj) : (data[index] = [obj]);
                //move to next after adding 2 categories to each column
                if(count % 2 == 0){
                    index++;
                }
                count++
            });

            //console.log('data :', data);
            var result = _.template(template[0], {columns: data});
            $container.append(result);

            //console.log(posts[0]);

            ///////////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////

            //get menu card's column wrapper,
            //set first page on front screen
            var $columnWrapper = $('#column_wrapper'),
                pageHeight = $columnWrapper.children('div').children('div').siblings('.page_number_0').innerHeight();

            //set menu card's column wrapper height as long as menu card's page height,
            //add active class on visible page.
            $columnWrapper.css('height', pageHeight);
            $columnWrapper.children('div').children('div').siblings('.page_number_0').addClass("active_menu").show();

            //add condition on previous arrow .
            if(!$columnWrapper.children('div').children('div').siblings('.page_number_0').prev('.menu_card_page').length){
                $('.nav_previous').hide();
            }

            //set menu card's page width as long as menu card's column wrapper width,
            $('.menu_card_page').css('width', $columnWrapper.innerWidth());
            $columnWrapper.css('height', $('.page_number_0').innerHeight());

            // store browser window width in variable.
            var storeFirstWindowSize = $(window).width();
            var waitToFinishResize;

            //declare a resize function.
            $(window).resize(function() {
                clearTimeout(waitToFinishResize);
                waitToFinishResize = setTimeout(doneResizing, 500);
            });

            // when resize is done then this function is going to run.
            function doneResizing(){

                $('.menu_card_page').css('width', $columnWrapper.innerWidth());

                if( storeFirstWindowSize < $(window).width() ){
                    var currentIndex = $('.active_menu').index();
                    var getCurrentSlideWidth = ($columnWrapper.innerWidth() * currentIndex) + 'px';
                    var getPrevSlideWidth = - ($columnWrapper.innerWidth() * currentIndex) + 'px';

                    $('.active_menu').css({
                        '-webkit-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-moz-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-o-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-ms-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )'
                    });

                    if($('.active_menu').prev('.menu_card_page').length){
                        $('.active_menu').prev('.menu_card_page').css({
                            '-webkit-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-moz-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-o-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-ms-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )'
                        });
                    }

                    if($('.active_menu').next('.menu_card_page').length){
                        $('.active_menu').next('.menu_card_page').css({
                            '-webkit-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-moz-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-o-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-ms-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )'
                        });
                    }


                }else if( storeFirstWindowSize > $(window).width()){
                    var currentIndex = $('.active_menu').index();
                    var getCurrentSlideWidth = - ($columnWrapper.innerWidth() * currentIndex) + 'px';
                    var getPrevSlideWidth = ($columnWrapper.innerWidth() * currentIndex) + 'px';

                    $('.active_menu').css({
                        '-webkit-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-moz-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-o-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                        '-ms-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )'
                    });

                    if($('.active_menu').next('.menu_card_page').length) {
                        $('.active_menu').next('.menu_card_page').css({
                            '-webkit-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-moz-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-o-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )',
                            '-ms-transform' : 'translate( '+ getCurrentSlideWidth +' , 0 )'
                        });
                    }

                    if($('.active_menu').prev('.menu_card_page').length) {
                        $('.active_menu').prev('.menu_card_page').css({
                            '-webkit-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-moz-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-o-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )',
                            '-ms-transform' : 'translate( '+ getPrevSlideWidth +' , 0 )'
                        });
                    }


                }

                // add condition that on mobile menu card's should be 100% width
                if($(window).width() < 640)
                {
                    $('.two_column').css('width', '100%');
                }else{
                    $('.two_column').css('width', '45%');
                }

            }

        });

        ////////////////////////////////////////////////////////////

        // declare a function when previous arrow hit.
        $body.on('click', '.nav_previous', function(){

            var $columnWrapper = $('#column_wrapper');

            if($('.active_menu').prev('.menu_card_page').length) {

                var prevSlideIndex = $('.active_menu').prev('.menu_card_page').index();
                var getSlideWidth = ($columnWrapper.innerWidth() * prevSlideIndex) + 'px';
                var getPrevSlide = - ($columnWrapper.innerWidth() * prevSlideIndex) + 'px';

                $('.active_menu').prev('.menu_card_page').css({
                    '-webkit-transform' : 'translate( '+ getPrevSlide +' , 0 )',
                    '-moz-transform' : 'translate( '+ getPrevSlide +' , 0 )',
                    '-o-transform' : 'translate( '+ getPrevSlide +' , 0 )',
                    '-ms-transform' : 'translate( '+ getPrevSlide +' , 0 )'
                });

                $('.active_menu').css({
                    '-webkit-transform' : 'translate( '+ getSlideWidth +' , 0 )',
                    '-moz-transform' : 'translate( '+ getSlideWidth +' , 0 )',
                    '-o-transform' : 'translate( '+ getSlideWidth +' , 0 )',
                    '-ms-transform' : 'translate( '+ getSlideWidth +' , 0 )'
                });

                $('.active_menu').prev('.menu_card_page').addClass('active_menu')
                    .siblings('.menu_card_page').removeClass('active_menu');

            }

                var pageHeight = $('.active_menu').innerHeight();
                $columnWrapper.css('height', pageHeight);

            if($('.active_menu').prev('.menu_card_page').length == 0) $('.nav_previous').hide();
            if($('.active_menu').next('.menu_card_page').length != 0) $('.nav_next').show();

        });

        ////////////////////////////////////////////////////////////

        // declare a function when next arrow hit.
        $body.on('click', '.nav_next', function(){

            var $columnWrapper = $('#column_wrapper');

            if($('.active_menu').next('.menu_card_page').length) {

                var nextSlideIndex = $('.active_menu').next('.menu_card_page').index();
                var getSlideWidth = - ($columnWrapper.innerWidth() * nextSlideIndex) + 'px';

                $('.active_menu').next('.menu_card_page').css({
                    '-webkit-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-moz-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-o-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-ms-transform': 'translate( '+ getSlideWidth +' , 0 )'
                });

                $('.active_menu').css({
                    '-webkit-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-moz-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-o-transform': 'translate( '+ getSlideWidth +' , 0 )',
                    '-ms-transform': 'translate( '+ getSlideWidth +' , 0 )'
                });

                $('.active_menu').next('.menu_card_page').addClass('active_menu')
                    .siblings('.menu_card_page').removeClass('active_menu');

            }

                var pageHeight = $('.active_menu').innerHeight();
                $columnWrapper.css('height', pageHeight);

            if($('.active_menu').next('.menu_card_page').length == 0) $('.nav_next').hide();
            if($('.active_menu').prev('.menu_card_page').length != 0) $('.nav_previous').show();

        });

        ////////////////////////////////////////////////////////////

	});
}(jQuery));