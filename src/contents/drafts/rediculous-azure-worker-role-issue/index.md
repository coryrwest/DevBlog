---
title: Rediculous Azure Worker Role Issues
author: cory
date: 2017-02-01 15:00
template: article.jade
---

I've been working with Azure Worker Roles pretty heavily at work recently. I have the feeling that Worker Roles are not 
quite first class citizens in Azure-town. One of the issues that I had that took way longer than I care to admit to resolve 
is using .NET Standard or .NET Core compatible libraries in the Worker Role project.

<span class="more"></span>

The Issue
---------

We were trying to use Event Hub in the Worker Role, which doesn't have libraries for .NET that aren't in Pre-Release. We opted to 
use the REST API instead of the Pre-Release libraries. Using HttpClient in the Worker Role while targeting OS Family 5 
(.NET 4.6.2) in the Worker Role resulted in teh following error.

```
Could not load file or assembly 'System.Runtime, Version=4.1.1.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a' or one of its dependencies. The located assembly's manifest definition does not match the assembly reference.

```

The Solution
------------

Well the obvious problem is that the dll in the bin folder is a different version. Well, kind of. The version of the dll when 
viewing the properties is 4.6, but setting a binding redirect to target 4.6 does not solve the problem. So running 

``` ([system.reflection.assembly]::loadfile("C:\PathToDLL\System.Runtime.dll")).FullName ```

in powershell gave me a version of 4.0. 
Setting the binding redirect to 4.0 solves the problem. Fixed, right?... Nope. Next on the list is **System.Diagnotics.Tracing.** 
Same issue, same error. Checking the version in properties gives you 4.6 again, but running the powershell command gives 
you 4.1.1.0, just like the error says. Neither value works in the binding redirect. So on a hunch I set it to 4.0, which fixed 
it. Problem solved; and it only took 4 hours because of the rediculous lag between publishes to a Worker Role.

Now to get the binding redirects to stick between publishes you have to copy the RoleName.dll.config from the bin folder in the 
project and include it in the project. Then you need to set the properties on the file to **Build Action -> Content** and **Copy 
to Output Directory -> Always**. This ensures that the binding redirects make it into the working directory on the Worker Role 
and survive publishes.

Final Binding Redirects
-----------------------

The binding redirects below go in the RoleName.dll.config, not the app.config or the web.config.

```
<dependentAssembly>
    <assemblyIdentity name="System.Runtime" publicKeyToken="b03f5f7f11d50a3a" culture="neutral" />
    <bindingRedirect oldVersion="0.0.0.0-4.1.1.0" newVersion="4.0.0.0" />
</dependentAssembly>
<dependentAssembly>
    <assemblyIdentity name="System.Diagnostics.Tracing" publicKeyToken="b03f5f7f11d50a3a" culture="neutral" />
    <bindingRedirect oldVersion="0.0.0.0-4.1.1.0" newVersion="4.0.0.0" />
</dependentAssembly>
```
