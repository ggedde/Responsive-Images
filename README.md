# Responsive-Images
Resizes Images based on Browser width

== How to Use ==
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


On an Image  
<img src="1.jpg" data-rimg-small="1-small.jpg" data-rimg-medium="1-med.jpg" data-rimg-large="1.lrg.jpg" alt="" />

Background Image  
<div src="1.jpg" data-rimg-small="1-small.jpg" data-rimg-medium="1-med.jpg" data-rimg-large="1.lrg.jpg">  
</div>
