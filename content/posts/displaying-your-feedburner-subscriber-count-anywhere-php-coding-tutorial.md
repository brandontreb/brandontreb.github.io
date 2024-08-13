---
date: 2009-08-10T00:00:00-0600
slug: displaying-your-feedburner-subscriber-count-anywhere-php-coding-tutorial
title: "Displaying Your FeedBurner Subscriber Count Anywhere &#8211; PHP Coding Tutorial"
type: post
post_type: note
photos:
- /uploads/2009/feedburner-logo1.png "feedburner-logo1"
- /uploads/2009/brandontreb?bg=99ccff&fg=444444&anim=0
- /uploads/2009/awareness_api.jpg "awareness_api"
tags:
- Articles
---

[![feedburner-logo1](/uploads/2009/feedburner-logo1.png "feedburner-logo1")](http://feedburner.com)

If you are a serious blogger (and I’m sure you are), you probably track your RSS subscribers with [FeedBurner](http://feedburner.com). If you don’t, you should be. One thing that has always bugged me about FeedBurner is if you ever wanted to display the number of subscribers on your blog, you were stuck using their image. The image looks like this:


[![](/uploads/2009/brandontreb?bg=99ccff&fg=444444&anim=0)](http://feeds.feedburner.com/brandontreb)


I’m sure you have seen this logo everywhere. Well, not too many people know it, but FeedBurner actually has a very simple API that allows you to just get the subscriber count so you can display it however you would like.


So rather than being limited to this boring icon, you can display your live subscriber count anywhere on your blog. If you are feeling adventurous, you could even super impose it on to your own custom image using the GD library (tutorial to come if sufficient interest, post in the comments if you would like to see it).


Let’s get started…


## 1. Activate the Awareness API Inside Of Feedburner


Log in to FeedBurner. Click the **Publicize** tab and the click **Awareness API**. Finally, click **Activate**. The service is now enabled.


[![awareness_api](/uploads/2009/awareness_api.jpg "awareness_api")](http://brandontreb.com/wp-content/uploads/2009/08/awareness_api.jpg)


## 2. Write The PHP Code To Interface With FeedBurner


There is a lot of data that you could potentially get from FeedBurner, but the code below will just show you how to get your **subscriber count**.


All you need to do is make a simple GET request using CURL to the URL <https://feedburner.google.com/api/awareness/1.0/GetFeedData?uri=brandontreb> . Of course replacing **brandontreb** with your feed’s name.




```
<code class=’php’><?php
$url = “<https://feedburner.google.com/api/awareness/1.0/GetFeedData?uri=brandontreb>”;
$ch = curl\_init();
curl\_setopt($ch, CURLOPT\_RETURNTRANSFER, 1);
curl\_setopt($ch, CURLOPT\_URL, $url);
$data = curl\_exec($ch);
curl\_close($ch);  

if ($data) {
echo $data;
preg\_match(‘/circulation="([0-9]+)"/’,$data, $matches);
if ($matches[1](http://feedburner.com) != 0) {
$subscriberCount = $matches[1](http://feedburner.com);
}
}


echo “Join the other $subscriberCount people and subscriber to my RSS feed.”


?></code>


```


This code is pretty straight forward with a little trickiness to parse the XML. We first make a [CURL](http://us3.php.net/curl) connection to the URL. Just replace **brandontreb** with the title of your RSS feed inside of FeedBurner.


Next we print the data. Note: You won’t see the data in your browser unless you do a **view source**. Since it is XML, your browser will treat it like HTML and not display it. So, we do a [preg\_match](http://us3.php.net/manual/en/function.preg-match.php) for the element **circulation** and get it’s value. (Pretty sick right?). The value of our **subscriber count** will be at index 1 of the matches array.


Then, we just print the subscriber count and voila!


Now, you are no longer a slave to that generic FeedBurner subscriber count icon. Be sure to [check out their API](http://code.google.com/apis/feedburner/awareness_api.html) for other cool things that you can do with their web services. If you have any questions, feel free to leave them in the comments section of this post. Happy Coding!



[Tweet](http://twitter.com/share)


