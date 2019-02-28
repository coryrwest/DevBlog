---
title: Home Server Upgrade
author: cory
date: 2018-05-20 15:00
template: article.jade
---

Time for an upgrade! I have out grown my current [home server](../building-a-cheap-power-friendly-home-server-part1) and need to expand. I went through many ideas 
when trying to figure out what I wanted in my new server and I settled on this:

<span class="more"></span>

 - Twice the CPU power
 - Maybe more Ram
 - Internal space for at least two data drives, plus the OS drive

I tried to stick with the Mini-ITX form factor because there are many cases out there that are small and easy to place. Unfortunately, very few of them hold more 
than two drives and are a reasonable price. (reasonable being relative here as I have a small budget to spend on projects like this). So I considered Micro-ATX. 
Many more options in terms of motherboard and processors that are reasonably priced and the parts are more mainstream so there is a lively used community.

Parts
-----

I considered just upgrading my current server and re-using as much parts as I could, but I have wanted to have a dedicated box to use as a pfsense firewall for a long time. 
After researching where I could source some parts and the cost involved, I decided that it was not much more money just to build a new machine. So thats what I did.

 - Case [Thermaltake Versa H15](https://www.amazon.com/gp/product/B01CLIZ698) | $29
 - CPU [AMD A8-5500](https://www.amazon.com/AMD-A8-5500-3-2Ghz-Processor-AD5500OKHJBOX/dp/B0095VPB0E) | $27
 - Motherboard [MSI A68HM-E33 V2](https://www.msi.com/Motherboard/A68HM-E33-V2.html) | $27
 - RAM - 16GB DDR3 that my friend sold me | $20
 - Power Supply - Some 700 watt that my friend sold me (will be upgrading this if the power comsumption is outrageous)
 - HDD - an old 80GB spinning disk I had left over (will be upgrading this to an SSD ASAP)
 - Data Drives - 3 1TB spinning disks that I scored on ebay | $51
 - Cooler - just an old AM2 cooler I had laying around from a previous upgrade.

So I only ended up spending $150 for a holw new machine. Score for me!

Build
-----

The build was pretty straightforward. I decided that I was going to try [ProxMox]() as the host OS for various reasons, the two biggest being:

 - I have had issues with LXC containers not having IPs on my LAN and instead being on a separate VLAN on the host. I know I could solve this without ProxMox, but its a good excuse to use it.
 - I have heard a lot about ProxMox making container management easier and now that I have more than 15 containers it is getting hard to manage all of them.

The ProxMox install was not so straightforward. I could not get the pre-built live CD to boot correctly. After spending 15 minutes on it I gave up and just 
installed ProxMox over Debian Stretch. That whole process took maybe 10 minutes. Now I took this opportunity to re-evaluate my choice of filesystem. I am not sure why 
I chose ext4 when I built the first server (maybe it was the more comfortable choice because I had already used it), but I decided on BTRFS for the new server for various reasons.

Finishing Touches
-----------------

After getting ProxMox set up with all my containers and getting my data drives set up with SnapRAID the only thing left is to eventually upgrade some parts. The fans 
I currently have in there are too noisy and I wanted to replace them with some quieter ones, just waiting for the right deal. Same for the power supply, as the one I have is 
way too power hungry for my taste.
