---
title: Using hashbackup with Backblaze's B2 storage
author: cory
date: 2016-04-13 15:00
template: article.jade
---

I have been following [Backblaze](https://secure.backblaze.com/r/0027zd) (referral link) since I started using them for backup way back when [Mozy screwed their customers back in 2011](http://www.technologizer.com/2011/02/01/mozys-new-pricing-is-a-price-hike-or-a-price-cut-depending-on-how-you-look-at-it/). I was a happy user of Mozy until they moved to a new pricing model that heavily punished users storing lots of data. Intelligently, Backblaze saw the opportunity and pounced, capturing many previous Mozy users. Backblaze has been my favorite backup company since then. Their app is great and just works in the background, restores are easy, and their website is beautiful. They are very transparent about what they do and are the go-to guys for hard drive lifetime statistics. They pride themselves on keeping prices where they are no matter what happens. They are well known for keeping prices the same while increasing capacity through the hard drive shortage in 2011-2012 by "shucking" external drives for their innards.

<span class="more"></span>

Anyway, I disgress. They recently launched a new service, B2, that uses their [Vault architecture](https://www.backblaze.com/blog/vault-cloud-storage-architecture/). B2 is rediculously cheap for cloud storage, coming in at half a cent per gigabyte. That is 400% cheaper than S3, Azure, or Google Cloud ([comparison](https://www.backblaze.com/b2/cloud-storage-providers.html)). It's API takes a little getting used to; but the service is fast and reliable. I have yet to encounter any issue at all and i've been using it on a weekly basis since the closed beta.

Since this storage is so cheap I decided that I would use it as an offsite backup for backups of my [home server](../building-a-cheap-power-friendly-home-server-part2). I already use Backblaze for backing up my desktop, but they don't have a linux app for their backup offering (at the time of this writing), so B2 was a no-brainer. Few things currently integrate with B2 and I didn't want to custom build a solution. I wanted something set and forget. Enter [hashbackup](http://www.hashbackup.com/). 

hashbackup purported to support B2 but their website had only one line about it. I was confused for a many a minutes until I realized that the download includes a sample configurations folder. In there is a sample config for setting up B2 with hashbackup. What follows are some tips if you wish to use hashbackup with B2.

**Things to keep in mind when using hashbackup with B2**

*  If you have to reset your Application Key for any reason, hashbackup will stop working. Make sure you securely record your key somewhere.
*  hashbackup requires a directory to hold the backup files on the local machine. You can set your config to not store the actual backups on the local machine and only on the remote, but the default is to *cache* a copy of the backup on the local machine. I set my cache size to the size of one chuck (read the docs to know what I'm talking about).
*  The "directory" that you set up in the dest.conf for hashbackup is the "folder" that the data will reside in the B2 bucket. Read the B2 docs to understand why I quoted *folder*.
*  For each different backup you want, you will need a separate hashbackup configuration. As far as I was able to ascertain you cannot multiple directories on local to multiple directories on remote without more then one config.