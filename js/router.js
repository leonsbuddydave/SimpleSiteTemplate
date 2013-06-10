var Router = function(homePage, homePageCallback)
{
	this.routes = [];
	this.bindings = {};

	this.bindToContext(window, "hashchange", this.Route, this);
	this.bindToContext(window, "ready", this.Route, this);


	// optional arguments allow us to bind a homepage right away
	// that we can jump to when everything finishes loading
	if (homePage && homePageCallback)
	{
		this.On("", homePageCallback);
		this.On(homePage, homePageCallback);
	}
}

Router.prototype = new HelperObject();

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

	if (typeof this.bindings[hash] !== "undefined")
		this.bindings[hash]();
}