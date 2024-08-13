---
date: 2012-01-19T01:00:00-0600
slug: fluid-for-mac
title: "Fluid For Mac"
type: post
post_type: note
photos:
- /uploads/2012/dock_large.png
tags:
- Uncategorized
---
As of OSX Lion, I have started to seriously loathe some of the build-it Mac apps (such as Mail, and iCal). While I previously had no issues with them, they now seem to be very clunky and crash quite often. Being a developer, I thought “why don’t I write an app that wraps web apps for you so you basically get “native web apps” that have icons and are launchable?”.


After a quick Google search, I realized **[this already exists!](http://fluidapp.com/)**. The app is called Fluid and it does an incredible job of what I described above and more.


![](/uploads/2012/dock_large.png)
Here are the feature highlights.


* Create a “native” Mac app for any web app
* Custom icon for each “native” app you create
* Full screen mode
* User scripps. These are my favorite. They allow you to update the badge count based on information in the browser. See below for a sample user script.


**Sample User Script For Twitter**




```
<code class=’javascript’>(function () {
        if (window.fluid) {
            setInterval(function updateBadge() {
                var counts = /\d+/.exec(document.title);
                if (counts && counts[0] > 0) {
                    window.fluid.dockBadge = counts[0] > 99 ? ‘99+’ : counts[0];
                } else {
                    window.fluid.dockBadge = ”;
                }
            }, 2000);
        }
    })();</code>
```


[Source](http://userscripts.org/scripts/review/88425)


Fluid is free with some minimal features, but I urge you to drop the $4.99 to gain full screen mode and user scripts. It’s well worth it. I am not affiliated with them in any way, just a happy customer.


[Download Fluid](http://fluidapp.com/)



[Tweet](http://twitter.com/share)


