/**
 * Responsive Images
 * Version: 3.0.0
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
            throttle: 100,
            downscale: false,
            onload: true,
            lazyload: true,
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
            viewPos = 0,
	        viewTop = 0,
	        viewHeight = 0,
            done_loading = false,
            lastScrollTop = -1;

        function runResponsiveImages()
        {
        	var windowWidth = $(window).width();
        	var i;

	        $('[data-rimg-small], [data-rimg-medium], [data-rimg-large]').each(function(index)
	        {
	        	var elem = $(this);

	        	var elemWidth = elem.outerWidth();

	        	var w = (elemWidth > 0 ? elemWidth : windowWidth);

	        	var do_load = true;

	        	var fade = false;

	        	var img_src = elem.attr('src');
	        	var bg_src = elem.css('background-image');

	        	if(settings.lazyload && !done_loading)
	        	{
	        		viewPos = viewTop + viewHeight;
	        		var elemPos = parseFloat(elem.offset().top);

				    if((elemPos-100) > viewPos)
	        		{
	        			do_load = false;
	        			if((!img_src || img_src.indexOf('data:') > -1) && (!bg_src || bg_src == 'none' || bg_src.indexOf('data:') > -1))
		        		{
		        			elem.css({opacity: 0, transition: 'opacity .5s ease-in-out'});
		        		}
	        		}

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
		        				/* Check if Element has data setting for a given size */
		        				if(elem.attr('data-rimg-'+settings.sizes[n].name))
			        			{
			        				/* If IMG a tag */
			        				if(elem.prop("tagName") === 'IMG')
			        				{
			        					if((!img_src || img_src.indexOf('data:') > -1) && settings.lazyload)
			        					{
			        						fade = true;
			        					}

			        					if(elem.attr('src') != elem.attr('data-rimg-'+settings.sizes[n].name))
				        				{
				        					elem.attr('src', elem.attr('data-rimg-'+settings.sizes[n].name));
				        				}

				        				if(fade)
				        				{
				        					elem.css('opacity', '1');
				        				}
			        				}
			        				/* If NOT IMG Tag */
			        				else
			        				{
			        					if((!elem.css('background-image') || elem.css('background-image') == 'none' || elem.css('background-image').indexOf('data:') > -1) && settings.lazyload)
			        					{
			        						fade = true;
			        					}

				        				if(elem.css('background-image') != elem.attr('data-rimg-'+settings.sizes[n].name))
					        			{
					        				elem.css('background-image', "url('"+elem.attr('data-rimg-'+settings.sizes[n].name)+"')");
					        			}

					        			if(fade)
				        				{
				        					elem.css('opacity', '1');
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

        /* On Browser Resize */
        $(window).on('resize', function()
        {
        	if(settings.lazyload)
	    	{
	    		viewTop = $(window).scrollTop();
	        	viewHeight = $(window).height();
	    	}

        	if(settings.throttle)
        	{
        		/* Trottle the Resize Event so it doesn't lag the browser */
		    	clearTimeout(resizeTimer);
		    	resizeTimer = setTimeout(runResponsiveImages, settings.throttle);
		    	return;
		    }

		    /* Run if Throttle is set to 0 */
		    runResponsiveImages();

        });

        if(settings.lazyload)
	    {
	    	viewTop = $(window).scrollTop();
	        viewHeight = $(window).height();

	        /* On Browser Resize */
	        $(window).on('scroll', function()
	        {
	        	viewTop = $(window).scrollTop();


	        	if(!done_loading && viewTop > lastScrollTop)
	        	{
	        		lastScrollTop = viewTop;

	        		if(viewTop + viewHeight >= $(document).height())
	        		{
				       done_loading = true;
				    }

		        	if(settings.throttle)
		        	{
		        		/* Trottle the Resize Event so it doesn't lag the browser */
				    	clearTimeout(scrollTimer);
				    	scrollTimer = setTimeout(runResponsiveImages, 10);
				    	return;
				    }

				    /* Run if Throttle is set to 0 */
				    runResponsiveImages();
				}

	        });
	    }

        if(settings.onload)
        {
	        /* Initialize */
	        runResponsiveImages();
	    }

    };

}( jQuery ));
