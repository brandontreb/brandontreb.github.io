---
date: 2009-02-27T01:00:00-0600
slug: the-only-twitter-api-php-class-you-will-ever-need
title: "The Only Twitter API PHP Class You Will Ever Need"
type: post
post_type: note
photos:
- /uploads/2009/twit.png "twit"
tags:
- Articles
---
[![twit](/uploads/2009/twit.png "twit")](http://brandontreb.com/wp-content/uploads/2009/02/twit.png)


****Note**** **Twitter has switchted their entire interface to use OAUTH and this class no longer works (I should probably change the title hahaha). I will post an oauth connection tutorial in the near future, so make sure to **[**subscribe to my RSS feed**](http://feeds2.feedburner.com/brandontreb)** for all of the sweet sweets updates!**


**Cheers!**


So, I started writing a Twitter API Programming series last week… [Here is part 1](http://brandontreb.com/twitter-api-programming-tutorial-with-php-getting-started/). I have found that there is not much else to teach when it comes to interfacing with Twitter. Basically, we just need to implement all of the Twitter functions.


I have taken it upon myself to create a fully functional **Twitter API PHP class**. It has every Twitter function you will ever need (less the direct messages). I have also fully documented it with comments directly from the Twitter API so that the functions are easy to understand. Here is how you would use the class. The first parameter of every function is the return type. For Twitter it can be either xml, json, or rss for some functions.




```
<code class=’php’>include("Twitter.class.php");
    $twitter = new Twitter();
    $twitter->username = "twitteruser";
    $twitter->password = "twitterpass";
    // Show public timeline
    echo $twitter->public_timeline();
    // Update your status
    echo $twitter->update(‘xml’,’This PHP class is flippin sweet!’);
    // Start following a user
    echo $twitter->create(‘xml’,’brandontreb’);</code>
```


These are just 3 of the functions implemented in this class. The full function list includes:


* public\_timeline
* friends\_timeline
* user\_timeline
* update
* replies
* friends
* followers
* show
* create
* destroy
* exists


All of these functions are fully documented and simple to use. You can also check out Twitter’s API [here](http://apiwiki.twitter.com/REST+API+Documentation) (but you shouldn’t need to).


So, now you can fully \*\*integrate Twitter into any PHP application you create! \*\*


### Download The PHP Twitter Class here [Twitter.class.php](http://brandontreb.com/wp-content/uploads/2009/02/Twitter.class.php1.zip)


Also, make sure you [subscribe to my RSS feed](http://feeds2.feedburner.com/brandontreb). More great programming tutorial to come.



[Tweet](http://twitter.com/share)


