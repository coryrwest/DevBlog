---
title: Fixing the ownCloud login loop
author: cory
date: 2015-11-14 15:00
template: article.jade
---

I currently have [ownCloud](https://owncloud.org/) installed on a Raspberry Pi under my desk that acts as a self-hosted Dropbox replacement for my family. It has been running quite well since I set up it, but lately I have noticed that sometimes I have not been able to login. Whenever I login ownCloud redirects to the login screen with no errors. 

<span class="more"></span>

Not only is this frustrating, but there seems to be no concensus on the actual cause of this in the ownCloud forums. The only known issue is with setting HTTP Basic Autentication in the .htaccess file on the ownCloud directory. That causes the login loop for some people. I tried everything I could find online to fix the issue.

When I ssh'ed into my Pi I noticed that disk usage was almost 100% (on a 8gb sd card, not very much to begin with). I put that to the back of my mind to deal with later while I restarted Apache to see if that would fix the issue. I should have known that the disk space was the issue.

After clearing some space and bringing total usage below 75% ownCloud started working again.