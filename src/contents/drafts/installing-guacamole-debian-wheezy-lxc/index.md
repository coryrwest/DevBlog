---
title: Installing Guacamole on a Debian Wheezy LXC container
author: cory
date: 2018-01-15 15:00
template: article.jade
---

I recently decided that I wanted to install [Apache Guacamole](https://guacamole.apache.org/) on my home server so I can 
SSH and RDP into my desktop and server with just a browser. At first I was hesitant because I didn't want there to be a 
way to access SSH on my server from the web. But in the end I feel that I can sufficently secure it and the benefits 
outweigh the risks.

<span class="more"></span>

Building the container
----------------------
If you have experience building LXC containers then you can skip this step.

```
sudo lxc-create -t download -n guacamole
Pick your template:
debian
wheezy
amd64

sudo lxc-start -n guacamole
sudo lxc-attach -n guacamole
```

Installing dependencies
-----------------------
Guacamole has a ton of dependencies and luckily most of them are in the package repositories.

All code snippets from here on out are in the context of a running LXC container.
```
apt-get update

apt-get install -y wget libcairo2-dev libjpeg-dev libpng12-dev libossp-uuid-dev maven tomcat7 \
default-jdk openjdk-7-jre openjdk-7-jdk java-common \
libvorbis-dev libssl-dev libwebp-dev libpulse-dev libvncserver-dev libssh2-1-dev \
libpango1.0-dev libavcodec-dev libavutil-dev libswscale-dev libfreerdp-dev
```

libwebp was one of the dependencies that was not the right version, I had to compile it from source.
```
apt-get install dh-autoreconf
git clone https://github.com/webmproject/libwebp
cd libwebp
./autogen.sh
./configure
make
make install
```
*Note: `make` and `make install` took about 5 minutes for me.

Installing Guacamole Server
---------------------------
Now we are ready to install the Guacamole Server

```
wget http://download.nextag.com/apache/guacamole/0.9.14/source/guacamole-server-0.9.14.tar.gz
tar -xzf guacamole-server-0.9.14.tar.gz
cd guacamole-server-0.9.14/
./configure --with-init-dir=/etc/init.d
make
make install
ldconfig
```
*Note: `make` and `make install` took about 10 minutes for me.

Enable guacd to start on boot
```
update-rc.d guacd defaults
```

Installing Guacamole Client
---------------------------
```
wget http://download.nextag.com/apache/guacamole/0.9.14/source/guacamole-client-0.9.14.tar.gz
tar -xzf guacamole-client-0.9.14.tar.gz
cd guacamole-client-0.9.14/
mvn package
cp guacamole/target/guacamole-0.9.14.war /var/lib/tomcat7/webapps/guacamole.war
service tomcat7 restart
```
*Note: `mvn package` took about 15 minutes for me.

Configuring Guacamole
---------------------
https://guacamole.apache.org/doc/gug/configuring-guacamole.html