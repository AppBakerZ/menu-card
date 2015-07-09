<?php
/**
 * Restaurants Menu Cards
 * 
 *
 * @wordpress-plugin
 * Plugin Name: Menu Card
 * Plugin URI:  https://wordpress.org/plugins/menu-card/
 * Description: Menu Card Lets you build menu card of restaurants, with a shortcode.
 * Version:     0.5.0
 * Author:      Furqan Khanzada
 * Author URI:  furqankhanzada.com
 * Text Domain: menu-card-locale
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /lang
 */

add_filter('locale', 'Menu_Card_handle_locale_filter');

function Menu_Card_handle_locale_filter($locale) {
  return "en_TEST";
}

 
 // include plugin info file
require( dirname( __FILE__ ) . '/src/menu-card.php' );
