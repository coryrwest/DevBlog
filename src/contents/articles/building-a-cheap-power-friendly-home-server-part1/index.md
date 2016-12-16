---
title: Building a cheap and power-friendly home server. Part 1.
author: cory
date: 2016-01-13 15:00
template: article.jade
---

I have been running my home network system off of several Raspberry Pi's and an ODROID U3 for almost a year now and I am starting to outgrow them. I have concocted a plan to build a home server based on Jeff Atwoods [HTPC build](https://blog.codinghorror.com/the-2016-htpc-build/). His build is powerful, yet power efficient. Since my server will run 24/7 and power is somewhat expensive where I live power efficiency is key. That was the original motiviation behind the Pi's, they sip power. Also, I wanted something that I can put under my desk that is quiet.

<span class="more"></span>

*  Part 1. The build
*  [Part 2. The set up](../building-a-cheap-power-friendly-home-server-part2)
*  [Part 3. Some things I learned about Docker](../building-a-cheap-power-friendly-home-server-part3)

Picking an OS
-------------

I also have a small budget for such an endeavor, as this home server experiment of mine isn't exactly that popular with the wife. Another reason the Pi's were so easy. It would also be nice to have everything on one box instead of 4 SBC's. I also didn't need something as powerful as Atwood's HTPC since I would not be playing games or watching movies from it. Though it does not to be powerful enough to eventually transcode HD video for when I get OSMC/Plex up and running again.

I researched a little bit about what OS I should use between Ubuntu Server, Debian, and Arch. I'm used to Debian because that is what the Pi's are built off of. I've also used Ubuntu Server a lot. I haven't used Arch, but I love the philosophy and have always wanted to try it.

In the end I chose Debian Unstable. There are a few reasons for this:

*  I wanted up-to-date packages and Debian Stable has some old packages and its generally less frequently updated.
*  Ubuntu Server is based on Debian, but has less maturity and development base than Debian.
*  Arch linux takes too much time to build up from scratch.

Since this is a box for a home server and I will be tinkering with some new software on it I figured the stability <-> up-to-date packages tradeoff was worth it.

The Parts
---------

Keep in mind that I was going for as cheap as possible, while still having power and reliability. I made some trade-offs in the SSD and RAM (purchased from a friend) in order to get the cost down. The motivation behind the Mini-ITX form factor was the size, though it drastically limited my choices.

*  $32.99 - AMD Sempron 3850 APU, 1.3 Ghz [link](http://www.amazon.com/gp/product/B00IOMFFUG?psc=1&redirect=true&ref_=oh_aui_detailpage_o04_s01)
*  $38.24 - ECS Elite Group Socket AM1 Mini ITX Motherboards KAM1-I [link](http://www.amazon.com/gp/product/B00SX4WUOO?psc=1&redirect=true&ref_=oh_aui_detailpage_o04_s00)
*  $20.00 - G.SKILL Ripjaws 8GB DDR3 1600 (2 x 4GB) [link](http://www.newegg.com/Product/Product.aspx?Item=N82E16820231314)
*  $39.95 - M350 Univeral Mini-ITX enclosure [link](http://www.mini-box.com/M350-universal-mini-itx-enclosure)
*  $29.95 - picoPSU-90 90w output, 12v DC-DC [link](http://www.mini-box.com/picoPSU-90)
*  $41.99 - Silicon Power S60 2.5" 120GB [link](http://www.newegg.com/Product/Product.aspx?Item=0D9-0021-00005&Tpk=0D9-0021-00005)

The total cost for components (not including tax and shipping): **$203.12**

I'd say thats pretty good for what I got. Plus, after this I will have the benefit of incremental upgrades. To help offset the cost of this new project I will sell my current development server (an old dell sitting in my closet) and two of my four Raspberry Pi's. I'm going to sell the Pi's as a kit including the power adapter, an sd card, a case, and a wifi dongle since I don't need that stuff any more. Conservatively, the sale of all that stuff will net me $171 after shipping and fees. So my total cost will be **$32**.