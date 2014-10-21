jQuery( document ).ready(function () {
	
	jQuery('.coupon .inactive').click(function(){
		jQuery(this).fadeOut(100, function(){
				jQuery('.coupon_active').fadeIn(100);
				return false;
		});
	})	
});