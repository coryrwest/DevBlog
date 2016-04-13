---
title: Building a cheap and power-friendly home server. Part 2.
author: cory
date: 2016-03-20 17:00
template: article.jade
---

In part 2, I describe the set up and some annoying realizations that caused me to rethink many assumptions that I had.

I had originally invisioned one server to rule them all. With one server there is only one place to manage everything and one OS to update. I wanted to run every service as a Docker container with all configuration and data residing on the host OS. That gives me the flexibility of only having to back up the config and data directories and allowing for fast recreation of any one service or the entire server itself. This idea proved a little difficult, as I will explain later.

<span class="more"></span>

*  [Part 1. The build](../building-a-cheap-power-friendly-home-server-part1)
*  Part 2. The set up

# The layout

I have thought a lot about how I am going to layout the data. I wanted one folder structure that will make sense for the amount and diversity of data that I will be operating on. All of the services that I wanted to install will use this structure, so it has to make sense now as changing it later will be difficult once all the service are up and running.

## Data

I settled on a structure that breaks things up into one folder for each person who will be storing data, with default subdirectories for each person, and one directory for the whole family for data that doesnt make sense to tie to any one person, namely movies and tv shows. I also needed a folder to hold all the configurations and data for the containers. I wanted to make backups easy and have all of this in one place so a **var** folder will do nicely.

### Structure

*  cory
  *  music
  *  documents
  *  backups
  *  videos
  *  pictures
*  family
  *  movies
  *  tv
  *  backups
*  var
  *  (container data)

# Services

There are a lot of things I want this server to run. I very much dislike trusting my data to a third party and like to host things myself where possible. So I have set out to replace the following service with self hosted alternatives: 

*  Dropbox/Google Drive
*  Google Play Music and Movies
*  Google Reader (now dead)
*  IFTTT/Zapier
*  GitHub

There are also some things that I can add to this system for added utility:

*  Transmission (for legal torrents of course)
*  Plex (for media streaming)
*  dokuwiki (for my personal wiki).

All of these services should be running in Docker containers because I do not want to have to reconfigure or reinstall them should something happen to the server. I also like the isolation that Docker provides.

# Set up and issues with docker container data

The setup for most of this was pretty straight forward save for one hiccup I encountered with permissions across containers and the host OS. Docker allows you to create something called a data container which is basically an empty container that just hosts data. You can also map directories from the host OS to the Docker container using the **--volume** flag when running **docker run**. When I started this journey I was hoping that I could use the second approach (which I was eventually able to do), but I read that this is not the recommend approach. I said screw it I'm doing it that way.

The first hurdle was permissions. When you map a data container to a regular container Docker handles the permissions internally and it just works. Unfortuantely, I could not do that because of the fact that I wanted to be able to view and modify the data from the host OS without having to use the root account. I also wanted the data to be accessible across different containers. When you use the --volume flag Docker does nothing but mount the directory to the containers OS. This presented a problem because the Docker container will be using one user (lets say with ID 10000) and the permissions on the host OS will map to another (lets say 1001). When the container tried to access the data you can guess what happens.

Now not all Docker images are created equal. Some image authors graciously build their images to allow for specifying the user or group id that the container services use, and some do not. I spent many hours researching how to map the directories to the container OS like a data container without actually using a data container. From what I remember of my research, this is in the works (or something like it) but it was not ready when I was setting this up. For the images that allow you to specify that was an easy setup, but for the others I ended up forking the image and modifying it to suit my needs. I don't really like doing this because I can no longer rely on the image author for updates.

I finally have everything set up and working how I want. That data is stored on the host OS and backed up using [hashbackup](../using-hashbackup-with-b2) and the containers are ephemeral and I can easily rebuild the server from a backup without having to backup the filesystem. I am also not strapped down to a specific OS, which means I can upgrade to Arch eventually when I want to start learning it.