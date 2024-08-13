---
date: 2010-11-25T01:00:00-0600
slug: promoting-your-other-apps-within-your-apps
title: "Promoting Your Other Apps Within Your Apps"
type: post
post_type: note
photos:
- /uploads/2010/frownie.png
- /uploads/2010/promo-500x333.png "promo"
- /uploads/2010/Screen-shot-2010-11-25-at-11.51.07-AM-500x266.png "Screen shot 2010-11-25
  at 11.51.07 AM"
tags:
- iDevBlogADay
---
First off, Happy Thanksgiving to my American readers. And a happy Thursday to everyone else. I’m sitting here on Thursday morning drinking coffee and eating Sticky Buns (kind of like gooey doughnuts). It’s been a hectic week of family and travel, so please forgive me if this is not the most verbose post.


Showing your other applications within each of your applications (wow, the word application is starting to lose meaning) can have a tremendous impact on your sales. It’s a great way to promote your other apps for free and will give them much more exposure across a wider audience. Moving all of the promotion logic out to the web allows you to dynamically add and remove apps from the view without updating your apps in the store.


[Insert Cool Graph Backing This Statement Up Here] //I’m not that cool yet ![:(](/uploads/2010/frownie.png)


We have seen this in many popular apps. Here is a screenshot from an iDevBlogADay veteran [Owen Goss](http://www.streamingcolour.com/blog/) promoting his other applications from inside of [LandFormer](http://www.streamingcolour.com/games/landformer/).


[![](/uploads/2010/promo-500x333.png "promo")](http://brandontreb.com/wp-content/uploads/2010/11/promo.png)


We are going to learn how to make something similar and I will provide you with a web template as well as the view controller to load it.


#### Download The Template


So, I’m sure there are a million more “elegant” ways to display your apps, but I went for super simple. So, 1337 web dev idevblogadayers, please go easy on me in the comments. Download the code below and look in the Web folder.


[Download The Code Files Here](http://brandontreb.com/wp-content/uploads/2010/11/promotion2.zip)


Here is a screenshot of what the template will look like:


[![](/uploads/2010/Screen-shot-2010-11-25-at-11.51.07-AM-500x266.png "Screen shot 2010-11-25 at 11.51.07 AM")](http://brandontreb.com/wp-content/uploads/2010/11/Screen-shot-2010-11-25-at-11.51.07-AM.png)


It will also work in portrait mode.


#### Upload The Template Files To Your Web Server And Replace My Sample Data


If you have your own website (which you probably should 😉 ), upload the template files to a subdirectory. If not, or you don’t want to waste bandwidth on it, you can always [host the files on Dropbox](http://wiki.dropbox.com/TipsAndTricks/HostWebsites).


Next, upload your icons (the template auto rounds the corners so you can just use the one’s bundled with your app) and replace my sample images with yours.


Finally, replace the URL’s with the URLs to your applications. You can also add/remove table cells to match the number of applications you are promoting.


#### Add The Promotion Code To Your iPhone App


Look in the iPhone folder from the unzipped file you downloaded above and copy the following 3 files into your project:


* PromotionViewController.m
* PromotionViewController.h
* PromotionViewController.xib


Check the box to copy them into your project folder when prompted.


We will now take a look at how to display the promotion view when a button is clicked.




```
<code class=’objc’>- (IBAction) moreAppsTouched:(id) sender {
    PromotionViewController *controller = [[PromotionViewController alloc]
        initWithNibName:@"PromotionViewController"
        bundle:[NSBundle mainBundle]];
    controller.promotionAddress = @"http://brandontreb.com/apps/idevblogaday/promotion.html";
    [self presentModalViewController:controller animated:YES];
    [controller release];
}</code>
```


Make sure you set controller.promotionAddress to the web address of your promotion.html file.


And there you have it! When the user tapps on a button it will display our promotion view modally and will load up your promo page. I have provided a sample application that pulls up the promotion view when a button has been clicked.


[Download The Sample App Here](http://brandontreb.com/wp-content/uploads/2010/11/PromotionTest1.zip)


If you have any questions or comments, feel free to leave them in the comments.


Happy Coding!



 —-




***﻿﻿This post is part of [iDevBlogADay](http://idevblogaday.com/), a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the [web site](http://idevblogaday.com/), [RSS feed](http://feeds.feedburner.com/idevblogaday), or [Twitter](http://twitter.com/#search?q=%23idevblogaday).***





[Tweet](http://twitter.com/share)


