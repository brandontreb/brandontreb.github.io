---
date: 2009-07-28T00:00:00-0600
slug: creating-a-twitter-client-in-objective-c-client-part-2
title: "Creating A Twitter Client In Objective-C Client Part 2"
type: post
post_type: note
photos:
- /uploads/2009/screenshot_16.png "screenshot_16"
- /uploads/2009/screenshot_17.png "screenshot_17"
- /uploads/2009/screenshot_03.jpg "screenshot_03"
- /uploads/2009/screenshot_01.jpg "screenshot_01"
tags:
- Mac
---
## This tutorial has moved! I have updated it to support Twitter’s Oauth, you can find the first tutorial in there series by clicking the link below


## [Creating A Twitter Client For OSX – Part 1](http://brandontreb.com/creating-a-twitter-client-for-osx-part-1/)


This is part 2 in our series about creating a Twitter client in Objective-C. In case you missed it, here is a [link to part 1](http://brandontreb.com/objective-c-programming-tutorial-creating-a-twitter-client-part-1/) of this series.


In the last tutorial I showed you how to retrieve data from Twitter and display the XML in the Console. Today, we will be focusing on sending messages to Twitter via [POST](http://en.wikipedia.org/wiki/POST_(HTTP)). We will be implementing the code to update our Twitter status. So let’s just dig right in.


## 1. Updating The TwitterRequest Header File


Open up TwitterRequest.h and add the following code (Click the image to enlarge)


[![screenshot_16](/uploads/2009/screenshot_16.png "screenshot_16")](http://brandontreb.com/wp-content/uploads/2009/07/screenshot_16.png)


We have added two properties. The first **isPost** will be true when we are calling a method that requires a POST to Twitter. This will be methods such as update\_status, follow, etc… Next, the variable **requestBody** will hold the POST arguments that will be sent to Twitter. These will be things such as status text or friend id.


Finally, we will be adding a method called **statuses\_update**. The reason I named it this is because that is what the method is called in the [Twitter API](http://apiwiki.twitter.com/Twitter-API-Documentation). Like our **friends\_timeline** method, it takes a delegate and selector to call when the request is complete.


**Important:** I didn’t highlight this in the screenshot but make sure you change **theRequest** from an **NSURLRequest** to **NSMutableURLRequest**. It will give us some additional methods to set up the POST.


## 2. Updating The Twitter Request Class


Open up \*\*TwitterRequest.m \*\*and add the following code (Click the image to enlarge):


[![screenshot_17](/uploads/2009/screenshot_17.png "screenshot_17")](http://brandontreb.com/wp-content/uploads/2009/07/screenshot_17.png)


I’ll start by explaining the **status\_update** method. We first set the global **isPost** property to true. This will tell the request method to make a POST. The next 2 lines set the callback stuff as we did before. The only new line here is setting the **requestBody** variable. This is just a string that looks like “status=new twitter status”.


The addition to the \*\*request \*\*method is what will allow us to POST to Twitter. First, we check if the **isPost** property is set. This will be true if **request** is called from our \*\*status\_update \*\*method. Next, we call the **setHTTPMethod** of the request to POST. This is pretty obvious.


The following line let’s Twitter know the type of data that we are sending to it. Next, we call **setHTTPBody** to set the body of the request. At some point we will want to URL Encode this string, but that will be for a different tutorial. Just don’t use any special characters such as & and = in your update to Twitter right now. All that is happening on this line is we convert the string to NSData using the \*\*dataUsingEncoding \*\*method of NSString and set it to the HTTPBody.


The last line just sets the Content-Length property to the length of our string. This is needed to correctly do a POST.


## 3. Calling The statuses\_update Method To Update Your Twitter Status


Open up **ApplicationDelegate.m** and add the following code (click the image to enlarge):


[![screenshot_03](/uploads/2009/screenshot_03.jpg "screenshot_03")](http://brandontreb.com/wp-content/uploads/2009/07/screenshot_03.jpg)


One thing to notice here is I commented out the line to get the friends timeline. This is because having both requests running at the same time with the same request object could cause conflicts. The best way to approch this to create an entirly new TwitterRequest object. I just wanted to keep it short.


This is pretty straight forward. We call the **statuses\_update** method the same way we called the **friends\_timeline** method except pass in the update text. The information received back from Twitter will look something like this:


[![screenshot_01](/uploads/2009/screenshot_01.jpg "screenshot_01")](http://brandontreb.com/wp-content/uploads/2009/07/screenshot_01.jpg)


It’s basically all of your personal profile information.


That’s it for today. If you have any comments or questions, feel free to leave them in the comments of this post or [write me on Twitter](http://twitter.com/brandontreb). You can also download the source for this version below.


[Twitter Mac Client Tutorial 2 – Source](http://brandontreb.com/wp-content/uploads/2009/07/Chirpie1.zip)


Happy Coding!



[Tweet](http://twitter.com/share)


