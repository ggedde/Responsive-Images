/**
 * Responsive Images
 * Version: 4.1.0
 * Author: Geoff Gedde
 * License: http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery
 */
(function ($) {

    $.fn.responsiveImages = function( options )
    {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            watch: 'tag',
            throttle: 100,
            downscale: false,
            downsize: false,
            onload: true,
            lazyload: true,
            lazyload_threshold: 100,
            sizes: [
	    		{
	    			name: 'small',
	    			size: 320
	    		},
	    		{
	    			name: 'medium',
	    			size: 500
	    		},
	    		{
	    			name: 'medium_large',
	    			size: 768
	    		},
	    		{
	    			name: 'large',
	    			size: 1024
	    		},
	    		{
	    			name: 'xlarge',
	    			size: 1440
	    		},
	    		{
	    			name: 'full',
	    			size: 99999
	    		}
	    	]
        }, options );

        var resizeTimer,
            scrollTimer,
            rimgs,
            viewTop = 0,
            viewHeight = 0,
            done_scrolling = false,
            lastScrollTop = -1;

        function rImgGetView()
        {
        	viewTop = $(window).scrollTop();
	        viewHeight = $(window).height();
        }

        function rImgIsInView(elem)
        {
        	var viewPos = viewTop + viewHeight;
	        var elemPos = parseFloat(elem.offset().top);

        	return (elemPos-settings.lazyload_threshold) <= viewPos;
        }

        function rImgInit()
        {
        	rimgs = $('[data-rimg-small], [data-rimg-medium], [data-rimg-large]').addClass('rimg');

        	if(settings.lazyload)
        	{
        		rImgGetView();

        		rimgs.each(function(index)
        		{
        			var elem = $(this);

				    if(!rImgIsInView(elem))
	        		{
	        			var img_src = elem.attr('src');
	        			var bg_src = elem.css('background-image').split('url("').join('').split('")').join('');

	        			if((!img_src || img_src.indexOf('data:') > -1) && (!bg_src || bg_src == 'none' || bg_src.indexOf('data:') > -1))
		        		{
		        			elem.addClass('rimg-lazy');
		        		}
	        		}

        		});
        	}
        };

        function rImgIsBigger(src, elem, current)
        {
        	for(var i in settings.sizes)
		    {
		    	if(current < i && src === elem.attr('data-rimg-'+settings.sizes[i].name))
		    	{
		    		return true;
		    	}
		    }

		    return false;
        }

        function rImgUpdate()
        {
        	var windowWidth = $(window).width();
        	var i;

	        rimgs.each(function(index)
	        {
	        	var elem = $(this);

	        	var elemWidth = elem.outerWidth();

	        	var w = (elemWidth > 0 && settings.watch === 'tag' ? elemWidth : windowWidth);

	        	var do_load = true;


	        	var img_src = elem.attr('src');
	        	var bg_src = elem.css('background-image').split('url("').join('').split('")').join('');
	        	var new_src;

	        	if(settings.lazyload && !done_scrolling)
	        	{
				    do_load = rImgIsInView(elem);
	        	}

	        	if(do_load)
	        	{
	        		for(i in settings.sizes)
		        	{
		        		/* Check the width of the browser and see if it matches a given size */
		        		if(w > 0 && w < settings.sizes[i].size)
		        		{
		        			/* Loop through Size and any smaller sizes in case the large size does not exist */
		        			for (var n = (settings.downscale ? (i-1) : i); n >= 0; n--)
		        			{
		        				new_src = elem.attr('data-rimg-'+settings.sizes[n].name);

		        				/* Check if Element has data setting for a given size */
		        				if(new_src)
			        			{
			        				/* If IMG a tag */
			        				if(elem.prop("tagName") === 'IMG')
			        				{
			        					if(img_src != new_src && (settings.downsize || (!settings.downsize && !rImgIsBigger(img_src, elem, n))))
				        				{
				        					if(elem.hasClass('rimg-loaded'))
					        				{
					        					elem.attr('src', new_src);
					        				}
					        				else
					        				{
				        						elem.attr('src', new_src).one('load', function() {
				        							$(this).addClass('rimg-loaded');
				        						});
				        					}
				        				}
			        				}
			        				/* If NOT IMG Tag */
			        				else
			        				{
				        				if(bg_src != new_src && (settings.downsize || (!settings.downsize && !rImgIsBigger(bg_src, elem, n))))
					        			{
					        				// Preload image then add src and class to reduce flicker
					        				$('<img/>').attr('src', new_src).one('load', function() {
											   $(this).remove(); // prevent memory leaks as @benweet suggested
											   elem.css('background-image', "url('"+new_src+"')").addClass('rimg-loaded');
											});
					        			}
				        			}
			        				break;
			        			}
		        			}
		        			break;
		        		}
		        	}
		        }
	        });
	    };

	    rImgInit();

        /* On Browser Resize */
        $(window).on('resize', function()
        {
        	if(settings.lazyload)
	    	{
	    		rImgGetView();
	    	}

        	if(settings.throttle)
        	{
        		/* Trottle the Resize Event so it doesn't lag the browser */
		    	clearTimeout(resizeTimer);
		    	resizeTimer = setTimeout(rImgUpdate, settings.throttle);
		    	return;
		    }

		    /* Run if Throttle is set to 0 */
		    rImgUpdate();

        });

        if(settings.lazyload)
	    {
	    	rImgGetView();

	        /* On Browser Resize */
	        $(window).on('scroll', function()
	        {
	        	viewTop = $(window).scrollTop();

	        	if(!done_scrolling && viewTop > lastScrollTop)
	        	{
	        		lastScrollTop = viewTop;

	        		if(viewTop + viewHeight >= $(document).height())
	        		{
				       done_scrolling = true;
				    }

		        	if(settings.throttle)
		        	{
		        		/* Trottle the Resize Event so it doesn't lag the browser */
				    	clearTimeout(scrollTimer);
				    	scrollTimer = setTimeout(rImgUpdate, 10);
				    	return;
				    }

				    /* Run if Throttle is set to 0 */
				    rImgUpdate();
				}

	        });
	    }

        if(settings.onload)
        {
	        /* Initialize */
	        rImgUpdate();
	    }

    };

}( jQuery ));
