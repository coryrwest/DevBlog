---
title: Zero-downtime deploys with a NodsJS app and nginx
author: cory
date: 2015-12-12 15:00
template: article.jade
---

I recently decided that I was going to try to set up one of the apps I maintain at work to allow for zero-downtime deploys. We currently have to wait until the middle of the night to update it because nobody uses it outside of buisness hours. We have a script that does this, but I creates a long feedback loop for the customer and us and I find annoying.

<span class="more"></span>

## PM2

We use PM2 to handle starting and stopping of our NodeJS apps. The feature I like the most is the auto-restart on failure and reboot of the machine. I previously used Forever, but found that PM2 has more features and works better. For some reason Forver had a memory leak, though I suspect is was because our app wasn't stopping correctly.

Also before we start you have to be using NodeJS 0.12 or higher in production, none of this will work without it. If you are using 0.12 or higher you can safely ignore any warnings PM2 gives you about Graceful Reload not being production ready.

First you should make sure that your Node app listens for the shutdown signal and shuts down cleanly. It will make this whole process much easier. You may also want to set the PM2_GRACEFUL_TIMEOUT environment variable if your shutdowns take a while.

~~~
pm2 set PM2_GRACEFUL_TIMEOUT {timeout in seconds}
~~~

Then you need to set your app to run in [cluster mode](http://pm2.keymetrics.io/docs/usage/cluster-mode/), either in the start command you use or in the [configuration JSON file](http://pm2.keymetrics.io/docs/usage/application-declaration/) for your app. 

~~~
{
    "apps" : [{
        "name"       : "worker-app",
        "script"     : "worker.js",
        "instances"  : 2,
        "exec_mode"  : "cluster_mode",
        "cwd"        : "/this/is/a/path/to/start/script",
        "env"        : {
            "NODE_ENV": "production",
            "PORT": "8080"
        },
    },
    {
        "name"       : "worker-app2",
        "script"     : "worker.js",
        "instances"  : 2,
        "exec_mode"  : "cluster_mode",
        "cwd"        : "/this/is/a/path/to/start/script",
        "env"        : {
            "NODE_ENV": "production",
            "PORT": "9090"
        },
    }]
}
~~~

Now whenever you want to restart your app you can use the **pm2 gracefulReload {appname}** command.

The last thing you have to do is run two instances of your app (if you are using cluster mode with 2 instances then you would techincally be running 4 instances) on different ports for nginx.

## nginx

nginx is easy to set up. All you have to do is create an **upstream** config for your node apps. From the nginx documentation:

~~~
http {
    upstream myapp1 {
        server localhost:8080;
        server localhost:9090;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://myapp1;
        }
    }
}
~~~

That should be all you need for nginx. Now if you need to restart nginx for some reason you can use nginx reload. Although, you should always be using reload, unless you know what you are doing.