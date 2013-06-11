var PageManager = function(container, pages, titles)
{
	// CONSTANTS
	this.regexpFilename = /[\w-]+(?=\.)/g;
	// END CONSTANTS

	// Initialize everything
	this.container = container;
	this.pages = pages;
	this.titles = titles;

	this.titlePrefix = "";

	this.currentPageIndex = 0;

	this.currentPage = null;
	this.nextPage = null;
}

PageManager.prototype = new HelperObject();

PageManager.prototype.PageReady = function(e)
{

}

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

PageManager.prototype.GetPageFromServer = function(pageURL, callback)
{
	$.ajax({
		url : pageURL,

	}).done(callback);
}

PageManager.prototype.GoToPage = function(pageName)
{
	// Get some shit
	var index = (isNaN(pageName) ? this.GetPageIndexByName(pageName) : pageName);
	var pos = (-index * 100) + "%";

	// // we're ALREADY THERE, IDIOT
	// if (index === this.currentPageIndex)
	// 	return;

	var self = this;

	this.GetPageFromServer(this.pages[index], function(data)
	{
		self.nextPage = self.AttachPage(data);

		$.event.trigger({
			type : "pageChangeStart",
			el : self.container,
			page : self.nextPage
		});

		// bring in the NEW FUCKER
		self.MovePageOneWidthLeft(self.nextPage, function()
		{
			self.currentPage = self.nextPage;

			$.event.trigger({
				type : "pageChangeComplete",
				el : self.container,
				page : self.nextPage
			});
		});

		// get rid of that OLD FUCKER
		if (self.currentPage !== null)
		{
			self.MovePageOneWidthLeft(self.currentPage, function()
			{
				this.remove();
			});
		}
	});

	// Trigger the event, letting errbody know what's up
}

PageManager.prototype.MovePageOneWidthLeft = function(page, callback)
{
	page.animate(
	{
		left : "-=100%"
	},
	{
		complete : callback
	});
}

PageManager.prototype.AttachPage = function(data)
{
	var page = $("<div class='contentContainer'><div class='contentBound'>" + data + "</div></div>").css("left", "100%");
	this.container.append(page);

	return page;
}

PageManager.prototype.Resize = function()
{
	this.container.css({
		"height" : $(window).height()
	});

	// the height of the iframe
	var containerHeight = this.frames[this.currentPageIndex].contents().height();

	console.log(containerHeight);

	$.event.trigger({
		type : "pageChange",
		pageHeight : containerHeight,
		pageY : this.container.position().top,
		el : this.container
	});
}