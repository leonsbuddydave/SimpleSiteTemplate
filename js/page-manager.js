var PageManager = function(container, pages)
{
	// Initialize everything
	this.container = container;
	this.pages = pages;
	this.pageSlider = $("<div></div>")
						.css({
							width : "100%",
							height : "100%"
						})
						.appendTo(container);

	// this will keep a reference to all our page frames
	// we may not need this but that way we have it
	this.frames = [];

	// Attach all our pages to the container as iframes
	for (var p = 0; p < pages.length; p++)
	{
		var pageSliderWidth = this.pageSlider.width();

		// Create our frame and add it to the container
		var pageFrame = 
			$("<iframe src='" + pages[p] + "'></iframe>")
				.css({
					border : "none",
					position : "absolute",
					top : 0,
					left : (p * pageSliderWidth),
					height : "100%",
					width : pageSliderWidth
				})
				.appendTo(this.pageSlider);

		// Save it for us. My precious.
		this.frames.push( pageFrame );
	}

	// Make sure that this whole thing can adjust, since we can't
	// rely on CSS to do this right in this case
	this.BindToMe("resize", this.Resize, this);
}

PageManager.prototype.BindToMe = function(event, callback, context)
{
	$(window).bind(event, function(e)
	{
		callback.call(context);
	});
}

PageManager.prototype.Resize = function()
{
	// Get the width here to avoid recalculation
	var pageSliderWidth = this.pageSlider.width();

	for (var p = 0; p < this.frames.length; p++)
	{
		// Resize and reposition our frames
		this.frames[p]
			.css({
				"width" : pageSliderWidth,
				"left" : p * pageSliderWidth
			});
	}
}