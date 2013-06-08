var Router = function()
{
	this.targetContainer = null;
	this.routes = {};
}

Router.prototype.Bind = function(container)
{
	this.targetContainer = container;
}

Router.prototype.AddPath = function(hash, position, options)
{
	this.routes[hash] = position;
}

Router.prototype.Route = function(e)
{
	var url = location.hash;
	console.log(url);
	this.targetContainer.animate({
		left : this.routes[url]
	},
	{

	});
}

Router.prototype.Start = function()
{
	$(window).bind("hashchange", this.Route);
	this.Route();
}