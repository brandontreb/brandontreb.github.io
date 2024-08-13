---
date: 2011-11-29T01:00:00-0600
slug: tether-your-iphone-without-jailbreaking-or-paying-for-it
title: "Tether Your iPhone Without Jailbreaking (Or Paying For It)"
type: post
post_type: note
photos:
- /uploads/2011/screen12.png "iProxy"
tags:
- Uncategorized
---
![](/uploads/2011/screen12.png "iProxy")
With all of the buzz around the [iTether](http://tether.com) App, I figured I’d offer a more permanent solution since Apple will surely yank this soon


Last year, a developer published his code for an http [SOCKS](http://en.wikipedia.org/wiki/SOCKS) proxy called iProxy. This will give your iPhone the ability to create a SOCKS server in which your laptop can connect to via the Bonjur protocol.


Once connect, all of your computer’s http traffic will be routed through the server on your iPhone essentially giving you **free tethering**. Since this isn’t using the iPhone’s built-in tethering method, I’d assume At&t could not detect it\*. After looking at the code, it becomes pretty obvious how the SOCKS proxy works and makes me kick myself that I didn’t write it (or find this code sooner).


The [setup](https://github.com/tcurdt/iProxy/wiki/Configuring-iProxy) is a little complex, but you only need to do it once. I would love to hear in the comments if any of you has had some experience with this. I will also share my own as soon as I can get it installed later today.


Download the project over at [github](https://github.com/tcurdt/iProxy).


Happy Coding!


\*This has not been verified by me



[Tweet](http://twitter.com/share)


