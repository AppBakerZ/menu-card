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
            'action': 'get_posts_by_category',
            'category': category.split(',')
        };

        var getTemplate = jQuery.get(ajax_object.template_url),
            getPosts = jQuery.post(ajax_object.ajax_url, data);

        $.when(getTemplate, getPosts).done(function(template, posts){
            // the code here will be executed when all 2 ajax requests resolve.
            // status, and jqXHR object for each of the 2 ajax calls respectively.
            var result = _.template(template[0], {menus: posts[0]});
            $container.append(result);

            console.log(posts[0])
        });

	});
}(jQuery));