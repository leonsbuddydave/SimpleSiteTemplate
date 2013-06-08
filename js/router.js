var Router = function()
{
	this.routes = [];
	this.bindings = {};

	this.bindToContext(window, "hashchange", this.Route, this);
	this.bindToContext(window, "ready", this.Route, this);
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

	if (typeof this.bindings[hash] !== "undefined")
		this.bindings[hash]();
}