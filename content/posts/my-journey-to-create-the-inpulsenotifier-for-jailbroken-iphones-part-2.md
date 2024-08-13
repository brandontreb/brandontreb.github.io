---
date: 2011-04-13T00:00:00-0600
slug: my-journey-to-create-the-inpulsenotifier-for-jailbroken-iphones-part-2
title: "My Journey To Create The inPulseNotifier For Jailbroken iPhones &#8211; Part 2"
type: post
post_type: note

tags:
- iPhone
---
This post is a continuation from my previous post [found here](/my-journey-to-create-the-inpulsenotifier-for-jailbroken-iphones-part-1/).


#### A MobileSubstrate Tweak?


After I completed a basic app that allowed me to send various notification types from my iPhone to my inPulse watch, I quickly realized that this would not work if I wanted to hook into the iPhone’s notification system. A Google search revealed to me that I had to make MobileSubstrate hack to overwrite the default notification functionally.


\*\* What the heck is Mobile Substrate? \*\*


Here is the description according to [iPhoneDevWiki.net](http://iphonedevwiki.net/index.php/MobileSubstrate).



> 
> MobileSubstrate is the de facto framework that allows 3rd-party developers to provide run-time  
> 
> patches (“MobileSubstrate extensions”) to system functions, similar to Application Enhancer on  
> 
> the OS X. MobileSubstrate consists of 3 major components: MobileHooker, MobileLoader and safe mode.
> 
> 
> 


Basically, it allows you to “hook” into any method of any class on the iPhone. I will talk in a later tutorial about how to see what methods are available. Here is a sample for hooking into the CFShow() method:




```
<code class=’objc’>static void (*original_CFShow)(CFTypeRef obj);  // a function pointer to store the original CFShow().
void replaced_CFShow(CFTypeRef obj) {           // our replacement of CFShow().
  printf("Calling original CFShow(%p)…", obj);
  original_CFShow(obj);                         // calls the original CFShow.
  printf(" done.\n");
}
…
// hook CFShow to our own implementation.
MSHookFunction(CFShow, replaced_CFShow, &original_CFShow);
// From now on any call to CFShow will pass through replaced_CFShow first.
…
CFShow(CFSTR("test"));</code>
```


Yeah… this looks pretty intense. Luckily, I found a super helpful tool that greatly simplifies this process called [theos](http://iphonedevwiki.net/index.php/Theos/Getting_Started). Check out my [tutorial on getting started with theos](/beginning-jailbroken-ios-development-getting-the-tools/).


What lead me to theos was the incredible work of [Peter Hajas](http://www.peterhajas.com/). He wrote and [open sourced](https://github.com/peterhajas/MobileNotifier) his fantastic notifications app called Mobile Notifier. Without it, I would have been dead in the water. After chatting downloading his code and nagging him on [Twitter](https://twitter.com/#!/peterhajas), he pointed me to theos.


#### Working With theos


As I mentioned in [my tutorial](/beginning-jailbroken-ios-development-getting-the-tools/), theos is a great tool to aid in the development of a Mobile Substrate Tweak. Instead of the complexities above to hook into the functionality of classes, you simply do something like this:




```
<code class=’objc’>%hook SpringBoard
-(void)applicationDidFinishLaunching:(id)application
{  

%orig;



```
INPreferenceManager *preferenceManager = [[[INPreferenceManager alloc] init] autorelease];
BOOL enabled = [[preferenceManager.preferences valueForKey:@"inpulseEnabled"] boolValue];
if(enabled) {
    manager = [[INAlertManager alloc] init];
    [manager connectToWatch];
}

```

}


* (void) dealloc {
[manager release];
manager = nil;
%orig;
}


%end;</code>


```


This is a simple hook that allows me to overwrite the functionality of Springboard’s applicationDidFinishLaunching method. [DHowett](https://twitter.com/#!/dhowett) (creator of theos), has done a brilliant job giving devs quite a few commands like %orig (which calls the original method) and %hook (starts a hook).


The reason this works is, the file you code in (called Tweaks.xm) gets run through a preprocessor called Logos (which he also wrote). It replaces these simple commands with the complex stuff you see above before compiling your project. Using this technique, you can hook into anything. I will have a tutorial on this in the very near future, so make sure you [subscribe to my RSS feed](feeds.feedburner.com/brandontreb) if you haven’t already.


#### Copy And Paste


OK, so I copied some of Peter’s code (he’s well cited in the source and I kept his license in the headers too). He had already solved the problem of capturing most of the iPhone’s notifications and this is precisely what I needed. So I Frankensteined my code and his to create the first version of [inPulseNotifier](https://github.com/brandontreb/inPulseNotifier).


This current version supports SMS, Push Notifications, Local Notifications, and Calendar Notifications.


#### Deployment


Even though I open sourced the code for the app, I couldn’t possibly expect users to build the code themselves and install it on their devices. So I had to learn about setting up my own Cydia repository.


A Cydia repository allows users to browse your applications/tweaks through the Cydia application [created by Saurik](http://www.saurik.com/). This is the method of choice for deploying jailbroken iPhone applications.


Saurik has a very detailed tutorial on creating a Cydia repository [here](http://www.saurik.com/id/7).


(In case you are wondering, my Cydia repo is hosted at <http://brandontreb.com/cydia> )


#### OK, How Do I Install It?


Great question I assume you might ask. I have written a tutorial about installing it on your iPhone [here](http://www.getinpulse.com/hack/forum/viewtopic.php?p=545#p545).


#### Plans For The Future


Well, at the moment development has slowed as I prepare for a few changes in my life. However, in the coming months, I intend on doing the following updates.


1. Remove the dependency on Insomnia for preventing the phone from sleeping. I have found a version of their source that I can integrate into my own code.
2. Add support for phone calls
3. Add support for emails
4. Create an SBSettings toggle to allow rapid enabling/disabling
5. Auto-reconnect after disconnecting from the watch


#### Conclusion


Hacking for the inPulse watch has been a new and exciting experience. The team over there has really created something special and I can’t wait to see what the future holds for them (hopefully a touchscreen).


I’d love to hear your thoughts in the comments. And [stay tuned](feeds.feedburner.com/brandontreb) for some jailbroken dev tutorials based on my experiences.


Happy Coding!



[Tweet](http://twitter.com/share)


