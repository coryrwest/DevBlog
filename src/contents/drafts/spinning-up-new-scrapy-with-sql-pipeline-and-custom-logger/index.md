---
title: Spinning up a new Scrapy project with a SQL Pipeline and a custom Logger
author: cory
date: 2018-01-15 15:00
template: article.jade
---

I have learned from recent history that I usually have 2-3 months between scrapy projects and in that time I forget how to set them up.
So I thought that I would document how I usually set up a Scrapy project in order to streamline the process next time. I almost always
use a SQL Pipeline to save the scrape results because it is easier for me to handle large amounts of data in SQL. I also usually like 
to log specific things while the scrape is happening and at specific times in the process, which is what the custom logger is for, as 
I usually run these from the command line.

<span class="more"></span>

My most involved scrapy project has 15 spiders that scrape various, similar data from many different sites. In the process of building this 
modestly sized scraper I have streamlined how I build spiders in order to make set up and maintenace easier. I also save all scrape results 
as well as the built in scrape stats to SQL so I can easily query and filter it later (Because what is the point of scraping crap if you 
can't use it).

Initial Set Up
--------------
When thinking up a new project for scraping I find myself jumping in and building a crawler first and then thinking about structure later, which 
is not the best way to do it I have found. I usually have the need to scrape specifically structured data from several sources so it helps to 
think about the structure that I want first and then build the crawler around it. Scrapy Items lend themselves well to this as that is exactly what 
they are built for. One problem I have run into is that Scrapy Items do not automatically define default values, which is what a default value pipline is for.

```
class DefaultValuesPipeline(object):
    def process_item(self, item, spider):
        if type(item) is PROJECT.items.ITEM:
            item.setdefault('STRINFFIELDNAME', '')
            item.setdefault('INTFIELDNAME', 0)
            item.setdefault('ARRAYFIELDNAME', [])
        return item
```

Once I have my items and default values pipeline set up I am ready to build my first crawler.


Helpful Utilities
-----------------

I also keep a file of helpful little utilities for cleaning up the data that is scraped and attempting to make sure that it is all in the same format. 
Most of the functions are self-explanitory.
```
def encode_list(list):
    return map(lambda x: x.encode('utf-8'), list)

def strip(list):
    space_stripped = [str(x).strip() for x in list]
    many_sp_strip = [re.sub(' +', ' ', x) for x in space_stripped]
    char_strip = [x.replace('\n', '') for x in many_sp_strip]
    return char_strip

def remove_short_items(list, length):
    if length == 0:
        items = [el for el in list if el is not None]
        lenitems = [el for el in items if len(str(el)) > 0]
    else:
        items = [el for el in list if el is not None]
        lenitems = [el for el in items if (el is not None and len(str(el)) >= length)]
    return return_default(lenitems, [])

def combine_list_elements(first_list, second_list):
    return [a + ' ' + b for a,b in zip(first_list, second_list)]

def strip_html_to_text(list):
    items = [el for el in list if el is not None]
    text_elements = [BeautifulSoup(x, 'html.parser').get_text() for x in items]
    return return_default(text_elements, [])

def strip_single_html_to_text(item):
    item = '' if item is None else BeautifulSoup(item, 'html.parser').get_text()
    return return_default(item, '')

def return_default(value, default):
    if value is not None:
        return value
    return default

def encode_strip_remove(list, length=2, encode=False):
    encodedlist = encode_list(list) if encode else list
    items = remove_short_items(strip(encodedlist), length)
    return return_default(items, [])
```

Setting up the Pipeline to Save Data
------------------------------------


Custom Logging
--------------
I like to see that my crawler is actually making progress in its task so I built this custom logger to log how many items have been processed. I don't want 
to spam the console with output so I set it up to only log X number of items with an increasing multiplier to lower the output as the crawler runs. This 
suits my needs very well, though the use case is kind of narrow and may not be useful for all projects.


```
logger = logging.getLogger(__name__)

class StatusLogger(object):

    def __init__(self, item_count, multiplier, max_count):
        self.item_count = item_count
        self.multiplier = multiplier
        self.max_count = max_count
        self.items_processed = 0

    @classmethod
    def from_crawler(cls, crawler):
        # first check if the extension should be enabled and raise
        # NotConfigured otherwise
        if not crawler.settings.getbool('CUSTOM_LOGGING_ENABLED'):
            raise NotConfigured

        # get the number of items from settings
        item_count = crawler.settings.getint('LOGGING_THRESHOLD', 10)
        multiplier = crawler.settings.getint('LOGGING_MUTLIPLIER', 2)
        max_count = crawler.settings.getint('LOGGING_MAX', 1000)

        # instantiate the extension object
        ext = cls(item_count, multiplier, max_count)

        # connect the extension object to signals
        crawler.signals.connect(ext.spider_opened, signal=signals.spider_opened)
        crawler.signals.connect(ext.spider_closed, signal=signals.spider_closed)
        crawler.signals.connect(ext.item_scraped, signal=signals.item_scraped)

        # return the extension object
        return ext

    def spider_opened(self, spider):
        logger.info("opened spider %s", spider.name)

    def spider_closed(self, spider):
        logger.info("closed spider %s", spider.name)

    def item_scraped(self, item, spider):
        self.items_processed += 1
        if self.items_processed % self.item_count == 0:
            # increase item_count by a multiplier, only if max has not been reached
            if self.item_count <= self.max_count:
                self.item_count = self.item_count * self.multiplier
            logger.info("----- %d items -----", self.items_processed)
```