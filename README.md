# Responsive-Images
Resizes Images based on Browser width

##How to Use##
Include the plugin from source.js into your project.  
Then add the following to your project  
```
jQuery(document).ready(function($){
	$(this).responsiveImages();
});
```

OR 

```
jQuery(document).ready(function($){
	$(this).responsiveImages({
		small: 640,
		medium: 1024,
		large: 1440,
	});
});
```


On an Image (Recommended to declare the smallest as your src)    
```<img src="1-small.jpg" data-rimg-small="1-small.jpg" data-rimg-medium="1-med.jpg" data-rimg-large="1-lrg.jpg" data-rimg-full="1-full.jpg" alt="" />```

Background Image (Defaults to large on Full Size)  
```<div src="1.jpg" data-rimg-small="1-small.jpg" data-rimg-medium="1-med.jpg" data-rimg-large="1-lrg.jpg">  
</div>```
