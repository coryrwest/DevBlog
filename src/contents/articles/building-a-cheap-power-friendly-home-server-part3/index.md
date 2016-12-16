---
title: Building a cheap and power-friendly home server. Part 3.
author: cory
date: 2016-12-16 15:00
template: article.jade
---

My home server has been running almost without issue for many months now. It has gone down a couple times because I also use the server to tinker with things and for other reasons I outline below. After reading [this blog post](https://thehftguy.wordpress.com/2016/11/01/docker-in-production-an-history-of-failure/) about running Docker in production I started to rethink why I was using it over LXC. The main reason was because there were existing Docker images for a lot of the services I wanted to run on my server. Which meant a faster start up time and presumably less headaches. After thinking about it some more and realizing that I spent a lot of time fighting with Docker to get it working the way I wanted, I decided that Docker sucks. I hate it and it wastes a lot of my time. 

<span class="more"></span>

*  [Part 1. The build](../building-a-cheap-power-friendly-home-server-part1)
*  [Part 2. The set up](../building-a-cheap-power-friendly-home-server-part2)
*  Part 3. Some things I learned about Docker

My problems with Docker
-----------------------

While I have not experienced most of the issues outlined in the blog post above I have plenty of reasons to dislike Docker in the context of my home server set up.

*  I have had the Docker engine lock up my console many times.
*  I have had Docker crash my server more than once.
*  I spent a whole week trying to get Docker to accept my file structure and permissions.
*  I dislike having to ssh into my Docker containers to see the filesystem in any meaningful way.

For mainly these reasons I decided to look at LXC containers.

The Joys of LXC
---------------

When I first looked at LXC vs. Docker when I was ready to start this project I had no experience with containers and wanted something quick and easy. Docker seemed on the surface to be the right choice. After using it personally for so many months I have outgrown it. I took another look at LXC now that I understood the space a little more and I was pleasantly surprised. It had a none of the problems Docker had that I have encountered. It felt like a first class citizen on Linux. It was easy to use with my file structure and setting up your own containers from scratch was simpler than I thought.

*  I've been running my LXC containers for 2 months now, and while that isn't very long to test reliablility, I have not had any crashes or hang ups.
*  With LXC containers its as simple as setting an fstab mount point in the containers config for mounting external storage. Easy, done. Problem solved. 
*  The filesystem for LXC containers reside in the /var/lib/lxc directory as plain text files. Unlike Docker with it's layered filesystem. It is trivial to move files to and from the LXC container or changing configs without having to ssh into the running container.

One of my concerns with LXC was having to rebuild from scratch all my containers. But once I did one I realized how much easier it was to get everything set up in the majority of cases. Many of the apps I run do not fit in Dockers "one process" model and so need a little bit of hacking to get them to work. With LXC you have a full fledged Linux OS, which in my case is preferable to having smaller container sizes.

Finally done?
-------------

Now that I have my containers moved to LXC and everything is running smoothly I feel like I am done with this project. It has been running for 2 months now and I have not though about it at all until I start to writing this post. I'd say thats a job well done. My set and forget server is done, for now. I think my next project will be to move it all to Arch linux.