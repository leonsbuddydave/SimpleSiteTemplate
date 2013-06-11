var Router = function(homePage, homePageCallback)
{
	this.routes = [];
	this.bindings = {};

	this.bindToContext(window, "hashchange", this.Route, this);
	this.bindToContext(window, "ready", this.Route, this);

	// optional arguments allow us to bind a homepage right away
	// that we can jump to when everything finishes loading
	if (homePage && homePageCallback && !this.HasHash())
	{
		this.On("", homePageCallback);
		this.On(homePage, homePageCallback);
	}

	this.bindToContext(window, "pagesReady", this.Ready, this);
}

Router.prototype = new HelperObject();

Router.prototype.Ready = function(e)
{
	console.log("yo NIGGA");

	this.Route();
}

Router.prototype.HasHash = function()
{
	return location.hash === "";
}

Router.prototype.AddPath = function(hash)
{
	this.routes.push(hash);
}

Router.prototype.On = function(hash, callback)
{
	this.bindings[hash] = callback;
}

Router.prototype.Route = function(e)
{
	var hash = location.hash.substr(1);

	// if we have a binding for that hash, fire it
	if (typeof this.bindings[hash] !== "undefined")
		this.bindings[hash]();
}