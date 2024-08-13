---
date: 2010-08-30T00:00:00-0600
slug: wordpress-for-iphoneipad-nsxmlparsererrordomain-error-64-resolved
title: "WordPress For iPhone/iPad NSXMLParserErrorDomain Error 64 Resolved"
type: post
post_type: note
photos:
- /uploads/2010/photo-333x500.png "photo"
- /uploads/2010/Screen-shot-2010-08-30-at-10.05.22-AM.png "Screen shot 2010-08-30
  at 10.05.22 AM"
tags:
- Wordpress
---
If you have a WordPress blog and an iPhone/iPad, then you most likely have the [WordPress for iOS](http://itunes.apple.com/us/app/wordpress/id335703880?mt=8) app. If you don’t, you [should](http://itunes.apple.com/us/app/wordpress/id335703880?mt=8).


Over the past couple of days, I have been receiving the following error when trying to add my blog to the iPhone app.


[![](/uploads/2010/photo-333x500.png "photo")](http://brandontreb.com/wp-content/uploads/2010/08/photo.png)


After scouring the internet, I found that this could be the result of a few issues.


* Special characters in a post body that are not supported by NSXMLParser
* Special characters in a comment
* Invalid post or comment RSS
* An error in a theme/plugin file


For me, this turned out to be an issue with the comments RSS feed. I loaded it up in the browser and long behold, even the browser threw an error. But what could be causing this? Turns out, I had left a space in a plugin that I created. This caused a space to be output at the beginning of the comments XML, causing it to error. Notice the space between ?> and <?php below. (Face Palm)


[![](/uploads/2010/Screen-shot-2010-08-30-at-10.05.22-AM.png "Screen shot 2010-08-30 at 10.05.22 AM")](http://brandontreb.com/wp-content/uploads/2010/08/Screen-shot-2010-08-30-at-10.05.22-AM.png)


After removing the space from this plugin, I loaded up WordPress for iPhone and it added my blog without a problem.


So, the take away from this is **don’t output spaces when you create a plugin.**


I hope this post has proven useful for you, I can’t imagine that I’m the only person with this issue 😉



[Tweet](http://twitter.com/share)


