/**
 * Responsive Images
 * Version: 1.0.0
 * Author: Gravitate
 * License: http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery
 */
(function ($) {

    $.fn.responsiveImages = function( options )
    {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            small: 640,
            medium: 1024,
            large: 1440,
            throttle: 100,
        }, options );

        var resizeTimer;

        function runResponsiveImages()
        {
        	var w = $(window).width();
        	var i, sizes = [{size: settings.small, name: 'small'}, {size: settings.medium, name: 'medium'}, {size: settings.large, name: 'large'}, {size: 99999, name: 'full'}];

	        $('[data-rimg-small], [data-rimg-medium], [data-rimg-large]').each(function(index)
	        {
	        	var elem = $(this);

        		for(i in sizes)
	        	{
	        		/* Check the width of the browser and see if it matches a given size */
	        		if(w > 0 && w < sizes[i].size)
	        		{
	        			/* Loop through Size and any smaller sizes in case the large size does not exist */
	        			for (var n = i; n >= 0; n--)
	        			{
	        				/* Check if Element has data setting for a given size */
	        				if(elem.attr('data-rimg-'+sizes[n].name))
		        			{
		        				/* If IMG a tag */
		        				if(elem.prop("tagName") === 'IMG')
		        				{
		        					if(elem.attr('src') != elem.attr('data-rimg-'+sizes[n].name))
			        				{
			        					elem.attr('src', elem.attr('data-rimg-'+sizes[n].name));
			        				}
		        				}
		        				/* If NOT IMG Tag */
		        				else
		        				{
			        				if(elem.css('background-image') != elem.attr('data-rimg-'+sizes[n].name))
				        			{
				        				elem.css('background-image', "url('"+elem.attr('data-rimg-'+sizes[n].name)+"')");
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

        /* Initialize */
        runResponsiveImages();

    };
    
}( jQuery ));
