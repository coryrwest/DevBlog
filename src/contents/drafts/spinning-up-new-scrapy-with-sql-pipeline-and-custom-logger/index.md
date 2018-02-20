---
title: Spinning up a new Scrapy project with a SQL Pipeline and a custom Logger
author: cory
date: 2018-01-15 15:00
template: article.jade
---

I have learned from recent history that I usually have 2-3 months between scrapy projects and in that time I forgt how to set them up.
So I thought that I would document how I usually set up a Scrapy project in order to streamline the process next time. I almost always
use a SQL Pipeline to save the scrape results because it is easier for me to handle large amounts of data in SQL. I also usually like 
to log specific things while the scrape is happening and at specific times in the process, which is what the custom logger is for, as 
I usually run these from the command line.

<span class="more"></span>

My most involved scrapy project has 15 spiders that scrape various, similar data from many different sites. In the process of building this 
modestly sized scraper I have streamlined how I build spiders in order to make set up and maintenace easier. I also save all scrape results 
as well as the built in scrape stats to SQL so I can easily query and filter it later. (Because what is the point of scraping crap if you 
can't use it)

Initial Set Up
--------------
