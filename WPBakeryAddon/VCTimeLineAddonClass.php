<?php


class VCTimeLineAddonClass {

    protected static $name = 'Timeline';

    protected static $description = "Animated Timeline";

    function __construct() {
        // We safely integrate with VC with this hook
        add_action( 'init', array( $this, 'integrateWithVC' ) );

        // Use this when creating a shortcode addon
        add_shortcode( 'timeline', array( $this, 'render' ) );

        // Register CSS and JS
        add_action( 'wp_enqueue_scripts', array( $this, 'loadCssAndJs' ) );
    }

    public function integrateWithVC() {
        // Check if WPBakery Page Builder is installed
        if ( ! defined( 'WPB_VC_VERSION' ) ) {
            // Display notice that Extend WPBakery Page Builder is required
            add_action('admin_notices', array( $this, 'showVcVersionNotice' ));
            return;
        }

        /*
        Add your WPBakery Page Builder logic here.
        Lets call vc_map function to "register" our custom shortcode within WPBakery Page Builder interface.

        More info: http://kb.wpbakery.com/index.php?title=Vc_map
        */
        vc_map( array(
            "name" => __(self::$name, 'vc_extend'),
            "description" => __(self::$name, 'vc_extend'),
            "base"     => "timeline",
            "class"    => "",
            "controls" => "full",
            "icon"     => plugins_url('assets/timeline.png', __FILE__),
            "category" => __('Content', 'js_composer'),
            //'admin_enqueue_js' => array(plugins_url('assets/vc_extend.js', __FILE__)),
            //'admin_enqueue_css' => array(plugins_url('assets/vc_extend_admin.css', __FILE__)),
            "params" => array(
                array(
                    'type' => 'param_group',
                    'value' => '',
                    'heading' =>  __( 'List Items', 'pt-vc' ),
                    'params' => array(
                        array(
                            'type' => 'textfield',
                            'value' => '',
                            'heading' => __( 'Jahr', 'pt-vc' ),
                            'param_name' => '',
                        ),
                        array(
                            'type' => 'textfield',
                            'value' => '',
                            'heading' => __( 'Titel', 'pt-vc' ),
                            'param_name' => '',
                        ),
                        array(
                            'type' => 'textarea_html',
                            'value' => '',
                            'heading' => __( 'Content', 'pt-vc' ),
                            'param_name' => 'content',

                        ),
                        array(
                            'type' => 'attach_images',
                            'value' => '',
                            'heading' => __( 'Bilder', 'pt-vc' ),
                            'param_name' => '',
                        )
                    )
                ),
            )
        ) );
    }


    /*
    Shortcode logic how it should be rendered
    */
    public function render( $atts, $content = null ) {

          extract( shortcode_atts( array(
            'foo' => 'something',
            'color' => '#FF0000'
        ), $atts ) );
        $content = wpb_js_remove_wpautop($content, true); // fix unclosed/unwanted paragraph tags in $content

        return $content;
    }

    /*
    Load plugin css and javascript files which you may need on front end of your site
    */
    public function loadCssAndJs() {
        wp_register_style( 'vc_extend_style', plugins_url('assets/vc_extend.css', __FILE__) );
        wp_enqueue_style( 'vc_extend_style' );

        // If you need any javascript files on front end, here is how you can load them.
        //wp_enqueue_script( 'vc_extend_js', plugins_url('assets/vc_extend.js', __FILE__), array('jquery') );
    }

    /*
    Show notice if addon is activated but Visual Composer is not
    */
    public function showVcVersionNotice() {
        $plugin_data = get_plugin_data(__FILE__);
        echo '
        <div class="updated">
          <p>'.sprintf(__('<strong>%s</strong> requires <strong><a href="http://bit.ly/vcomposer" target="_blank">Visual Composer</a></strong> plugin to be installed and activated on your site.', 'vc_extend'), $plugin_data['Name']).'</p>
        </div>';
    }
}

// initialize code
new VCTimeLineAddonClass();



