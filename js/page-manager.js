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

	this.currentPageIndex = 0;

	// this will keep a reference to all our page frames
	// we may not need this but that way we have it
	this.frames = [];

	// Make the slider contain all things
	this.pageSlider.css("width", (this.pages.length * 100) + "%");

	// Get the width here to avoid recalculation
	var pageSliderWidth = this.pageSlider.width();

	// Attach all our pages to the container as iframes
	for (var p = 0; p < pages.length; p++)
	{
		var contentContainer = $("<div class='contentContainer'></div>")
									.css("width", (100 / this.pages.length) + "%")
									.appendTo(this.pageSlider);

		// Create our frame and add it to the container
		var pageFrame = 
			$("<iframe src='" + pages[p] + "?" + Math.random() + "'></iframe>")
				.css({
					opacity : 0
				})
				.appendTo(contentContainer);

		this.bindToContext(pageFrame, "load", this.FadeInFrame, this);

		// Save it for us. My precious.
		this.frames.push( pageFrame );
	}

	// Make sure that this whole thing can adjust, since we can't
	// rely on CSS to do this right in this case
	this.bindToContext(window, "resize", this.Resize, this);
	this.Resize();
}

PageManager.prototype = new HelperObject();

// Fades in a given frame onload
PageManager.prototype.FadeInFrame = function(e)
{
	$(e.originalEvent.target).animate({ opacity : 1.0 }, 1000);
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
	console.log("Setting New Title: " + newTitle);
	$(document).find("title").html(this.titlePrefix + " - " + newTitle);
}

PageManager.prototype.SetTitlePrefix = function(prefix)
{
	this.titlePrefix = prefix;
}

PageManager.prototype.GoToPage = function(pageName)
{
	// Get some shit
	var index = this.GetPageIndexByName(pageName);
	var pos = (-index * 100) + "%";

	// // we're ALREADY THERE, IDIOT
	// if (index === this.currentPageIndex)
	// 	return;

	this.currentPageIndex = index;

	// Change the actual page
	this.SetPageTitle( this.GetFrameTitle(index) );
	this.pageSlider.animate({
		left : pos
	});

	// Change the height of the current container to match
	// the height of the iframe
	var containerHeight = this.frames[index].contents().height();

	// Animate the containing element to the right height
	this.container.animate({
		height: containerHeight
	});

	// Animate the contained frame to the right height
	this.frames[index].animate(
	{
		height: containerHeight
	});

	// Trigger the event, letting errbody know what's up
	$.event.trigger({
		type : "pageChange",
		pageHeight : containerHeight,
		pageY : this.container.position().top,
		el : this.container
	});
}

PageManager.prototype.Resize = function()
{
	this.container.css({
		"height" : $(window).height()
	});

	// the height of the iframe
	var containerHeight = this.frames[this.currentPageIndex].contents().height();

	$.event.trigger({
		type : "pageChange",
		pageHeight : containerHeight,
		pageY : this.container.position().top,
		el : this.container
	});
}