jQuery(document).ready(function() {
    var products = ['shop', 'startupdark', 'startupbright', 'thebricks', 'impressionist', 'pandora', 'flatui'];
    var productNames = ['Designmodo Shop', 'Startup Framework (Dark Theme)', 'Startup Framework (Bright Theme)', 'The Bricks', 'Impressionist UI', 'Pandora UI', 'Flat UI Pro'];
    var sizes = ['120_240', '120_600', '125_125', '160_600', '180_150', '250_250', '300_250', '336_280', '468_60', '728_90'];

    for (var i = 0; i < products.length; i++) {
        jQuery('#product').append('<option id="product_' + products[i] + '" value=' + products[i] + '>- ' + productNames[i] + '</option>');
    }

    for (var i = 0; i < sizes.length; i++) {
        jQuery('#size').append('<option id="size_' + sizes[i] + '" value=' + sizes[i] + '>- ' + sizes[i].split('_').join("x") + '</option>');
    }

    jQuery('#product').change(function() {
        var product = jQuery('#product :selected').attr('value');
        var productName = jQuery('#product :selected').text().replace(/-|\(Dark Theme\)|\(Bright Theme\)/g, '');

        window.selectedProduct = product;
        window.selectedProductName = jQuery.trim(productName);
        showbanner();
    });

    jQuery('#size').change(function() {
        var size = jQuery('#size :selected').attr('value');
        window.selectedSize = size;
        showbanner();
    });

    jQuery('#affiliateLink').blur(function() {
        showbanner();
    });

    function showbanner() {
        var affiliateLink = jQuery('#affiliateLink').attr('value');

        if ((window.selectedProduct) && (window.selectedSize)) {
            var currentUrl = 'http://designmodo.com/img/affiliate/' + selectedProduct + '_' + selectedSize + ".jpg";
            var sizes = selectedSize.split('_');

            jQuery('#banner').css('opacity', '0').attr('width', sizes[0]);

            setTimeout(function() {
                jQuery('#banner').attr('src', currentUrl);
                jQuery('#banner').load(function() {
                    jQuery('#banner').css('opacity', 1).attr('height', sizes[1]);
                });
            }, 500);
        }
        
        if ((currentUrl) && (affiliateLink) && window.selectedProduct) {
            var text = '<a href="' + affiliateLink + '" rel="nofollow" title="' + selectedProductName + '" target="_blank"><img src="' + currentUrl + '" border="0"  width="' + sizes[0] + '" height="' + sizes[1] + '" alt="' + selectedProductName + '" /></a>';
            jQuery('#text-to-copy').text(text).select();
        }
    }
    setTimeout(function() {
        jQuery('#size_300_250').attr('selected', true);
        window.selectedProduct = 'shop';
        window.selectedSize = '300_250';
        var sizes = window.selectedSize.split('_');

        jQuery('#banner')
        jQuery('#product_shop').attr('selected', true);
        jQuery('#banner').attr('src', 'http://designmodo.com/img/affiliate/shop_300_250.jpg').attr('width', sizes[0]).attr('height', sizes[1]);
    }, 200)
});