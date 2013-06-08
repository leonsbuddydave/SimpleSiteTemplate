var PageManager = function(container, pages, titles)
{
	// CONSTANTS
	this.regexpFilename = /[\w-]+(?=\.)/g;
	// END CONSTANTS

	// Initialize everything
	this.container = container;
	this.pages = pages;
	this.titles = titles;
	this.pageSlider = $("<div></div>")
						.css({
							width : "100%",
							height : "100%",
							position : "absolute"
						})
						.appendTo(container);

	this.titlePrefix = "";

	// this will keep a reference to all our page frames
	// we may not need this but that way we have it
	this.frames = [];

	// Get the width here to avoid recalculation
	var pageSliderWidth = this.pageSlider.width();

	// Attach all our pages to the container as iframes
	for (var p = 0; p < pages.length; p++)
	{
		// Create our frame and add it to the container
		var pageFrame = 
			$("<iframe src='" + pages[p] + "'></iframe>")
				.css({
					left : (p * pageSliderWidth),
					width : pageSliderWidth
				})
				.appendTo(this.pageSlider);

		// Save it for us. My precious.
		this.frames.push( pageFrame );
	}

	// Make sure that this whole thing can adjust, since we can't
	// rely on CSS to do this right in this case
	this.bindToContext(window, "resize", this.Resize, this);
}

PageManager.prototype.GetPageIndexByName = function(name)
{
	for (var p = 0; p < this.pages.length; p++)
	{
		var pageName = (this.pages[p].match(this.regexpFilename) || [""])[0];
		if (pageName === name)
			return p;
	}

	return 0;
}

PageManager.prototype.GetFrameTitle = function(index)
{
	if (typeof index === "string")
		index = this.GetPageIndexByName(index);

	return this.frames[index].contents().find("title").html();
}

PageManager.prototype.SetPageTitle = function(newTitle)
{
	$(document).find("title").html(this.titlePrefix + " - " + newTitle);
}

PageManager.prototype.SetTitlePrefix = function(prefix)
{
	this.titlePrefix = prefix;
}

PageManager.prototype.GoToPage = function(pageName)
{
	var index = this.GetPageIndexByName(pageName);
	var pos = -index * this.pageSlider.width();

	this.SetPageTitle( this.GetFrameTitle(index) );

	this.pageSlider.animate({
		left : pos
	},
	{

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