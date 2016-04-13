---
title: Owncloud with Docker and persistant data
author: cory
date: 2016-02-15 15:00
template: article.jade
---

Setting up Owncloud in a Docker container is not as simple a feat as other web services. Owncloud requires a lot to run and breaks the Docker's whole "one process" model for containers. Luckily, people have already built Docker containers to house Owncloud, so I had a starting point when I wanted to set it up for my [home server](../building-a-cheap-power-friendly-home-server-part1). My goal is to have a complete solution that allows me to spin up a new Docker container from the hub and not have to maintain my own image.

<span class="more"></span>

### Goals
*  Leave my data structure untouched in terms of structure and permissions
*  Use a pre-existing Docker container without having to modify it.

Owncloud requires strict permissions on the directories that it stores data in, which is obviously necessary considering how they position themselves as a viable and secure alternative to other cloud storage providers. Unfortunately, this proved a little annoying for my purposes only because I was setting up Owncloud using Docker; which means I could not easily change the user that Owncloud runs as to match the permissions on the host OS.

I have a specific [structure to my data](../building-a-cheap-power-friendly-home-server-part2) that Owncloud will be hosting, as well has specific permissions to make access across apps and machines easy. This structure does not easily translate to Owncloud's model. Owncloud's model works really well if Owncloud is the only window into the data that it is hosting. That is not true in my case. Adding Docker compunds the complexity because of how Docker is set up to handle data permissions between containers and the host OS. 

Eventually, after much research, several reinstalls of a few Docker containers, and lots of pulled hair, I figured out a solution that meets my needs. I started with my [data structure](../building-a-cheap-power-friendly-home-server-part2) and spun up this [Owncloud container](https://github.com/jchaney/owncloud). When I started the docker container I just mapped the **owncloud** volumes to the **var** folder in my data structure and mapped the root **data** directory on the host to the container. Then in my Owncloud set up I just set up the **data** directory as an external data source. I also made a modification to the bootstrap.sh file to add a group to map the id in the container to the host and added the www-data user to that group. That effectively gave Owncloud permissions to my data structure. Mission partially accomplished (I still had to modify an existing container).

[My resulting Owncloud image](https://github.com/coryrwest/owncloud)