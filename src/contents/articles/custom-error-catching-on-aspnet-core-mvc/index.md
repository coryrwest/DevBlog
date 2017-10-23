---
title: Custom error catching on ASP.NET Core 2.0 MVC
author: cory
date: 2017-10-23 15:00
template: article.jade
---

So I was recently working on an ASP.NET Core 2.0 MVC application and had the need to send 
errors that are unhandled elsewhere out to an external service (Sentry in this case). While 
that doesn't seem too difficult on the surface I had to find a way to get the configuration 
data needed in order to send said data to the external service. Since ASP.NET Core uses 
dependency injection to handle config data and there is very little to no documentation yet 
on any of this, it turned out to be harder than I expected.

<span class="more"></span>

Use Case
-----------------------

I have forgotten all of the different avenues that I tried before finding the right one, but in the 
end I learned alot about the internals of ASP.NET Core MVC. The solution I found works really well for 
my use case, but there are other easier ways to capture errors. In my case I needed to capture all 
errors that may happen that are not handled by other code. So even though I have error handling code 
all over the place, there are always cases that I forget, or don't even think about. I wanted to be 
able to capture these errors because these are the ones I did not or could not prepare for and 
potentially have the most negative side effects.


The Solution
---------------------

I ended up creating an `ExceptionFilterAttribute` and registering it in the `Startup.cs`. Building the 
attribute and getting the settings from there were the hardest part. I had to make my way through the 
API blind until I found what I wanted. There was a lot of debugging and de-compiling to figure out 
what was going on. I could not find any documentation on this that described what I wanted to do so 
that made it all harder.

The Code
---------------------
The ExceptionFilterAttribute
```
public class ExceptionCatcher : ExceptionFilterAttribute {
    public override void OnException(ExceptionContext context) {
        var ex = context.Exception;

        var features = context.HttpContext.Features;
        var service = features[typeof(IServiceProvidersFeature)] as RequestServicesFeature;
        var settingsManager = service?.RequestServices.GetService(typeof(IOptions<OtherSettings>));
        var settings = (settingsManager as OptionsManager<OtherSettings>)?.Value;
        if (settings != null) {
            // Now I have my settings and can send the exception to my external service.
        }

        base.OnException(context);
    }
}
```

In Startup.cs
```
public void ConfigureServices(IServiceCollection services)
{
    ...

    services.AddScoped<ExceptionCatcher>();
    
    ...
}
```

On the controllers
```
[ServiceFilter(typeof(ExceptionCatcher))]
public class HomeController : Controller {
    ...
}
```