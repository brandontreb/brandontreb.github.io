---
title: Objective-C Programming Tutorial â Creating A Twitter Client Part 1
author: brandontreb
layout: post
permalink: /objective-c-programming-tutorial-a%c2%80%c2%93-creating-a-twitter-client-part-1
dsq_thread_id:
  - 1357368575
categories:
  - Mac
---
## <span style="color: #ff6600;">This tutorial has moved! I have updated it to support Twitter&#8217;s Oauth, you can find the first tutorial in there series by clicking the link below</span>

## [Creating A Twitter Client For OSX – Part 1][1]

<p style="text-align: center;">
  <p style="text-align: center;">
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/twitter-logo.jpg"><img class="size-full wp-image-206 aligncenter" title="twitter-logo" src="http://brandontreb.com/wp-content/uploads/2009/06/twitter-logo.jpg" alt="twitter-logo" width="441" height="203" /></a>
  </p>
  
  <p>
    So with all of the buzz and hoopla about Twitter lately, I thought I would start a tutorial series demonstrating how to create a simple Twitter client for the Mac. I will be showing you how to use Objective-C to connect to Twitter, login, get and post tweets.
  </p>
  
  <p>
    In the first part of this series, we will simply be getting connected to Twitter and displaying our public feed in the debug terminal.
  </p>
  
  <p>
    So let&#8217;s go ahead and get started&#8230; First make sure you head on over to <a href="http://developer.apple.com/mac" target="_BLANK">developer.apple.com/mac</a> and scoop up the latest version of the SDK. If you have already installed the SDK for iPhone development, you should be fine.
  </p>
  
  <h3>
    Create A New Project
  </h3>
  
  <p>
    Go ahead and open up XCode. Click <strong>File -> New Project&#8230;</strong> Under the Mac OSX heading, select <strong>Cocoa Application.</strong> This will create a few base files to start our applicaton. Make sure you name it something awesome; preferably include <strong>&#8220;tw&#8221;</strong> somewhere in there or relate it to birds. I&#8217;m going to name mine Chirpie. That sounds pretty Twittery.
  </p>
  
  <div>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_01.png"><img class="aligncenter size-full wp-image-232" title="screenshot_01" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_01.png" alt="screenshot_01" width="600" height="442" /></a>
  </div>
  
  <p>
    So the first thing we need to do is develop a class that will make a connection to Twitter.
  </p>
  
  <h3>
    Create Our TwitterRequest Class
  </h3>
  
  <p>
    The TwitterRequest class will be the meat of our Twitter application. It will contain all of the code to connect to Twitter as well as all of the Twitter API functions. So bear with me and feel free to ask questions about any part of this tutorial.
  </p>
  
  <p>
    To add a new file to your project, click <strong>File -> New File </strong>and select <strong>Cocoa -> Objective-C class</strong>
  </p>
  
  <p>
    <strong><br /> </strong>
  </p>
  
  <p>
    <strong><br /> </strong>
  </p>
  
  <p>
    <strong><a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_02.png"><img class="aligncenter size-full wp-image-234" title="screenshot_02" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_02.png" alt="screenshot_02" width="600" height="442" /></a></strong>
  </p>
  
  <p>
    Name this file <strong>TwitterRequest </strong>and make sure the box that says &#8220;Also create TwitterRequest.h&#8221; is checked. Click <strong>Finish.</strong>
  </p>
  
  <p>
    Open up <strong>TwitterRequest.h</strong> and add the following code. I&#8217;ll explain what it does below&#8230;
  </p>
  
  <p>
    So before you leave me angry comments about putting up an image rather than the source text, let me explain. I have gone through many programming tutorials, and have found that I learn far less by copy and pasting than by typing all of the code myself. If you really don&#8217;t feel like typing the code yourself, you can always download the source at the bottom of this post.
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_03.png"><img class="aligncenter size-full wp-image-241" title="screenshot_03" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_03.png" alt="screenshot_03" width="497" height="319" /></a>
  </p>
  
  <p>
    Ok, so the first 2 variables here are just <strong>username</strong> and <strong>password</strong>. Whenever you make an API request to Twitter, they will prompt you for a username and password. You will see in <strong>TwitterRequest.m</strong> how we will send this to them.
  </p>
  
  <p>
    Next, we see <strong>receivedData</strong>. This is just a buffer for holding the XML that Twitter sends back to us. As Twitter sends us data, we will append it to this variable.
  </p>
  
  <p>
    The final 3 variables all have to do with handling the data once we are finished communicating with Twitter. Let&#8217;s first talk about the <strong>callback </strong>variable. This is the function that our <strong>TwitterRequest</strong> class will call once it receives the data from Twitter. It will pass the received data to that function. The <strong>delegate</strong> variable simply tells our class where this function is. Finally, we have an <strong>errorCallback</strong> variable. This is a method (inside of the delegate) that gets called if there is an error receiving data.
  </p>
  
  <p>
    Next, we define 2 methods. The first, is named after the Twitter API call <strong>friends_timeline.</strong> And does just that, returns the friends timeline. The next is a helper method that does all of the heavy lifting. All of the Twitter API methods we implement will call the <strong>request</strong> method.
  </p>
  
  <p>
    One thing to note is the method signature of <strong>friends_timeline</strong>. It takes a delegate and a selector. This is just telling our Twitter class to send the data to a given method within a given object. Now, let&#8217;s implement this class. Open up <strong>TwitterRequest.m</strong> and add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_041.png"><img class="aligncenter size-full wp-image-247" title="screenshot_04" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_041.png" alt="screenshot_04" width="262" height="100" /></a>
  </p>
  
  <p>
    This will create the &#8220;getter&#8221; and &#8220;setter&#8221; methods for our variables. Make sure you add them after the line <strong>@implementation TwitterRequest.</strong> Next, we implement our <strong>friends_timeline</strong> method. Add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_05.png"><img class="aligncenter size-full wp-image-248" title="screenshot_05" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_05.png" alt="screenshot_05" width="583" height="134" /></a>
  </p>
  
  <p>
    As you can see, this method is quite simple. It will be used by all of our Twitter API methods. This is because we pass off all of the hard work to the <strong>request</strong> method. The <strong>friends_timeline</strong> method does a few things. First, it sets the <strong>delegate</strong> and <strong>callback</strong> properties for the class. Then, it calls the <strong>request </strong>method with a given URL. <a href="http://apiwiki.twitter.com/Twitter-API-Documentation">You can find all of Twitter&#8217;s API calls here.</a>
  </p>
  
  <p>
    Now, for the fun part&#8230; Let&#8217;s implement the <strong>request</strong> method. Add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_06.png"><img class="aligncenter size-full wp-image-250" title="screenshot_06" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_06.png" alt="screenshot_06" width="538" height="189" /></a>
  </p>
  
  <p>
    Ok, so not too much to this method. First, it creates an <strong>NSMutableURLRequest </strong>from our URL and passes that to an <strong>NSURLConnection</strong>. If we were able to connect (theConnection is not nil), we instanciate the <strong>receivedData</strong> property. Now, an <strong>NSURLConnection</strong> has some delegate methods that we need to implement in order to receive and manipulate the data. The first one in our case being the <strong>connection didRecieveAuthenticationChallenge</strong> method.
  </p>
  
  <p>
    This method gets called when the web service you are trying to access requests a username and password. So in this method, we simply give it our Twitter username and password. Add the following code:
  </p>
  
  <p style="text-align: center;">
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_012.png"><img class="alignnone size-full wp-image-531" title="screenshot_01" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_012.png" alt="screenshot_01" width="775" height="274" /></a>
  </p>
  
  <p>
    First, we check the <strong>previousFailureCount</strong> variable to see if this is the first time we have been asked for a username and password (if not, you know your current credentials are incorrect). Next, we build an <strong>NSURLCredential</strong> using our Twitter username and password. And the magic of the objective-c libraries handles the rest.
  </p>
  
  <p>
    The next method we need to implement gets called when we receive a response from the server. We just use this as an opportunity to clear out the received data. Add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_08.png"><img class="aligncenter size-full wp-image-253" title="screenshot_08" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_08.png" alt="screenshot_08" width="571" height="149" /></a>
  </p>
  
  <p>
    Pretty simple&#8230; Stay with me, we have 3 more delegate methods to implement. Add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_09.png"><img class="aligncenter size-full wp-image-254" title="screenshot_09" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_09.png" alt="screenshot_09" width="489" height="94" /></a>
  </p>
  
  <p>
    I love the simplicity of this method. It gets called evertime we receive bytes of data from the server. Once data is received, it can be appended to the <strong>receivedData</strong> property. (No malloc needed!). This next method is optional if you want to be lazy, but needed if you want your Twitter program to be robust. So just add it&#8230;
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_10.png"><img class="aligncenter size-full wp-image-255" title="screenshot_10" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_10.png" alt="screenshot_10" width="488" height="278" /></a>
  </p>
  
  <p>
    The <strong>didFailWithError</strong> method gets called when there is a problem communicating with the server. This is important in our application as Twitter seems to have periodic issues when they become overloaded. We&#8217;re in the home stretch&#8230; The last method for this class is the <strong>connectionDidFinishLoading</strong> method. Add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_11.png"><img class="aligncenter size-full wp-image-256" title="screenshot_11" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_11.png" alt="screenshot_11" width="498" height="250" /></a>
  </p>
  
  <p>
    This gets called after we have received our response from Twitter. Notice the line:
  </p>
  
  <p>
    [code=&#8217;c&#8217;][delegate performSelector:self.callback withObject:receivedData];[/code]
  </p>
  
  <p>
    That calls the method we will specify and sends the <strong>receivedData</strong> to it to be processed. Finally, we release our request variables to be nice to the users&#8217; memory.
  </p>
  
  <h3>
    Using The TwitterRequest Class
  </h3>
  
  <p>
    Ok, so we have laid the ground work for our TwitterRequest class. Now I will show you how to use it to easily interface with Twitter. We will need to create one more file that will act as the delegate for our application. So, once more click <strong>File -> New File&#8230;</strong> and select <strong>Objective-C class</strong>. Name this file <strong>ApplicationDelegate</strong> and be sure to check the box that says &#8220;Also create ApplicationDelegate.h&#8221;.
  </p>
  
  <p>
    We need to tell our application that this class will be its delegate. The way to do this is through <strong>Interface Builder</strong>. So, double click on the file <strong>MainMenu.xib</strong> to open it in <strong>InterfaceBuilder</strong>.
  </p>
  
  <p>
    See the video below on how to create the connection.
  </p>
  
  <p>
    [QUICKTIME http://brandontreb.com/wp-content/uploads/2009/06/IBSetup.mov 634 396 false true]
  </p>
  
  <p>
    Now that our Connection has been made, we need to simply construct a TwitterRequest object and call the friends_timeline method when our application starts. Go ahead and open ApplicationDelegate.h and add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_011.png"><img class="aligncenter size-full wp-image-264" title="screenshot_01" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_011.png" alt="screenshot_01" width="314" height="142" /></a>
  </p>
  
  <p>
    We are just declaring the callback method that will be called by our TwitterRequest class. Notice that it takes an NSData argument. This will be the data returned by Twitter. Now open <strong>ApplicationDelegate.m</strong> and add the following code:
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_021.png"></a><a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_031.png"><img class="aligncenter size-full wp-image-266" title="screenshot_03" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_031.png" alt="screenshot_03" width="600" height="305" /></a>
  </p>
  
  <p>
    So the first thing to see here is we are overriding the <strong>applicationDidFinishLaunching </strong>method. This is the method that gets called when the application starts. So we create a new instance of the TwitterRequest class and set the username and password fields. Next, we simply call the<strong> friends_timeline</strong> method on the class, passing it <strong>self</strong> as the delegate and <strong>friends_timeline_callback</strong> as the callback.
  </p>
  
  <p>
    Once our request has been processed and Twitter returns some data to us, the friends_timeline_callback method will get called with the data. So we convert this data to a string and print it out.
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_051.png"><img class="aligncenter size-full wp-image-272" title="screenshot_05" src="http://brandontreb.com/wp-content/uploads/2009/06/screenshot_051.png" alt="screenshot_05" width="616" height="564" /></a>
  </p>
  
  <p>
    And there you have it, we have successfully connected to Twitter and displayed our friend timeline. Next week I will be showing you how to parse this response and get it into a format that we can use in our applications. If you have any comments or questions, feel free to leave them below. You can also download the source for this tutorial below.
  </p>
  
  <p>
    <a href="http://brandontreb.com/wp-content/uploads/2009/06/Chirpie.zip">Twitter Mac Client Tutorial 1 &#8211; Source</a>
  </p>
  
  <div style="">
    <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Objective-C Programming Tutorial â Creating A Twitter Client Part 1" data-url="http://brandontreb.com/objective-c-programming-tutorial-a%c2%80%c2%93-creating-a-twitter-client-part-1"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
  </div>

 [1]: http://brandontreb.com/creating-a-twitter-client-for-osx-part-1/