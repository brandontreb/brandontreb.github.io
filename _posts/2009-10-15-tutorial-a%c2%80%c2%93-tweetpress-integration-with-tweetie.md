---
title: Tutorial â Tweetpress Integration With Tweetie
author: brandontreb
layout: post
permalink: /tutorial-a%c2%80%c2%93-tweetpress-integration-with-tweetie
dsq_thread_id:
  - 1417675146
categories:
  - Wordpress
---
<p style="text-align: center;">
  <a href="http://brandontreb.com/wp-content/uploads/2009/10/tweetiei2-large.png"><img class="alignnone size-full wp-image-544" title="tweetiei2-large" src="http://brandontreb.com/wp-content/uploads/2009/10/tweetiei2-large.png" alt="tweetiei2-large" width="180" height="180" /></a>
</p>

[Tweetpress][1] now supports the hugely popular iPhone Twitter client [T][2]witter for iPhone. Here are the steps to set it up:

## Configure TweetPress

  1. Set you blog permissions. As of version 2.0.2, Tweetpress requires that your wp-content directory is 777 during install. This is because Tweetpress needs to make a folder to store your images in. Once this folder is made, you can set the wp-content permissions back to 755. Just make sure the Tweetpress directory remains 777 (as well as the sub directory). If you change it back, Tweetpress might yell at you but it will still work as long as wp-content/tweetpress is writable (777). I hope to change this in the future.  
    [<img class="alignnone size-full wp-image-537" title="screenshot_03" src="http://brandontreb.com/wp-content/uploads/2009/10/screenshot_03.png" alt="screenshot_03" width="427" height="83" />][3]
  2. [Download][1] and install the TweetPress plugin on your WordPress site.
  3. Configure TweetPress. In your WordPress admin, navigate to Settings -> Tweetpress. 
      1. Select a page from the drop down for your gallery to appear on. If you don&#8217;t select a page, Tweetpress will try to use your homepage. You may want to create a separate &#8220;Gallery&#8221; page for the plugin to go on. Then select authentication type. You can select either: 
          1. none: anyone can post
          2. WordPress Login: validates on your wordpress username and password
          3. Twitter: Requires you to enter your twitter username and password both in the admin and in the Twitter client (note: this is no longer the recommended way for authentication, and you should use WordPress auth)
      2. [<img class="alignnone size-full wp-image-989" title="Screen shot 2010-10-28 at 7.46.22 AM" src="http://brandontreb.com/wp-content/uploads/2009/10/Screen-shot-2010-10-28-at-7.46.22-AM.png" alt="" width="403" height="161" />][4]
      3. If you selected Twitter Login (which you shouldn&#8217;t, but it&#8217;s here for legacy support) <span style="color: #ff0000;">Note</span>: Twittelator Pro ONLY supports WordPress login. 
          1. Add your Twitter username
          2. Add your Twitter password
          3. Click &#8220;Save Twitter settings&#8221;
          4. [<img class="alignnone size-full wp-image-539" title="screenshot_01" src="http://brandontreb.com/wp-content/uploads/2009/10/screenshot_01.png" alt="screenshot_01" width="464" height="254" />][5]

## Configure Tweetie

  1. Open your Tweetie settings  
    [<img class="alignnone size-full wp-image-540" title="photo" src="http://brandontreb.com/wp-content/uploads/2009/10/photo.jpg" alt="photo" width="320" height="480" />][6]
  2. Tap **Image Service**
  3. Tap **Custom&#8230;**  
    [<img class="alignnone size-full wp-image-541" title="photo 2" src="http://brandontreb.com/wp-content/uploads/2009/10/photo-2.jpg" alt="photo 2" width="320" height="480" />][7]
  4. In the **Image Service API Endpoint** type in the URL to the **homepage** of your blog. Note, this is NOT your gallery page. Also, and this is REALLY IMPORTANT. If WordPress is installed in a sub-directory (ie http://brandontreb.com/blog), you need to include the **/index.php **at the end. This is a weird WordPress issue.  
    Also, Twitter for iPhone does not send any login information, so you MUST send your WordPress (or Twitter if you selected it) username and password in the URL by adding ?username=WPUsername&password=WPPassword to the end of the URL. I know this isn&#8217;t ideal, but Twitter made this change when they purchased Tweetie from Atebits.  
    So, as an example, if wordpress is installed at http://brandontreb.com/blog, I would want to enter http://brandontreb.com/blog/index.php?username=WPUsername&password=WPPassword.
  5. [<img class="alignnone size-full wp-image-542" title="photo 5" src="http://brandontreb.com/wp-content/uploads/2009/10/photo-5.jpg" alt="photo 5" width="320" height="480" />][8]
  6. Tap **Save**
  7. Upload photos as usual and forget about Twitpic!

## Troubleshooting

  1. The most common issues are related to file permissions. If you are having a problem, check to make sure that the tweetpress directory has been created inside your wp-content folder. If not, try manually creating a folder named tweetpress inside of wp-content. Set its file permissions to 777. Then, create a folder inside of the tweetpress folder. Name it thumbs. Make sure its file permissions are set to 777.

  2. Another problem could be that WordPress is having trouble with the upload. Try adding /index.php to your web address in the Tweetie custom image settings. Again, this is very important if WordPress is installed in a directory that is not the root.

  3. Uninstall and reinstall. Sounds dumb, but this is always a good step when troubleshooting plugin issues.

  4. Make sure you are up-to-date on your Tweetpress and WordPress installations.

So, one thing I want to mention. WordPress is a very large application with many different configuration options. I have tried to cover all types of installations with TweetPress. If Tweetpress is not working for you, don&#8217;t bug Loren, send me an email at brandontreb [at] gmail [dot] com. Include the following information:

  * If WP is installed in the root directory or a sub-directory
  * The URL rewrite settings your are using (if any). this is also known as your permalink structure.
  * The location of your blog and gallery page (so I can check it out)
  * Any other info you think might be helpful

You can also [ping me on Twitter][9].

Thanks for checking out Tweetpress and please send me all of your suggestions for features. While I won&#8217;t get to all of them, I will certainly add the one&#8217;s that are most requested. So feel free to send me any and all suggestions.

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Tutorial â Tweetpress Integration With Tweetie" data-url="http://brandontreb.com/tutorial-a%c2%80%c2%93-tweetpress-integration-with-tweetie"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://wordpress.org/extend/plugins/tweetpress/
 [2]: http://www.atebits.com/tweetie-iphone/
 [3]: http://brandontreb.com/wp-content/uploads/2009/10/screenshot_03.png
 [4]: http://brandontreb.com/wp-content/uploads/2009/10/Screen-shot-2010-10-28-at-7.46.22-AM.png
 [5]: http://brandontreb.com/wp-content/uploads/2009/10/screenshot_01.png
 [6]: http://brandontreb.com/wp-content/uploads/2009/10/photo.jpg
 [7]: http://brandontreb.com/wp-content/uploads/2009/10/photo-2.jpg
 [8]: http://brandontreb.com/wp-content/uploads/2009/10/photo-5.jpg
 [9]: http://twitter.com/brandontreb