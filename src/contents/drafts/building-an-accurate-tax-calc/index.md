---
title: Building an accurate (full) tax calculator
author: cory
date: 2016-01-10 15:00
template: article.jade
---

Whenever I am evaluating a potential raise or job offer I like to know exactly how it will affect my tax burden. To that end I usually search for some online tax calculator. hHe problem with this approach is that none of the tax calculators I have been able to find will combine all the different taxes that you have to pay to into one calculation. I always have to get three different numbers form three different places and put them together. Not only is this annoying and error prone, but it makes it hard to compare different scenarios. So I decided that I am going to build my own.

<span class="more"></span>

The Taxes
---------

Some taxes are easier to calculate than others. Medicare and Social Security are easy, but state and federal income are not. The calculator will initially support the following taxes:

*  Federal Income
*  State Income (CA)
*  Social Security
*  Medicare
*  State Disability Insurance (CA)

I am building the calculator so that I can easily add more states and update the tax tables for the next year. I also will set it up so that you can see the tax difference between now and next year, if the tax tables for next year have been released. I think in the future I will look for a way to do the update automatically through an API maybe.

The App
-------

I've decided that I want to split the actual calculation code and the website into different parts to that I can reuse the calculator in other projects if I want to.

### Calculation Code

This will be ES6 (because awesome) and calculate the different taxes given a json tax table and an income. Easy peasy.

### The website

I was thinking about doing a simple ReactJs app that stored its data in localStorage so you can leave the page and not have to type in your data again. I also found a [blog post](https://medium.com/@arqex/react-the-simple-way-cabdf1f42f12#.2fyg7o3s2) a little while back about freezerJs and wanted to see what that was about. Freezer was incredibly easy to set up and the todomvc example was already set to save data into localStorage, so yay. 