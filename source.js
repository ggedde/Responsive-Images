(function ( $ ) {

    $.fn.responsiveImages = function( options ) {
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            small: 640,
            medium: 1024,
            large: 1440
        }, options );


        function runResponsiveImages()
        {
        	var w = $(window).width();

	        $('[data-rimg-small], [data-rimg-medium], [data-rimg-large]').each(function(index){

	        	if($(this).prop("tagName") === 'IMG' && w > 0)
	        	{
	        		if(w < settings.small)
	        		{
	        			if($(this).attr('src') != $(this).attr('data-rimg-small'))
	        			{
	        				$(this).attr('src', $(this).attr('data-rimg-small'));
	        			}
	        		}
	        		else if(w < settings.medium)
	        		{
	        			if($(this).attr('src') != $(this).attr('data-rimg-medium'))
	        			{
	        				$(this).attr('src', $(this).attr('data-rimg-medium'));
	        			}
	        		}
	        		else if(w < settings.large)
	        		{
	        			if($(this).attr('src') != $(this).attr('data-rimg-large'))
	        			{
	        				$(this).attr('src', $(this).attr('data-rimg-large'));
	        			}
	        		}
	        		else if(w >= settings.large)
	        		{
	        			if($(this).attr('data-rimg-full') && $(this).attr('src') != $(this).attr('data-rimg-full'))
	        			{
	        				$(this).attr('src', $(this).attr('data-rimg-full'));
	        			}
	        			else if($(this).attr('data-rimg-large') && $(this).attr('src') != $(this).attr('data-rimg-large'))
	        			{
	        				$(this).attr('src', $(this).attr('data-rimg-large'));
	        			}
	        		}
	        	}
	        	else if(w > 0)
	        	{
	        		if(w < settings.small)
	        		{
	        			if($(this).css('background-image') != $(this).attr('data-rimg-small'))
	        			{
	        				$(this).css('background-image', "url('"+$(this).attr('data-rimg-small')+"')");
	        			}
	        		}
	        		else if(w < settings.medium)
	        		{
	        			if($(this).css('background-image') != $(this).attr('data-rimg-medium'))
	        			{
	        				$(this).css('background-image', "url('"+$(this).attr('data-rimg-medium')+"')");
	        			}
	        		}
	        		else if(w < settings.large)
	        		{
	        			if($(this).css('background-image') != $(this).attr('data-rimg-large'))
	        			{
	        				$(this).css('background-image', "url('"+$(this).attr('data-rimg-large')+"')");
	        			}
	        		}
	        		else if(w >= settings.large)
	        		{
	        			if($(this).attr('data-rimg-full') && $(this).css('background-image') != $(this).attr('data-rimg-full'))
	        			{
	        				$(this).css('background-image', "url('"+$(this).attr('data-rimg-full')+"')");
	        			}
	        			else if($(this).attr('data-rimg-large') && $(this).css('background-image') != $(this).attr('data-rimg-large'))
	        			{
	        				$(this).css('background-image', "url('"+$(this).attr('data-rimg-large')+"')");
	        			}
	        		}
	        	}
	        });
	    };

        /* On Browser Resize */
        $(window).on('resize', function(){
        	runResponsiveImages();
        });
        
        /* Initialize */
        runResponsiveImages();

    };

}( jQuery ));
