---
date: 2009-11-16T01:00:00-0600
slug: php-class-to-interface-with-many-url-shortening-services
title: "PHP Class To Interface With Many URL Shortening Services"
type: post
post_type: note

tags:
- Articles
---
With the explosion of Twitter and such services, the need to have long URLs shortened has drastically increased. Naturally, many services to shorten URLs have sprung up as well.


Most of these services (that are worth using), have some sort of API that will allow developers to send a long URL to them, have it shortened and then returned. This type of service allows other developers to write applications that have the ability to shorten URLs right inside of them.


Recently, I had to write a PHP class to work with URL shorteners. So, I made it support multiple shortening services and have decided to share it with you.


The class is called [URLShortener.class.php](http://brandontreb.com/wp-content/uploads/2009/11/URLShortener.class.php_1.zip) and it supports the following shortening services:


* [j.mp](http://j.mp) ([bit.ly](http://bit.ly))
* [tr.im](http://tr.im)
* TinyURL
* [is.gd](http://is.gd)
* [u.nu](http://u.nu)
* Linkyy
* Your own custom shortening service


Here are some examples of how to use the class in your own applications:




```
<code class=’php’><?php
     /* Basic: */
     $s = new URLShortener(‘tr.im’);
     echo $s->shorten("http://brandontreb.com");

```
 /* Using API Key and Login */
 $s = new URLShortener(‘j.mp’);
 $s-&gt;login = ‘brandontreb’;
 $s-&gt;APIKey = ‘R_2a413ebd15254a72b500ec2ce83f982d’;
 echo $s-&gt;shorten("http://brandontreb.com");
/\* Custom URL \*/
// Just make sure you put %s and it will be
// replaced with the long URL
$s = new URLShortener(‘custom’,
‘[http://b1t.me/api/shorten.xml/%s’](http://b1t.me/api/shorten.xml/%25s%E2%80%99));
echo $s-&gt;shorten("<http://brandontreb.com>",false);



```

?></code>


```


You may download my URLShortener PHP class [here](http://brandontreb.com/wp-content/uploads/2009/11/URLShortener.class.php_1.zip).


Feel free to leave any questions or comments in the comments section.



[Tweet](http://twitter.com/share)


