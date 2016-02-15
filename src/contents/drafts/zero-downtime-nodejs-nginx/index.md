---
title: Zero-downtime deploys with a NodsJS app and nginx
author: cory
date: 2015-12-10 15:00
template: article.jade
---

I recently decided that I was going to try to set up one of the apps I maintain at work to allow for zero-downtime deploys. We currently have to wait until the middle of the night to update it because no-body uses it outside of buisness hours. We have a script that does this, but I creates a long feedback loop for the customer and us and I find annoying.