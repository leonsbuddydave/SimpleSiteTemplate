var DynamicFooter = function(el, reference, scale)
{
	// El is the footer element, the thing
	// we're supposed to be watching
	this.el = el;

	// Reference is the reference element,
	// that we're supposed to stay below
	this.reference = reference;

	// MinimumY prevents this damn thing from moving
	// all the way up the page
	this.minimumY = 0;

	// We need to retain this because fuck it
	// because fuck it all
	this.scale = scale;

	// Makes sure this thing is listening when the page changes over
	this.bindToContext(window, "pageChange", this.EvaluatePosition, this);
}

DynamicFooter.prototype = new HelperObject();

DynamicFooter.prototype.EvaluatePosition = function(e)
{
	var pos = e.pageHeight + e.pageY - this.el.outerHeight();
	this.RecalculateMinimumY();

	if (pos < this.minimumY)
	 	pos = this.minimumY;

	this.MoveToY(pos);
}

DynamicFooter.prototype.RecalculateMinimumY = function()
{
	this.minimumY = $(window).height() - this.el.outerHeight();	
}

DynamicFooter.prototype.MoveToY = function(y)
{
	this.el.css("top", this.el.position().top);

	this.el.clearQueue().animate({
		"top" : y
	},
	{
		duration : 500
	});
}