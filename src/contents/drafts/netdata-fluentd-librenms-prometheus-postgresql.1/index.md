---
title: Netdata and Fluentd and LibreNMS with Pormetheus and PostgreSQL
author: cory
date: 2018-01-15 15:00
template: article.jade
---

I'm confused. After going down a rabbit hole of server monitoring and log aggregation for my next project on my home server I came across 
several products that at first all seemed similar. At first it was just some fun ideas on monitoring traffic on my small home network. 
Then I got tired of all the emails I get from my server with log outputs to make sure my scripts are running correctly. So now I am 
trying to find a solution to both problems.

<span class="more"></span>



Initial Set Up
--------------



difference between netdata, librenms, and fluentd. Why I use all of them.

Netdata: system info, real time. More data than librenms.
Librenms: mostly network info. Historical. Near realtime. 
Fluentd: Application logs aggregation. Historical. Alerts.

Store all historical data from all monitoring apps.
Prometheus for time-series data.
Postgres for all other data.