# Responsive-Images
Resizes Images based on Browser width

##How to Use##
Include the plugin from source.min.js into your project.  
* Requires jQuery

Then add the following to your project  
```
jQuery(document).ready(function($){
	$(this).responsiveImages();
});
```

With Options  (below are the Defaults)

```
jQuery(document).ready(function($){
	$(this).responsiveImages({
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
	});
});
```

On an Image (Recommended to declare the smallest as your src)    
```  
<img src="1-small.jpg"   
data-rimg-small="1-small.jpg"   
data-rimg-medium="1-med.jpg"   
data-rimg-large="1-lrg.jpg"   
data-rimg-full="1-full.jpg"   
alt="" />
```

Background Image (If no full size is declared it will default to the closest size)    
```
<div   
data-rimg-small="1-small.jpg"   
data-rimg-medium="1-med.jpg"   
data-rimg-large="1-lrg.jpg">   
</div>
```

##Throttling Browser Resize##
By default the resize throttling is set to 100 milliseconds. This reduces the lag when resizing the browser.
However, if you want the images to load much faster on resize then you can set this to 0 to turn off throttling or adjust it to a smaller number.  

##Downscaling##
This will use the lower resolution image size instead of the higher resolution image size. Similar to floor() instead of ceil()
