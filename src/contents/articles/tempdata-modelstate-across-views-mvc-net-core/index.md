---
title: Passing ModelState across Views using TempData in ASP.NET Core 2.0
author: cory
date: 2018-01-01 15:00
template: article.jade
---

So I recently found myself working on a .NET Core 2.0 MVC app and needs to pass ModelState between Views. There are several tutorials on the 
internet on how to do this, but all of them are either out of date for .NET Core 2.0, or don't do exactly what I want. So here's how to do it.

<span class="more"></span>

I needed an easy way to pass ModelState back to a View that contained the form for saving an object. I also wanted to implement the 
[PRG (Post-Redirect-Get) pattern](https://www.exceptionnotfound.net/the-post-redirect-get-pattern-in-asp-net-mvc/) eventually. 
The tutorials in question were each missing one little piece to get this to work.

Set Up
------

Add this to the csproj of your .NET Core 2.0 project.

```
<PackageReference Include="Microsoft.AspNetCore.Session" Version="2.0.0" />
```

Add this to the Startup.cs ConfigureServices method. From [here](https://stackoverflow.com/questions/30432766/aspnet-vnext-actionfilter-and-tempdata#30448681)

```
services.AddMvc().AddSessionStateTempDataProvider();
services.AddMemoryCache();
services.AddSession();
```

Add this to the Startup.cs Configure method. From [here](https://stackoverflow.com/questions/30432766/aspnet-vnext-actionfilter-and-tempdata#30448681) and [here](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/app-state?tabs=aspnetcore2x#tempdata)
```
app.UseSession();
```

And finally the last piece of the puzzle, the Attributes. This was the piece that was almost complete in all the tutorials that I found. 
From [here](https://stackoverflow.com/questions/4642845/asp-net-mvc-how-to-preserve-modelstate-errors-across-redirecttoaction)
```
public class SetTempDataModelStateAttribute : ActionFilterAttribute {
    public override void OnActionExecuted(ActionExecutedContext filterContext) {
        base.OnActionExecuted(filterContext);
        var controller = filterContext.Controller as Controller;
        controller.TempData["ModelState"] = controller.ViewData.ModelState;
    }
}

public class RestoreModelStateFromTempDataAttribute : ActionFilterAttribute {
    public override void OnActionExecuting(ActionExecutingContext filterContext) {
        base.OnActionExecuting(filterContext);
        var controller = filterContext.Controller as Controller;
        if (controller.TempData.ContainsKey("ModelState")) {
            controller.ViewData.ModelState.Merge(
                (ModelStateDictionary)controller.TempData["ModelState"]);
        }
    }
}
```

Usage:
```
[RestoreModelStateFromTempData]
public async Task<IActionResult> Dashboard() {
    // Errors from the Save action will show up on this page.
    return View(model);
}


[SetTempDataModelState]
public async Task<IActionResult> Save(Guid id) {
    ModelState.AddModelError("", "This is an error.");

    return RedirectToAction(nameof(Dashboard));
}
```

Enjoy!