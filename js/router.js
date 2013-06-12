var Router = function(homePage)
{
	this.routes = [];
	this.bindings = {};

	this.bindToContext(window, "hashchange", this.Route, this);
	this.bindToContext(window, "ready", this.Route, this);

	this.homePage = homePage;

	this.bindToContext(window, "ready", this.Ready, this);
}

Router.prototype = new HelperObject();

Router.prototype.Ready = function(e)
{
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
	else
		this.bindings[this.homePage]();
}