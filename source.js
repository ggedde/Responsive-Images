/**
 * Responsive Images
 * Version: 2.0.0
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

        var resizeTimer;

        function runResponsiveImages()
        {
        	var windowWidth = $(window).width();
        	var i;

	        $('[data-rimg-small], [data-rimg-medium], [data-rimg-large]').each(function(index)
	        {
	        	var elem = $(this);

	        	var elemWidth = elem.outerWidth();

	        	var w = (elemWidth > 0 ? elemWidth : windowWidth);

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
		        					if(elem.attr('src') != elem.attr('data-rimg-'+settings.sizes[n].name))
			        				{
			        					elem.attr('src', elem.attr('data-rimg-'+settings.sizes[n].name));
			        				}
		        				}
		        				/* If NOT IMG Tag */
		        				else
		        				{
			        				if(elem.css('background-image') != elem.attr('data-rimg-'+settings.sizes[n].name))
				        			{
				        				elem.css('background-image', "url('"+elem.attr('data-rimg-'+settings.sizes[n].name)+"')");
				        			}
			        			}
		        				break;
		        			}
	        			}
	        			break;
	        		}
	        	}
	        });
	    };

        /* On Browser Resize */
        $(window).on('resize', function()
        {
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

        if(settings.onload)
        {
	        /* Initialize */
	        runResponsiveImages();
	    }

    };

}( jQuery ));
