$(document).ready(function() {
	if (window.isMobile){ $('body').addClass('mobile');}
	
	//prepare video
    $('.video').height($(window).height());
	
    $(window).resize(function() {
        $('.video').height($(window).height());
    });
    $('.video .cont').addClass('visible');
	
    setTimeout(function() {
        $('.video .sdf, .video .suys, .video .arrow').addClass('visible');
    }, 2000);
    
	//bg video
    $.backgroundVideo($('#bgVideo'), {
        "align": "centerXY",
		 "path": "http://designmodo.com/storage/",
        "width": 846,
        "height": 476,
        "filename": "startuppreview",
        "types": ["mp4", "ogg", "webm"]
    });
	
    //play video
    $('.video .play').click(function() {
        //stop the video
		if (!window.isMobile){
			$('body').addClass('noscroll').append('<div class="previewer"><div><iframe src="//player.vimeo.com/video/81676731?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><div class="close"></div></div>');
	
			//pause video
			$('body').addClass('paused');
			
			$('.previewer').click(function() {
				$('body').removeClass('noscroll');
				$(this).remove();
				
				//play video back
				$('body').removeClass('paused');
			});
			return false;
		}
    });
	
	//hide video when tab inactive 
	var isActive = true;
	
	window.onfocus = function () { isActive = true; }; 
	window.onblur = function () { isActive = false; }; 
	
	setInterval(function () { 
		paused = $('body').hasClass('paused');
		if ((isActive)&&(!paused)){
			$('#video_background').get(0).play();	
		} else {
			$('#video_background').get(0).pause();
		}
	}, 500);
	
    //hide video on scroll
	$(document).scroll(function() {
    	if ($(document).scrollTop() > $(window).height() - 50) {
    		$('body').addClass('paused');
    	} else {
    		if ($('body').hasClass('paused')){
    			$('body').removeClass('paused');
    		}
			
			var proportion = 1 - roundNum($(document).scrollTop() / $(window).height());
			var bottomPos = 40 - (40*roundNum($(document).scrollTop() / $(window).height()));
			$('.video .arrow.visible').attr('style','-webkit-transition: 0s; -moz-transition: 0s; -ms-transition: 0s; -o-transition: 0s; transition: 0s;bottom:'+ bottomPos +'px;opacity: '+proportion+'!important');
    	}
    });
	
    //top slider
	if (!window.isMobile){
		var topSliderWr = $('#topSlider-wrapper');
		if (topSliderWr.length > 0) {
			var topSlider = $('#topSlider', topSliderWr).bxSlider({
				'controls': false,
				'pagerCustom': '#topSlider-wrapper #topSliderCtrl',
				'easing': 'ease-in-out',
				'adaptiveHeight': false,
				'infiniteLoop': true
			});
		}
	
		$('#topSliderCtrl li:last-child a').click(function() {
			$('#topSliderCtrl').addClass('white');
		});
	
		$('#topSliderCtrl li:not(:last-child) a').click(function() {
			$('#topSliderCtrl').removeClass('white');
		});
	}
	
    //hide menu
    var lastScrollTop, incr = 0;
    var startsOn = 0;
    var menuSpace = 50;
    var menuBack = 40;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (st > startsOn) {
            if (st > lastScrollTop){
            	incr++;
            	if (incr >= menuSpace){
            		$('#upper-menu-container').addClass('hide');
            		incr = menuSpace;
            	}
            } else {
            	incr -= 1;
            	if (incr <= 10){
            		$('#upper-menu-container').removeClass('hide');
            		incr = 0;
            	}
            }
        } else {
            $('#upper-menu-container').removeClass('hide');
        }
        lastScrollTop = st;
    });

    //dof
    var holder = $('.dof .background');
    var offset = 0;
    var sizePic = 3;

    $('.dof').mousemove(function(e) {

        var y = e.pageY - this.offsetTop;
        var sHeight = holder.outerHeight();

        var y = y - sHeight * offset;
        var sHeight = sHeight - (sHeight * offset * 2);

        if (y >= sHeight)
            y = sHeight;

        var rounded = roundNum((y / sHeight) * (sizePic - 1));
        var hovered = Math.ceil(rounded);

        if (window.oldHovered != rounded) {

            holder.find('*').each(function(index) {
                
                 if (index >= hovered){
                 holder.find('.layer'+index).css('opacity',1);
                 } else {
                 holder.find('.layer'+index).css('opacity',0);
                 }

                if (!$.browser.msie) {
                    var halfOfWay = hovered + 0;
                    var backOpacity = roundNum(hovered - rounded);

                    if (halfOfWay != sizePic) {
                        holder.find('.layer' + halfOfWay).css('opacity', backOpacity);
                    }

                    var maxblur = 6;
                    var centerPos = roundNum(Math.abs(1 - (rounded / (sizePic - 1)) * 2));
                    var blurIt = roundNum(maxblur * centerPos);

                    $('.dof .text-block').attr('style', '-webkit-filter:blur(' + blurIt + 'px);-ms-filter:blur(' + blurIt + 'px);-o-filter:blur(' + blurIt + 'px);filter:blur(' + blurIt + 'px);');
                }
            });
        }
    });

    //component grid
    var componentGrid = $('#component-grid');
    var samplesGrid = $('#samples-grid');
	
	setInterval(function(){
		componentGrid.masonry({itemSelector: '.screen'});
		samplesGrid.masonry({itemSelector: '.screen'});
	}, 3000);
	
    //show images on scroll
	if (!window.isMobile){
		$(document).scroll(function() {
			var speed = 2;
			var offsetSize = 200;
			var samplesCont = $('.samples .holder').offset();
			var componentsCont = $('.components .holder').offset();
			var posFromTop = componentsCont.top - $(window).height() + offsetSize;
			
			
			if ($(document).scrollTop() >= componentsCont.top - $(window).height() + 200) {
				componentGrid.masonry({itemSelector: '.screen'});
			}
			if ($(document).scrollTop() >= samplesCont.top - $(window).height() + 200) {
				samplesGrid.masonry({itemSelector: '.screen'})
			}
			
			
			//components
			if ($(document).scrollTop() >= componentsCont.top - $(window).height()/2) {
				if (!$('.components .holder').hasClass('shown')) {
					if ((!window.isMobile) && (!$.browser.mozilla)) {
						$('.components .screenshots .screen').each(function(index) {
							if (index >= 10) index = 10;
							var speed = index*0.5+"s";
							$(this).css('-webkit-animation',"animatedIntro "+speed).css('-ms-animation',"animatedIntro "+speed).css("-o-animation", "animatedIntro "+speed).css("animation","animatedIntro "+speed);
						});
					}
					//finito
					$('.components .holder').addClass('shown');
				}
			} 
	
			//samples
			if ($(document).scrollTop() >= samplesCont.top - $(window).height()/2) {
				if (!$('.samples .holder').hasClass('shown')) {
	
					if ((!window.isMobile) && (!$.browser.mozilla)) {
						$('.samples .screenshots .screen').each(function(index) {
							if (index >= 10) index = 10;
							var speed = index*0.5+"s";
							$(this).css('-webkit-animation',"animatedIntro "+speed).css('-ms-animation',"animatedIntro "+speed).css("-o-animation", "animatedIntro "+speed).css("animation","animatedIntro "+speed).css('opacity',1);
						});
					}
					//finito
					$('.samples .holder').addClass('shown')
				}
			}
			
			
			//Hide comments
			var comments = $('.articles-container');
			var commentsCont = $('#content-wrapper').position();
			
			if ($(document).scrollTop() + $(window).height() >= commentsCont.top) { 
				$('.articles-container').css('display','block');
			} else {
				$('.articles-container').css('display','none');
			}
		
		});
	}
	
	//can I see the real pixels?
	$('.screenshots img').click(function () {
		var imgsrc = $(this).attr('src');
		var file = imgsrc.split('/');
		var filename = file[file.length - 1];
		var path = imgsrc.split('/' + filename);
		path = path[0];
		showLargeImage(filename, path + '-large/', $(this), 'next');
	});
	
	
	$(document).keydown(function (e) {
		if (e.keyCode == 37) {
			$('.largeScreenshots .prev').click();
			return false;
		}
		if (e.keyCode == 39) {
			$('.largeScreenshots .next').click();
			return false;
		}
		if (e.keyCode == 38) {
			$('.largeScreenshots').clearQueue().animate({ scrollTop: $('.largeScreenshots').scrollTop() - 500 + "px"}, 250);
			return false;
		}
		if (e.keyCode == 40) {
			$('.largeScreenshots').clearQueue().animate({ scrollTop: $('.largeScreenshots').scrollTop() + 500 + "px"}, 250);
			return false;
		}
		if (e.keyCode == 27) {
			$('.close').click();
			return false;
		}
	});
	
	function showLargeImage(file, prefix, obj, direction) {
	
		//dark screen, add elements
		if (!$('body').hasClass('largescreenshotsopened')) {
			$('#upper-menu-container').addClass('hide');
			$('body').addClass('noscroll').addClass('largescreenshotsopened').append('<div class="largeScreenshots"><div class="picHolder"><h1></h1><span></span><div class="imgHolder"><img/></div></div><div class="prev"></div><div class="next"></div><div class="close"></div><a class="pin" href="">Pin it</a></div>');
			$('.largeScreenshots .close, .largeScreenshots span').click(function () {
				$('body').removeClass('noscroll').removeClass('largescreenshotsopened');
				$('.largeScreenshots').remove();
			});
		}
	
		//show me the image
		$('.largeScreenshots .imgHolder img').attr('src', prefix + file);
		$('.largeScreenshots .imgHolder img').ready(function (e) {
			$('.largeScreenshots').scrollTop(0);
			$('.largeScreenshots .imgHolder img');
			$('.largeScreenshots h1').text(obj.attr('alt'));
	
			var shareurl = encodeURIComponent('http://mobilitas.se');
			var pic = prefix + file;
			var phrase = encodeURIComponent("Mobilitas is an Advisory & Management Consulting firm specialized in enterprise mobility. View: " + shareurl);
	
			$('.pin').attr('href', 'javascript:oiw(\'http://pinterest.com/pin/create/button/?url=' + shareurl + '&media=' + pic + '&description=' + phrase + '\',\'\',630,360);');
	
			var speed = '0.75s cubic-bezier(.27,1.64,.32,.95)';
			$('.picHolder, .picHolder h1').css('-webkit-animation', direction + " " + speed).css('-moz-animation', direction + " " + speed).css('-ms-animation', direction + " " + speed).css("-o-animation", direction + " " + speed).css("animation", direction + " " + speed);
			setTimeout(function () {
				$('.picHolder, .picHolder h1').removeAttr('style');
			}, 750);
		});
		
		//set nice position for arrows
		function setNicePosition(){
			var p = $(".largeScreenshots .picHolder");
			var position = p.position();
			var size = $('.largeScreenshots img').outerHeight();
			var scrolltop = $(".largeScreenshots").scrollTop()
			if ($(window).height()-scrolltop > size+192+36) {
				var posFromBottom = (scrolltop + $(window).height()) - (size+192+36);
				$('.largeScreenshots .prev, .largeScreenshots .next').css('top', position.top+192).css('height', size+36);
			} else if (position.top+192> 0) {
				$('.largeScreenshots .prev, .largeScreenshots .next').css('top', position.top+192).css('height', $(window).height() - position.top  - 192);	
			} else if (scrolltop + $(window).height() > size+192+36) {
				var posFromBottom = (scrolltop + $(window).height()) - (size+192+36);
				$('.largeScreenshots .prev, .largeScreenshots .next').css('top', 0).css('height', $(window).height()-posFromBottom);
			} else {
				$('.largeScreenshots .prev, .largeScreenshots .next').css('top', 0).css('height', $(window).height());
			}
		}
		setNicePosition()
			
		$('.largeScreenshots').scroll(function () {
			setNicePosition();
		});
	
		//preload pics
		var newObj = obj.parent().nextOrFirst('.screenshots .screen').find('img');
		var imgsrc = newObj.attr('src');
		var file = imgsrc.split('/');
		var filename = file[file.length - 1];
		var path = imgsrc.split('/' + filename);
		path = path[0];
		$([path + '-large/' + filename]).preload();
		
		var newObj = obj.parent().prevOrLast('.screenshots .screen').find('img');
		var imgsrc = newObj.attr('src');
		var file = imgsrc.split('/');
		var filename = file[file.length - 1];
		var path = imgsrc.split('/' + filename);
		path = path[0];
		$([path + '-large/' + filename]).preload();
	
		//get next picure and show next
		$('.largeScreenshots .prev,.largeScreenshots .next, .largeScreenshots .imgHolder img').unbind();
		setTimeout(function () {
			$('.largeScreenshots .prev').click(function () {
				var newObj = obj.parent().prevOrLast('.screenshots .screen').find('img');
				var imgsrc = newObj.attr('src');
				var file = imgsrc.split('/');
				var filename = file[file.length - 1];
				var path = imgsrc.split('/' + filename);
				path = path[0];
		
				showLargeImage(filename, path + '-large/', newObj, "prev");
			});
		
			$('.largeScreenshots .next, .largeScreenshots .imgHolder img').click(function () {
		
				var newObj = obj.parent().nextOrFirst('.screenshots .screen').find('img');
				var imgsrc = newObj.attr('src');
				var file = imgsrc.split('/');
				var filename = file[file.length - 1];
				var path = imgsrc.split('/' + filename);
				path = path[0];
				
				showLargeImage(filename, path + '-large/', newObj, "next");
			});
		},750);
		
		//add swipe gesture for mobile
		if (window.isMobile){
			$('.largeScreenshots .imgHolder img').touchwipe({
				 wipeLeft: function() { $('.largeScreenshots .next').click(); },
				 wipeRight: function(){ $('.largeScreenshots .prev').click(); },
				 min_move_x: 20,
				 min_move_y: 20,
				 preventDefaultEvents: false
			});
		}
	}

    //last slider
	var lastSliderWr = $('#lastBlock-wrapper');
	if (lastSliderWr.length > 0) {
		var lastSlider = $('#lastSlider', lastSliderWr).bxSlider({
			'controls': false,
			'pagerCustom': '#lastBlock-wrapper #lastBlockCtrl',
			'easing': 'ease-in-out',
			'adaptiveHeight': false,
			'infiniteLoop': true
		});
	}

    //galleryMode
	setInterval(function() {
        $('.moreThanImage .bg div.visible').removeClass('visible').nextOrFirst('div').addClass('visible');
        $('.showcase .bg div.visible').removeClass('visible').nextOrFirst('div').addClass('visible');
    }, 5000);

    //last slider
	$('#subMenuCtrl li').click(function() {
		var menuIndex = $('#subMenuCtrl li').index(this);
		$('#subMenuCtrl li span.selected').removeClass('selected');
		$('#subMenuCtrl li:eq(' + menuIndex + ') span').addClass('selected');
	
		$('#subMenu li.active').removeClass('active');
		$('#subMenu li:eq(' + menuIndex + ')').addClass('active');
	});
	
	$('#lastBlockCtrl .menuicon').hover(function() {
		$('#lastBlockCtrl').addClass('showmenu');
	});
	
	$('#lastBlockCtrl').mouseleave(function() {
		$('#lastBlockCtrl').removeClass('showmenu');
	});

    //sharre
    $('.social .holder').sharrre({
		share: {
			googlePlus: true,
			facebook: true,
			twitter: true
		},
		buttons: {
			twitter: {
				custom: 'Startup Design Framework - http://designmodo.com/startup/ Suit Up your Startup!',
				via: 'Designmodo',
				url: false
            }
		},
		template: '<div class="container"><div class="soc-item google"><a href=""><span class="name">Google +</span><span class="count">1,600</span></a></div>' +
                '<div class="soc-item-holder"><div class="soc-item twitter"><a href=""><span class="name">Twitter</span> <span class="count">1,600</span></a></div>' +
                '<div class="soc-item facebook"><a href=""><span class="name">Facebook</span> <span class="count">1,600</span></a></div></div></div>',
		urlCurl: 'http://dribbbleboard.com/js/sharrre.php',
		enableHover: false,
		className: '',
		render: function(api, options) {
			$(api.element).on('click', '.twitter', function() {
				api.openPopup('twitter');
			});
			$(api.element).on('click', '.facebook', function() {
				api.openPopup('facebook');
			});
			$(api.element).on('click', '.google', function() {
				api.openPopup('googlePlus');
			});
			$('.social .google .count').text(options.count.googlePlus);
			$('.social .twitter .count').text(options.count.twitter);
			$('.social .facebook .count').text(options.count.facebook);
			var summ = options.count.googlePlus + options.count.twitter + options.count.facebook;
			console.log("Shares summary: "+summ);
        }
    });

	//input-label fix
	$('.input-label').click(function(){
		$(this).parent().find('input').focus();
	});
});


/***** FUNCTIONS *****/
// mobile?
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { window.isMobile = true; } else { window.isMobile = false; }

//preload images
$.fn.preload=function(){this.each(function(){$("<img/>")[0].src=this})}	

//nextOrFirst? prevOrLast?
jQuery.fn.nextOrFirst = function(selector) { var next = this.next(selector); return (next.length) ? next : this.prevAll(selector).last(); }
jQuery.fn.prevOrLast = function(selector){ var prev = this.prev(selector); return (prev.length) ? prev : this.nextAll(selector).last(); }

//round
function roundNum(num) { num = Math.round(num * 50) / 50; return num; }

//new window
function oiw(theURL,winName,w,h,scrollbars){LeftPosition=(screen.width)?(screen.width-w)/2:100;TopPosition=(screen.height)?(screen.height-h)/2:100;settings='width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scrollbars+',location=no,directories=no,status=0,menubar=no,toolbar=no,resizable=no';URL=theURL;window.open(URL,winName,settings);}

//add some smooth for scroll
$(function() { $('a[href*=#]:not([href=#])').click(function() { if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) { var target = $(this.hash); target = target.length ? target : $('[name=' + this.hash.slice(1) +']'); if (target.length) { $('html,body').animate({ scrollTop: target.offset().top }, 1000, function(){$('#upper-menu-container').addClass('hide');});  return false; } } }); });
	
//swipe
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft();e.preventDefault()}else{config.wipeRight();e.preventDefault()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);