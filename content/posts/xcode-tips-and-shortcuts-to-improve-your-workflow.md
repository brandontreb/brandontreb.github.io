---
date: 2010-11-18T01:00:00-0600
slug: xcode-tips-and-shortcuts-to-improve-your-workflow
title: "XCode Tips And Shortcuts To Improve Your Workflow"
type: post
post_type: note
photos:
- /uploads/2010/Xcode%20Shortcuts.png "XCode Shortcuts"
- /uploads/2010/Screen-shot-2010-11-18-at-8.14.35-AM.png "Screen shot 2010-11-18 at
  8.14.35 AM"
tags:
- Articles
---
#### Intro


This is my first [#iDevBlogADay](http://idevblogaday.com) post and I wanted to give a quick intro before jumping in. My name is Brandon Trebitowski and I’m a software developer and author from Albuquerque, New Mexico. I graduated from the University of New Mexico in 2008 with a bachelors degree in computer science. For the past 2 years, I have been writing mobile applications (primarily for the iPhone) for [ELC Technologies](http://elctech.com/).


I also started <http://icodeblog.com> and currently write on it about once a month.


#### A Post On XCode Shortcuts?


[![](/uploads/2010/Xcode%20Shortcuts.png "XCode Shortcuts")](http://www.1729.us/xcode/Xcode%20Shortcuts.png)Well, I’m sure by now, you have seen countless [infographics and “cheat sheets”](http://www.1729.us/xcode/Xcode%20Shortcuts.png) chock full of XCode shortcuts, tips, etc… These can be great resources, however, if you are anything like me, you see these, tweet the link, and move on never looking at them again. The only difference between these and the XCode key-bindings menu IMHO is a fancy background. So, I thought I would share some of the most important shortcuts that I have adopted to really improve my workflow. We spend so much time inside of XCode, it is worth the time to learn some of these.


#### Build Commands


By now, I would hope that you don’t click the “Build and Go/Debug” with your mouse whenever you want to run your application. If you do, no worries, here are some of the build quick keys.


\*\*⌘ return – \*\*This builds and launches the application in debug mode.  

\*\*shift ⌘ return \*\*– Kills the running application in the simulator.  

\*\*shift ⌘ k – \*\*Cleans the build target.  

\*\*shift ⌘ a – \*\*Build and Analyze. This is quite possible the most important command to learn. This invokes the static analyzer to help spot memory issues in your code. Run this as early and often as possible.


My general workflow after writing a bit of code is to kill the last run, clean, analyze (hopefully not spend time on memory issues), and then build and debug. These 4 commands in sequence are much faster than searching out the menu items for each of those commands.


#### File Management and Navigation


Navigating around files is one of the most common tasks you will perform in XCode. It is really to your advantage to speed things up.


**option ⌘ ↑** – This quickly switches between your .h and .m file.  

\*\*⌘ ↑ – \*\*Move to the top of the file  

\*\*⌘ ↓ – \*\*Move to the bottom of the file ![](/uploads/2010/Screen-shot-2010-11-18-at-8.14.35-AM.png "Screen shot 2010-11-18 at 8.14.35 AM")  

\*\*shift ⌘ d – \*\*This was recently showed to my by [@cruffenach](http://twitter.com/cruffenach) and it has drastically sped up my workflow. This is the command for “Open Quickly”. It brings up a small window with a search box at the top. Typing in the box instantly searches your project and allows you to quickly open up files by pressing return on the selected file. I can’t believe I had been using XCode for so long before I found out about this command.


#### Binding Your Own Quick Keys


Some commands simply don’t have quick keys. For example, I constantly use the **Edit -> Sort -> By Name** command to sort my source files alphabetically. By default, you must click through all of the menus and select the command to get it to work. However, XCode (like most OSX applications) will allow you to define your own quick keys and here’s how.


1. Open up the XCode Preferences
2. Click on the Key Bindings tab
3. Navigate to the command that you want to bind keys for. (hint: they are organized the same way they in the top menu)
4. Once you have found the command, double click in the Key column
5. Press the keys that you wish to bind (I bound **option shift ⌘ s** for sorting)
6. If there are any conflicts, XCode will let you know. Otherwise, press apply and you’re good to go.


#### Wrap Up


Well, this concludes my relatively short first post for [#idevblogaday](http://idevblogaday.com). If you have any shortcuts of your own that you can’t live without, please share them in the comments. I’m always up to improve my workflow.


Thank you to everyone (especially [@mysterycoconut](http://twitter.com/mysterycoconut)) for allowing me to be a part of this community and I look forward to sharing my knowledge and experiences with you.


Happy Coding!



 —-




***﻿﻿This post is part of [iDevBlogADay](http://idevblogaday.com/), a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the [web site](http://idevblogaday.com/), [RSS feed](http://feeds.feedburner.com/idevblogaday), or [Twitter](http://twitter.com/#search?q=%23idevblogaday).***





[Tweet](http://twitter.com/share)


