---
title: Am I a Data Hoarder?
author: cory
date: 2017-02-09 15:00
template: article.jade
---

Having recently discovered [r/DataHoarder](https://www.reddit.com/r/DataHoarder/) I have the data hoarding bug. 
I have grown increasingly uneasy with the degree to which I rely on the internet for my life. I have also personally 
experienced a frequently accessed site of mine disappearing from the internet. After some introspection I have come to 
the conclusion that for some sites that I deem very valuable to me, I would like to keep my own copy of said site. 
Since I am building the infrastructure to do this I mind as well hoard some other stuff as well that may not be 
immediately useful to me.

<span class="more"></span>

What I'm Hoarding
-----------------

First off some data are very easy to download a copy of and keep up to date. An example would be the Wikimedia 
database dumps. They are easy to download and are updated frequently. Some other data are not as easy, such as many 
websites. I've decided that should the internet disappear or change in a significant way that precludes me from 
accessing certain parts of it I want to maintain a copy of what I consider a good baseline of useful knowledge. 
That includes:

 - Wikipedia
 - Wikibooks
 - Wikisource
 - Wikiversity
 - Some source of first aid and general health information

I also want to keep copies of resources that are important to me, such as:

 - Some source of survival information
 - Some source of recipes

Why
---

Ok so some would say that the reason I'm doing this isn't really rational, but I'm going to try to convince you otherwise. 
The fun reason that I tell people is "If the internet disappears tomorrow, what will you miss? What will you wish you had a 
copy of?". Or alternatively for the preppers out there, "If the apocalypse happens/government falls apart/[insert other 
doomsday scenario], won't you wish you had a slice of the internet to reference and help you survive?". Now the rational 
reason that I am hoarding this stuff is because it is all useful stuff to have in specific situations and the internet is 
ever changing.

 - Advanced First Aid - If the power goes out for a couple days or weeks over a large area and someone gets hurt you can get all the information you'll need to help them with a laptop and a solar charger.
 - Recipes - The internet is constantly changing. What if your favorite recipe disappears from the internet because the site hosting it when belly up or they removed it for some reason.
 - Wikipedia, Wikisource, Wikiversity, etc. - Same reasons as both points above.
 - Other website mirrors - Same reasons again.

Am I crazy for spending so much time on this? Maybe. But I will be more prepared than you when shit hits the fan (if it ever does).

How
---

Using my home server, I set up several scripts and programs to do all my hoarding for me. 

**Wikimedia**

Wikimedia was the easiest as there is already a [downloader](https://github.com/WikiTeam/wikiteam) for it. I am downloading the 
following dumps including the corresponding media and images using rsync from the media mirrors.

 - Wikipedia
 - Wikisource
 - Wikibooks
 - Wikiversity
 - Wikivoyage

**Advanced First Aid**

This was a little more difficult because there isn't really one source for this information that I could find. 
I settled on WebMD since it seemed like the most complete source for health information. I would have to use 
HTTP mirroring to download the data I wanted because they don't offer any kind of downloader or dumps for 
their data. Using a mirror would be a little tricky because I only want First Aid data and not the entire 
WebMD site. I ended up writing a custom script using Htttrack.

```
httrack {URL} -f0 -c{# OF CONNECTIONS} -R5 -o0 -s0 -a -n -v -F \"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.6) Gecko/20070802 SeaMonkey/1.1.4\"
```

**Recipes**

Haven't built this one yet, but I assume it will be similar to WebMD.

**Other Sites**

All the other sites I mirror either use the Httrack script or wget using various options based on the site.

```
wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --exclude-directories=tmp,notwebsite,ads,etc. \
     --convert-links \
     --restrict-file-names=windows \
     --domains website.com \
     --no-parent \
         https://website.com
```