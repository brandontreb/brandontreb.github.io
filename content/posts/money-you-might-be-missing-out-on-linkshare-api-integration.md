---
date: 2009-11-12T01:00:00-0600
slug: money-you-might-be-missing-out-on-linkshare-api-integration
title: "Money You Might Be Missing Out On &#8211; LinkShare API Integration"
type: post
post_type: note
photos:
- /uploads/2009/logo.gif "logo"
tags:
- Articles
---

[![logo](/uploads/2009/logo.gif "logo")](http://linkshare.com)

As you may know, I am the developer of the site [FreshApps.com](http://freshapps.com). One thing we had been doing to make some extra money is to use [Linkshare](http://linkshare.com) to be an affiliate for Apple.


If you don’t know, [Linkshare](http://linkshare.com) is a service that allows you to become an affiliate of thousands of companies. You simply select one of the companies products, get the linkshare link, and put the link on your site. Now, every time someone clicks that link and makes a purchase, you will get a percentage of the revenue.


## The Problem


The only problem was, we have thousands of apps and converting the links manually seemed like such a daunting process. So, as you can imagine we converted around 10 links and never looked at it again.


Well, earlier today, the designer of the site [JJ Mancini](http://vanillahd.com), asked me to check and see if linkshare had an API. I checked it out and sure enough, they did and it was no more complex than interfacing with a URL shortening service. So, I wrote the script and within minutes, all of our downloads links were converted into something that can now make us some revenue.


## The Solution


Now that I have created the script, I figured I would pretty it up and share it with you. Keep in mind, the script is stupid easy, so if I am insulting your intelligence by showing it, I apologize.





|  |
| --- |
| 
```
<?php
    /\* linkshare.php \*/
 
    // Your linkshare API token
    $token = "89705XXXXd11ab28ae548bXXXX4ad6475279faXXXX65da0ec8ed77XXXXeb067";
    // Apples Merchant ID
    $mid   = "13508";
 
    $linkShareLinks = array();  
 
    // I assume links in an array of links to the app store
    foreach($links as $link) {
        $linkShareURL = "http://feed.linksynergy.com/createcustomlink.shtml?".
            "token=$token∣=$mid&murl=$link&mt=8&buylink=yes";
        $linkShareReturn = file\_get\_contents($linkShareURL);
 
        if(stristr($linkShareReturn, "click.linksynergy.com")) {
            array\_push($linkShareLinks,$linkShareReturn);
        } 
    }
 
    print\_r($linkShareLinks);
?>
```
 |



And that’s it! The variable $linkShareLinks will now contain all of the App Store links converted to your account’s linkshare url. If you have any site with that contains ads for apps in the app store (review site, developer blog, etc…), you would be crazy not to integrate with linkshare.


Give it a try, and feel free to ask questions in the comments section.



[Tweet](http://twitter.com/share)


