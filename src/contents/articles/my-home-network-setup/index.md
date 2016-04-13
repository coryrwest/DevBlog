---
title: My home network setup
author: cory
date: 2015-12-09 15:00
template: article.jade
---

I have been wanting to build self-hosted alternatives to popular cloud services ever since Google shuttered Google Reader. I never really had the motivation to do anything about it until the Snowden leaks. I know everybody has an opinion on that and I won't go into mine except to say that I no longer trust the security of my data on servers that I do not control. I would much rather have my data hosted on a machine I control, which is the motivation for this project.

<span class="more"></span>

The whole project will eventually consist of self-hosted cloud services and a home automation controller.

Self-hosted cloud services
--------------------------

I am about half way done with this part. There are two servers in this part, Jarvis and Tim.

### Jarvis

Currently, I am hosting all of the services on an [ODRIOD U3](http://www.hardkernel.com/main/products/prdt_info.php?g_code=g138745696275) underneath my desk at home that I have named Jarvis. (All my pc's are named after TV AI's, I'm weird I know). This machine currently hosts [Subsonic](http://www.subsonic.org/pages/index.jsp), [ownCloud](https://owncloud.org/), and [Transmission](http://www.transmissionbt.com/) behind Apache. It will eventually host [Plex](https://plex.tv/) and a VPN but I haven't set those up yet. I also eventually want to move to nginx because I think configuration is easier.

### Tim

Tim is a [Raspberry Pi Model B](https://www.raspberrypi.org/products/model-b/). Because of its limited resource I only use this for tinkering and test setups that I will eventually move to Jarvis. I also have my router set up to port forward only to this machine. This limits the publically exposed surface of my network, but still allows me to access it from anywhere. This machine has the most security in place. 

Eventually, I will be retiring this machine and putting a VPN on Jarvis which will act as the gatekeeper to the network. For now, I just jump to whatever machine I need to from here.

Home automation
---------------

I have a [Raspberry Pi Model B](https://www.raspberrypi.org/products/model-b/) set aside for this when I find the time to install [openHAB](http://www.openhab.org/) on it. I will detail my planned home automation setup in a later post.

Other
-----

I have other machines that I sipn up from time to time for various reasons unrelated to my cloud services or home automation.

### Icarus

Icarus is an old dell that I have from when I was in high school. It is really old hardware that is still going strong. I have this one set up as a test machine for things that need a GUI because I have VNC set up on it. I also use this for development of linux sepcific stuff. Which for now is mostly python stuff. It is the only machine that can handle running a GUI without significant lag during development tasks.