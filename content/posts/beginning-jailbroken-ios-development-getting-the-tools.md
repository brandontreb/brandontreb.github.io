---
date: 2011-04-11T00:00:00-0600
slug: beginning-jailbroken-ios-development-getting-the-tools
title: "Beginning Jailbroken iOS Development &#8211; Getting The Tools"
type: post
post_type: note

tags:
- iPhone
---
Developing for [jailbroken](http://en.wikipedia.org/wiki/IOS_jailbreaking) is actually quite similar to regular iOS development with one addition. More Power! oh oh oh (said in a Tim Taylor voice (sorry for non-Americans that don’t get the reference)). With your device jailbroken, you have the ability to hook in to pretty much every class that Apple writes allowing you quite a bit of control over the iPhone’s functionality.


In today’s tutorial, I will simply be discussing the best way to get up and running with the tools necessary to write a jailbroken iPhone app. We will not be doing any coding, however this tutorial will be necessary for all posts going forward.


**Theos**


There are many ways to go about writing a jailbroken iOS app. Most of them are quite complex. [@DHowett](http://twitter.com/dhowett) has come up with a brilliant tool called [theos](http://iphonedevwiki.net/index.php/Theos/Getting_Started) which drastically simplifies the process. My tutorial will pretty much be a regurgitation of his tutorial [found here](http://iphonedevwiki.net/index.php/Theos/Getting_Started) with some added cheesy jokes.


Theos is a command line utility that essentially generates a template for creating applications, libraries, preference bundles, tools, and mobile substrate hacks. These cover 99% of the jailbroken apps that you are likely to create.


One thing to note is DHowett talks about doing jailbroken iOS development on both Mac and Linux; my tutorials will be Mac-only.


#### Step 1: Install the iOS SDK


You will first need to install the official iOS SDK.


<http://developer.apple.com/devcenter/ios/index.action>


You can register for a free account and download the latest SDK. Once installed reboot your Mac and come back here. I’ll wait…


#### Step 2: Setting Up The Environment Variables


Start by deciding on a good location to install theos. The suggested location is */opt/theos*. The only issue with doing it here is you will need to have administrator permissions as well as have to enter your password when updating files. For teaching purposes, I am going to assume you will install it here too.


Open the terminal and type:




```
<code class=’bash’>export THEOS=/opt/theos</code>
```


What we are doing is setting an environment variable. You can always see if this variable is set by typing *echo $THEOS* in the command line. It will need to be (re)set every time you reopen the terminal to develop a jailbroken app.


#### Step 3: Getting theos


DHowett uses subversion for version control on theos, so you need to make sure and have it installed. If you followed step one above, it should have been installed by default. We will be checking out theos into the THEOS directory specified in step 2.


In the terminal type:




```
<code class=’bash’>svn co http://svn.howett.net/svn/theos/trunk $THEOS</code>
```


You most likely will be asked for your password. You should now see the */opt/theos* directory created with theos installed.


#### Step 4: Getting ldid


We now need to install the ldid tool. ldid is a tool written by [Saurik](http://www.saurik.com/) (if you don’t know who he is, stop reading now). Basically, it simulates the signing process for the iPhone, allowing you to install your jailbroken apps/hacks on an actual device.


You can find this tool in many places, however DHowett has generously hosted it for us on his dropbox account.


Now, I had a tricky time getting this to download directly to my */opt/theos* folder. So, I downloaded it to my desktop and then moved it in to */opt/theos/bin/ldid*




```
<code class=’bash’>curl -s http://dl.dropbox.com/u/3157793/ldid > ~/Desktop/ldid
chmod +x ~/Desktop/ldid
mv ~/Desktop/ldid $THEOS/bin/ldid</code>
```


Alternatively, if you can get it to work properly, do it like DHowett suggests and download it directly into place.




```
<code class=’bash’>curl -s http://dl.dropbox.com/u/3157793/ldid > $THEOS/bin/ldid; chmod +x $THEOS/bin/ldid</code>
```


#### Step 5: Install dpkg


Dpkg is a tool to bundle up your app into a Debian package for distribution in a Cydia repository. You can install it through Macports.




```
<code class=’bash’>sudo port install dpkg</code>
```


#### Step 6: Creating A New Project


theos uses a tool called nic (new instance creator) to create a new project. Simply run nic by typing:




```
<code class=’bash’>$THEOS/bin/nic.pl</code>
```


and it starts the new instance creator. Here is a sample of making a jailbroken application.




```
<code class=’bash’>brandon-trebitowskis-macbook-pro:Desktop brandontreb$ $THEOS/bin/nic.pl
NIC 1.0 - New Instance Creator
——————————
  [1.] iphone/application
  [2.] iphone/library
  [3.] iphone/preference_bundle
  [4.] iphone/tool
  [5.] iphone/tweak
Choose a Template (required): 1
Project Name (required): FartLight
Package Name [com.yourcompany.fartlight]: com.brandontreb.fartlight
Author/Maintainer Name [Brandon Trebitowski]: 
Instantiating iphone/application in fartlight/…
Done.</code>
```


This will create a new folder with a basic template called fartlight (killer project, I know). In addition to the usual files it will contain a Makefile (for building the application) and a control file (information about the application when it’s in a Cydia repository).


This should now give you the basis for creating a jailbroken application/tweak/hack. In the next tutorial we will go over building, signing, and deployment. For now, you can check out the project I created with nic called [inPulseNotifier](https://github.com/brandontreb/inPulseNotifier). It’s a combination of a tweak (5) and a preference bundle (3) for the app settings.


Feel free to ask me a question in the comments and check out #theos on IRC.


**Update** [Check out the next tutorial in this series here](/beginning-jailbroken-ios-development-building-and-deployment/).


Happy coding!



[Tweet](http://twitter.com/share)


