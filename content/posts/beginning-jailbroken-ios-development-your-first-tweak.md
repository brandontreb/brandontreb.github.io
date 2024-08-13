---
date: 2011-08-24T00:00:00-0600
slug: beginning-jailbroken-ios-development-your-first-tweak
title: "Beginning Jailbroken iOS Development &#8211; Your First Tweak"
type: post
post_type: note
photos:
- /uploads/2011/IMG_0001.PNG
tags:
- iDevBlogADay
---
This is the 3rd installment of my jailbroken iOS development series. If you haven’t already, make sure you read the following tutorials to get up to speed.


* [Beginning Jailbroken iOS Development – Getting The Tools](http://brandontreb.com/beginning-jailbroken-ios-development-getting-the-tools/)
* [Beginning Jailbroken iOS Development – Building And Deployment](http://brandontreb.com/beginning-jailbroken-ios-development-building-and-deployment/)


Today I’m going to show you how to patch any internal Apple method that you want. In this demo, we are going to hook into the init method of Springboard and show a UIAlertView upon starting your phone up. It’s not the *coolest* of applications, but the design pattern and concepts used can be applied to patching any other internal method of any class.


#### Getting Set Up


In order to create a tweak, you must interface with Saurik’s libsubstrate.dylib dynamic library. This might come packaged with theos, but if not, you need to download a fresh copy. One can be found on this **very spammy** site. [Download libsubstrate.dylib](http://www.mediafire.com/?2upm53uzzj0488u)


Once you have downloaded it, copy it to the folder /opt/theos/lib. This is the folder where you will copy any other dynamic libraries that you might need to use in your application.


**The iOS Headers**


Most likely, theos came with the iOS headers that you need. If not, you need to obtain them by doing a header dump on the device OR Googling around for them. I suggest the latter as someone else has surely done the work for you. Once you have these headers, you need to put them in the folder /opt/theos/include. For this example you should have a folder in there called Springboard containing all of the Springboard headers.


#### Creating The Project


The process for creating the project is simple. I’m going to assume that you already have all of your environment variables in place that we discussed in the [last tutorial](http://brandontreb.com/beginning-jailbroken-ios-development-building-and-deployment/). If not, you will get errors.


Open the console, cd into the directory where you want to create your application and type the following command to create a new Tweak application.




```
<code class=’bash’>$THEOS/bin/nic.pl</code>
```


Now, when prompted select the number [5](http://cl.ly/1u0l0U0y2I0T1g2s3D0O) for a tweak. Next, you will enter all of the information about your project. The resulting output should look like this:




```
<code class=’bash’>NIC 1.0 - New Instance Creator
——————————
  [1.] iphone/application
  [2.] iphone/library
  [3.] iphone/preference_bundle
  [4.] iphone/tool
  [5.] iphone/tweak
Choose a Template (required): 5
Project Name (required): WelcomeWagon 
Package Name [com.yourcompany.welcomewagon]:                 
Author/Maintainer Name [Brandon Trebitowski]: 
MobileSubstrate Bundle filter [com.apple.springboard]: 
Instantiating iphone/tweak in welcomewagon/…
Done.</code>
```


#### The Tweaks File


Once your project has been created, you can open in up in your favorite editor. I prefer TextMate. Theos creates a file for you called Tweak.xm. This is a special file that will run through theos’s preprocessor in order to hook into the classes and methods that you specify. So, rather than us having to write tons of boilerplate/crazy hook code, Theos does that all for us with a nice interface.


By default, EVERYTHING in that file is commented out. It took me longer than I care to admit to figure that out when I created my first Jailbroken iOS app.


**The Preprocessor commands**


There are a few commands that you need to know in order to hook into a class:


**%hook and %end**




```
<code class=’objc’>%hook Springboard
// overwrite methods here
%end</code>
```


The first command is called %hook followed by the name of the class you are hooking in to. You choose the methods to overwrite within the context of %hook className and %end. In the above code, we are saying that we want to hook into some methods in the SpringBoard class.


**%orig**


When inside a method, the %orig command will call the original method. You can even pass arguments to the command like this %orig(arg1,arg2). One thing to note is, if you don’t call %orig, the original method will never be called. So, if you hook SpringBoard’s init command and fail to call %orig, SpringBoard will never start and your phone will be unusable until you delete your app via ssh.


#### Hooking Into Springboard


Open up Tweak.xm and add the following code. Don’t worry, I will explain it afterwards.




```
<code class=’objc’>#import <SpringBoard/SpringBoard.h>
%hook SpringBoard


-(void)applicationDidFinishLaunching:(id)application {
%orig;



```
UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Welcome" 
    message:@"Welcome to your iPhone Brandon!" 
    delegate:nil 
    cancelButtonTitle:@"Thanks" 
    otherButtonTitles:nil];
[alert show];
[alert release];

```

}


%end</code>


```


OK, so what’s going on here. First, we import the Springboard.h header. This will allow us access to springboard. Next, we tell the preprocessor to hook into the Springboard class.


The method that we are overriding here is the applicationDidFinishLaunching: method. This will of course fire right when SpringBoard starts up. Notice that we make the %orig call. If we omit this, our phone would never boot up properly as SpringBoard needs it’s initialization method.


Finally, we just throw up a UIAlertView. Again, not too exciting, but you get the point.


#### Adding Additional Frameworks


If you were to type build to build this project at this point you would see an error like this:




```
<code class=’bash’>Tweak.xm: In function ‘objc_object* $_ungrouped$SpringBoard$init(SpringBoard*, objc_selector*)’:
Tweak.xm:6: error: declaration of ‘objc_object* self’ shadows a parameter</code>
```


This is because we depend on the UIKit framework to show alerts. In order to tell theos that we want to link in UIKit, we must create an addition to the Makefile. Add the following line to your Makefile.




```
<code class=’bash’>WelcomeWagon_FRAMEWORKS = UIKit</code>
```


This will ensure that UIKit gets linked in.


#### Building, Packaging, And Installing


In the terminal, cd into your project’s directory. At this point, you can type make to simply build your project. Theos has provided a nice way to automatically install your library on your device. In order for it to work you must have the THEOS\_DEVICE\_IP environment variable set to your iPhone/iPod’s IP address. This is explained in the [previous tutorial](http://brandontreb.com/beginning-jailbroken-ios-development-building-and-deployment/).


In the terminal type:




```
<code class=’bash’>make install</code>
```


This will build your tweak and install it on your device. When prompted to enter your password, the default is “alpine”. Also, make sure that SSH is installed on your device.


After installation, your device will respring and you will be greeted with your custom message like this:


![Jailbroken App Development](/uploads/2011/IMG_0001.PNG)


#### Conclusion


You should now have a basic understand of how to patch any method inside of iOS. With this knowledge, you can customize ANYTHING that you don’t like about the device. If you have any questions or comments, feel free to leave them in the comments section of this post.


You can download the source code for this tutorial [here](http://cl.ly/1u0l0U0y2I0T1g2s3D0O).


Happy Jailbreaking!


***﻿﻿This post is part of [iDevBlogADay](http://idevblogaday.com/), a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the [web site](http://idevblogaday.com/), [RSS feed](http://feeds.feedburner.com/idevblogaday), or [Twitter](http://twitter.com/#search?q=%23idevblogaday).***



[Tweet](http://twitter.com/share)


