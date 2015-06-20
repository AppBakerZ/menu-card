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

        var data = {
            'action': 'my_action',
            'category': category.split(',')
        };

        // We can also pass the url value separately from ajaxurl for front end AJAX implementations
        jQuery.post(ajax_object.ajax_url, data, function(response) {
            console.log(response)
        });


	});
}(jQuery));