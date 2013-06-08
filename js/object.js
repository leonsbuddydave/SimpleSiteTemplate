// this is useful as shit fuck you
Object.prototype.bindToContext = function(target, event, callback, context)
{
	$(target).bind(event, function(e)
	{
		callback.call(context);
	});
}