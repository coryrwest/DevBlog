---
title: Setting up mergerfs on JBOD's (or a poor mans storage array)
author: cory
date: 2017-01-17 11:00
template: article.jade
---

My [home server](../building-a-cheap-power-friendly-home-server-part1) recently ran out of space on its data drive 
because of my newly cultivated interest in data hoarding. After much internal conflict I decided to engineer a solution 
that would last for years to come (hopefully).

<span class="more"></span>

Research
--------

I had several ideas for how to handle this issue and any future needs for increased capacity. My goal was to double the 
storage capacity of the server (while making expansion easier later) without spending more than $100 since this project 
is low on the list for funding. Before getting started I took an inventory of what I had.

 - The motherboard I am using has one free SATA port, but no internal space for another drive.
 - It also has a PCIe slot, but the case requires a low-profile card, which limits my options.
 - I have an external portable hard drive that is a couple years old and is 500GB. It has 3 years of near constant use behind it.
 - I have two internal 3.5" hard drives that are 500GB each. They are also a couple years old. Though only have about a year of use on them.
 - The motherboard has two free USB 3.0 ports and three free USB 2.0 ports.

With my inventory done I could research different options for tackling this storage issue.

The Ideas
---------

Since I wanted this project to be as low cost as possible I tried to find solutions that used something I already had. Namely, my 
extra drives.

** Get a NAS enclosure and fill it with drives **: 
This seemed like the cleanest solution to my problem, but it also had the highest capital requirements. 
Not only would I have to buy the enclosure, but from what I've read these things work best if you use the same 
size drives across the entire array. With the size enclosure I wanted (4 drives) I would have to buy a new drive as well. 

** Get a SATA controller and add drives using that **: 
Since my motherboard only has 2 SATA ports I would have to get a SATA controller. Since my case is tiny I would have to find a 
half height card that did not have any ports along the top. While not impossible it greatly reduced the options I had to work 
with. The only thing I would have to buy is the SATA controller since I already have some drives laying around.

** Add another drive to the server using the internal SATA port **: 
Adding another drive to the motherboard via SATA was an ugly option. I would have to route the SATA and power cables 
outside the case since my case has absolutely no interal space for another drive. (It wouldn't even fit the current 
one. I had to 3D print a custom mount for it to fit). But the cost is zero since I already have the parts for this.

** Upgrade the data drive to something bigger (currently 1TB) **: 
Upgrading to something bigger was going to be a pain in the ass. I would have to buy a new drive which, in order to 
keep costs down, would have to be in the 3.5 inch form factor for something larger than 1TB. This would bring along 
with it the same problems as adding another drive. Also, I would have to move all the data on the existing drive to 
the new one. At near a terabyte in data that is not trivial, though not really enough of a problem to discount this 
solution.

** Add more drives through USB and somehow combine them or restructure my data to make sense spread across drives **: 
In the end I settled for this option. But how was I going to do that...


Enter mergerfs
--------------

I remembered [reading an article](https://www.linuxserver.io/2016/02/02/the-perfect-media-server-2016/) about building 
the perfect media server that mentioned a filesystem that can merge a bunch of drives of different sizes together 
into one filesystem. I dug through my bookmarks and Evernote to find the post and was elated to read that 
[mergerfs](https://github.com/trapexit/mergerfs) was exactly what I was looking for.

I would only have to buy one enclosure for a 3.5" hard drive I had laying around in order to complete the set up. I 
didn't even really have to buy it because I had a Newegg gift card from christmas, score! After plugging in the new 
drive and formatting it, all I had to do was mount it somewhere and add it to the mergerfs command.

```
mergerfs -o defaults,allow_other /mnt/ext0:/mnt/ext1:/mnt/ext2 /data
```

Or in fstab:

```
/mnt/ext0:/mnt/ext1:/mnt/ext2  /data  fuse.mergerfs  defaults,allow_other  0       0
```

I had to modify my [data structure](../building-a-cheap-power-friendly-home-server-part2) just a little bit in terms 
of where it is stored. I originally mounted it to **/data**, so the containers and other scripts I have were looking 
at that directory. I didnt want to have to reconfigure everything so I remounted my existing data drive to 
**/mnt/ext0** and mounted the new drives to **/mnt/ext{1,2}**. That allowed me to set up the mergerfs mount point on 
**/data** and all the references would remain valid. In the end the structure looked like this:

- /mnt/ext0 (existing 1TB portable drive)
- /mnt/ext1 (new 500GB 3.5" drive)
- /mnt/ext2 (new 500GB portable drive, because I wanted to double storage capacity)
- /data (mergerfs mount point for all three drives)

**Sidebar:** With mergerfs you can use wildcards to mount all the folders that match the pattern into one filesystem. 
I chose not to do this because all my data is encrpyted with encfs and I was concerned that merging the encrypted directories 
with their corresponding encfs config xml files would cause issues with decrypting. So I chose to explicitly specify just 
the decrypted directories on the drives. **/mnt/ext{0,1,2}/data-dec** in my case. Plus is is easier to see exactly what is 
mounted this way.

Oh great, a permissions issue
-----------------------------

I hate dealing with permissions. I understand why they are important, but sometimes I just want to chmod everything to 777. 
When I brought the system back up with the newly created mergerfs directory postgres would not boot. I spend 4 days, on and off, 
trying to figure out what was wrong. I knew it had to be the new mergerfs directory because I keep the postgres data on 
the data drive and the only thing that changed was mergerfs. For some reason that I never figured out, postgres could not 
access some of the files in its data directory. Even though the postgres user was the owner and had full permissions to the 
files. I ended up reinstalling postgres and recursively setting the owner to postgres for the entire directory. That fixed 
it, but I'm still a little miffed that I could not figure it out. I hope it doesnt happen again. (pensive face)