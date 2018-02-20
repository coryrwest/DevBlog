---
title: Setting up Lets's Encrypt on a Residential Internet Connection
author: cory
date: 2017-11-05 15:00
template: article.jade
---

I thought I would share how I set up Let's Encrypt on my home server since it wasn't the easiest thing to do and my friend recently had trouble with this.

<span class="more"></span>

Why is it not so easy?
-----------------------

I am not sure if things have changed since I did it, but it was difficult for me because most ISP's block port 80 on residential internet connections. Which means that the certbot for Let's Encrypt cannot issue it's challenge and get a response.

How I fixed it
--------------

ALl you really need to do is open port 443 (for SSL) and make sure nothing is listening on it. Then you can just issute the standalone certbot command with `--standalone-supported-challenges tls-sni-01`.

Full Command: 

```
certbot certonly --standalone --standalone-supported-challenges tls-sni-01
```

With multiple domains (subdomains):
```
certbot certonly --standalone --standalone-supported-challenges tls-sni-01 --domains example.com sub.example.com
```