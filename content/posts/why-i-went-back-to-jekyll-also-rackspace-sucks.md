---
date: 2012-01-03T01:00:00-0600
slug: why-i-went-back-to-jekyll-also-rackspace-sucks
title: "Why I Went Back To Jekyll &#8211; Also Rackspace Sucks"
type: post
post_type: note
photos:
- /uploads/2012/frownie.png
tags:
- Uncategorized
---
Recently, I was pretty humbled when a post of mine titled [WordPress To Jekyll And Back Again](http://brandontreb.com/wordpress-to-jekyll-and-back-again/) made it to the front page of Hacker News. I was a little down on Jekyll for the reasons listed in that post and was feeling pretty good about my WordPress install.


At the time, I was running my own virtual instance on Rackspace cloud hosting (we’ll get to this momentarily). I also had all of the caching and optimization plugins installed and welcomed the Hacker News traffic.


As you can imagine, the influx of HN traffic crashed the server multiple times and I was (with good reason) mocked in the comments (“must be because he’s ‘back to WordPress’”). So, I asked for advice and further “beefed up” my setup switching from Apache to Nginx, upping the ram, and switching caching plugins. WordPress is a beast and hard to optimize. That’s not even the kicker as to why I switched away.


#### A Call From Rackspace…


About a month ago, I realized my blog was down. I figured that it might have been that I was featured somewhere else which was crashing it (again I was rolling my eyes at WordPress). But then, I got a call and email from a *very* helpful Rackspace employee. The email went like this:



> 
> Despite the very best efforts of or our Engineering and Datacenter Operations Teams, unfortunately the host machine that your cloud server ‘Websites’ resides on was not able to be recovered. At this point, we are looking at complete data loss.
> 
> 
> 


and… Rackspace, in this poorly phrased email, was basically like. “Well, sucks to be you, hope you had a backup!”. Well, I admit this is partially my fault for not having a backup as I am a bit of a n00b when it comes to server admin, but I had been hosting for years on (don’t judge me) GoDaddy before that and a couple years on Rackspace. I had no idea that hosting companies didn’t have backups of their own. It would seem that this might be crucial to their business.


Needless to say, I lost everything including a jewelry site that I ran (not many sales), an iPhone leaderboard site (not very popular), 2 of my buddies WordPress blogs, and my current WordPress blog.


#### Jekyll To The Rescue


I was pretty angry at Rackspace and myself for never making a backup, but then it hit me that *most* of my posts had been converted to Jekyll and were backed up in a github repository. I was able to restore my blog within a few minutes (now hosted on GitHub) and recover the WordPress posts from the [Feedburner cache](http://feeds.feedburner.com/brandontreb) of my site.


As for my buddies’ sites… I feel for them ![:(](/uploads/2012/frownie.png)


#### New List Of Why Jekyll Is Awesome


* **Automatically backed up** – This is huge. If not for switching to Jekyll at one point, I would have lost **years** worth of content. If you have every tried to back up WordPress, it’s a huge frackin pain since the database dump usually gets HUGE.
* **Free To Host** – I’m not sure why I was so stubborn about doing my own hosting. I am now hosting on [GitHub](https://github.com/brandontreb/brandontreb.github.com) and it couldn’t be more stable and fast.
* **Mobile Blogging** – This was my largest gripe about Jekyll. I was jealous that I couldn’t blog from my iPhone like WordPress users. Well, I have found a pretty decent solution (tutorial to follow), which involves a combo of Prompt, Screen, and Vim.
* **Content Oriented** – WordPress makes it super easy to dump tons of images into your posts. While blogging with Jekyll (inside of Vim in my case), it’s a little bit more of a pain to add your own images. That being said you must be choosy forcing you to focus more on the content and less on using visual crutches.
* **Blog Anywhere** – This was another limitation I was placing on Jekyll in my last post. However, I just wasn’t using Jekyll to its full potential. I was building my site locally and rsyncing it up to my server. This process was a little tedious and discouraged me from writing many new posts. Now, hosting with github, posting is as simple as a quick push to the repo.
* **Ninja Fast** – This one should be obvious.


#### Conclusion


I am quite happy blogging with Jekyll. As far as I’m concerned there is no reason to ever host my own blog again (as long as Github doesn’t ditch pages 😉 ). Also, if you currently have stuff on Rackspace, **go make a backup now** (or ditch them altogether). Thanks for reading and [look out](http://feeds.feedburner.com/brandontreb) for my next post about mobile blogging with Jekyll.


Happy Blogging!



[Tweet](http://twitter.com/share)


