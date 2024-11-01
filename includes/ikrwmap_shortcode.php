<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
// Define a function to handle the shortcode output
function ikrwmap_shortcode_function() {
    // Start output buffering
    ob_start();
    ?>
    <!-- Output the <div> element with the specified ID "map" -->
    <div id="ikrwmap_output">
    <object class="svg_img_obj" data=" <?php echo plugins_url( "../assets/images/worldmap.svg", __FILE__ )?>" ></object>

    <img id="setImage" src="" alt="">
    </div>
    <?php
    // Get the buffered output and clean (flush) the buffer
    return ob_get_clean();
}

// Register the shortcode
add_shortcode('ikr_world_map', 'ikrwmap_shortcode_function');



?>