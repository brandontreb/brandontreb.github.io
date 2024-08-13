---
date: 2011-11-16T01:00:00-0600
slug: caterpillar-hd-now-in-the-app-store-tutorial-series-to-follow
title: "Caterpillar-HD Now In The App Store: Tutorial Series To Follow"
type: post
post_type: note

tags:
- Uncategorized
---
I have just released the update to my Centipede clone called [Caterpillar](http://itunes.apple.com/us/app/caterpillar-hd/id479439790?mt=8). For those of you who don’t know, I am doing a 6 part series on how to create this game over at [MobileTuts+](http://mobile.tutsplus.com/tutorials/iphone/building-a-caterpiller-game-with-cocos2d/).


This update adds some interesting functionality on which I will be blogging about in the near future.


I have added iAds to my cocos2D project and when the iAds fail to serve (which is about 75% of the time), I replace them with Admob ads. This was achieved by creating a new Admob ad view inside of the `bannerView:didFailToReceiveAdWithError:` delegate method.


I will either post a full tutorial about doing this Here or on Mobile Tuts. Either way, I’ll keep you posted.


Also, be sure to [download the game](http://itunes.apple.com/us/app/caterpillar-hd/id479439790?mt=8), test it out, and lemme know if you have suggestions. Version 1.1 addressed quite a few issues from feedback (namely poor controls).


Happy coding!



[Tweet](http://twitter.com/share)


