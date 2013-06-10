var HelperObject = function()
{

}

HelperObject.prototype.bindToContext = function(target, event, callback, context)
{
	$(target).bind(event, function(e)
	{
		callback.call(context, e);
	});
}