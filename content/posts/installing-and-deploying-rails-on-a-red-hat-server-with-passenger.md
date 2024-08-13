---
date: 2009-07-23T00:00:00-0600
slug: installing-and-deploying-rails-on-a-red-hat-server-with-passenger
title: "Installing And Deploying Rails On A Red Hat Server With Passenger"
type: post
post_type: note
photos:
- /uploads/2009/rails1-391x500.png "rails"
tags:
- Articles
---
[![rails](/uploads/2009/rails1-391x500.png "rails")](http://brandontreb.com/wp-content/uploads/2009/07/rails1.png)I have long been a fan of Ruby on Rails and even jumper on board very early on. The one thing that has held me back from using it in the majority of my projects is the fact that it’s such a pain to configure with Apache.


I know what you are saying… Just switch to a more Rails friendly server. I like and know Apache. Not to mention I also host PHP apps.


With the (re)release of tagacloud, I have recently fell in love with ruby on rails again. So, I looked for a better solution for installation (last time I installed it was 3 years ago) and I stumbled upon [Passenger](http://www.modrails.com/).


It was super easy to use and had my running on Rails in no time.



> 
> Deployment is only a matter of uploading application files. No Ruby (on Rails)-specific server configuration required!
> 
> 
> 


Just to give you some background, here are some details about my server.


**OS:** Linux


**Distribution:** Red Hat Enterprise Linux Server release 5.3 Hosted At Server Beach


**Control Panel:** Plesk 8.6


And here are the steps I took to get Ruby on Rails up and running from scratch


## 1. Install Ruby




```
<code class=’bash’>yum install ruby ruby-libs ruby-mode ruby-rdoc ruby-irb ruby-ri ruby-docs</code>
```


This will do some magic and install Ruby on your system…


## 2. Download And Install Ruby Gems


Head on over to <http://rubygems.org/> and download the latest version of Ruby Gems. Here is an example of getting the latest version as of the posting date of this article.




```
<code class=’bash’>wget http://rubyforge.org/frs/download.php/60718/rubygems-1.3.5.tgz</code>
```


Untar this file…




```
<code class=’bash’>tar -xvf rubygems-1.3.5.tgz</code>
```


Navigate to the extracted directory and run the setup script




```
<code class=’bash’>ruby setup.rb</code>
```


## 3. Install Rails


This will install rails. If it asks you about dependencies, just type “Y”




```
<code class=’bash’>gem install rails</code>
```


## 4. Install The Passenger Gem


Now that rails has been installed, we need to install [Passenger](http://www.modrails.com/). The installation process is stupid simple. [Passenger](http://www.modrails.com/) can be installed via a Ruby Gem.




```
<code class=’bash’>gem install passenger</code>
```


Now, it will do some stuff and and you some questions. At some point in the process, it will check to see if you have all of the dependencies. **You most likely will not**. Luckily, the geniuses who created Passenger tell you the commands to install all of the dependencies. So just follow the directions and you should be ok.


## 5. Set Up Passenger For Apache




```
<code class=’bash’>passenger-install-apache2-module</code>
```


It will ask you more questions and install everything needed to run Passenger. Pay attention to the stuff spit out at the end of the process. You will take this and paste it into your httpd.conf file. For example, here is the what mine spit out:




```
<code class=’bash’>LoadModule passenger_module /usr/lib/ruby/gems/1.8/gems/passenger-2.2.4/ext/apache2/mod_passenger.so
PassengerRoot /usr/lib/ruby/gems/1.8/gems/passenger-2.2.4
PassengerRuby /usr/bin/ruby</code>
```


Your **httpd.conf** file is probably located at /etc/httpd/conf/httpd.conf


You should now be good to go! Navigate to one of your vhosts folder (ex: tagacloud/httpdocs/) and create (or copy) a rails application.




```
<code class=’bash’>rails someRailsApp</code>
```


Then set permissions…




```
<code class=’bash’>chmod -R 755 someRailsApp</code>
```


And then a miracle happens… and viola! You (should) have a fully functional up and running. Navigate to <http://domain.com/someRailsApp/public> to see your app in action.


If you have any comments or questions, feel free to leave them in the comments section of this post.



[Tweet](http://twitter.com/share)


