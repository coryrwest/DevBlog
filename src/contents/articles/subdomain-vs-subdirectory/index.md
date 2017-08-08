---
title: Nginx Subdomains or Subdirectories?
author: cory
date: 2017-08-08 15:00
template: article.jade
---

After some introspection I realized that I was spending way too much of my time fighting with my various apps to get them to work under subdirectories. After switching to subdomains, I can say that it is much less stress and complication and only wish I had done it sooner.

<span class="more"></span>

What's the difference?
-----------------------

Subdirectories are just folders on the webserver under the root. http://domain.com/mysubdir as an example. A subdomain is a prefix that you put on your domain, like http://sub.domain.com. When I first started building my home server I thought that subdirectories would be easier, mainly because the SSL cert would be easier to set up. I was very wrong. Some of the apps that I wanted to run do not work well, or at all, under a subdirectory (I'm looking at you Wallabag).

The switch
----------

The switch to subdomains was relativly easy. I had to set a new DNS record on my domain to route the subdomains to my home server, not just the root domain. I also had to expand my SSL cert from Let's Encrypt to include my subdomains. That was the most annoying part because, at the time of writing, Let's Encrypt doesn't support wildcard certs. I had to sepcify each subdomain that I wanted on the cert. Not a big deal, just a pain in the ass.

Moving the apps to use subdomains was surprisingly easy, as most apps are initially configured to work on a root domain. The only exception so far has been gitlab, which defaults to run under a /git subdirectory.

I am not sure why I hadn't thought of this earlier, but I'm really kicking myself after the ease of this switch. I feel like it gives me better organization of my apps as well.