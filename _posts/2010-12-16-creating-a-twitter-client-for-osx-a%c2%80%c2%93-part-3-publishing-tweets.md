---
title: 'Creating A Twitter Client For OSX â Part 3: Publishing Tweets'
author: brandontreb
layout: post
permalink: /creating-a-twitter-client-for-osx-a%c2%80%c2%93-part-3-publishing-tweets
dsq_thread_id:
  - 1355062409
categories:
  - Mac
---
Welcome to part 3 of my #iDevblogaday series about creating a Twitter client for OSX

Now that we have some of our UI built, we need to add a key feature to our Twitter client: The ability to write and publish a tweet. We will be adding a textbox that the user can type their tweet into along with a live character counter to ensure the character length does not go beyond 140 characters. Finally, we will be using MGTwitterEngine to publish the tweet to Twitter.

In case you didn&#8217;t read it,[ here is a link][1] to the previous tutorial in this series. We will be using the interface created in it as a basis for this tutorial.

#### Updating and Preparing Our Code

Before we jump into the new stuff, I want to back up for a second and do some simple refactoring. In our last tutorial, we just loaded the new tweets when our application fired up. That&#8217;s great and all, but it&#8217;s not reusable. So, we need to make a class property for our MGTwitterEngine and a method that we can call to refresh the tweets. This will also come in handy later when we implement an auto refresh feature.

Let&#8217;s start by updating our header file TweetsController.h

<div>
  <pre>&lt;code class=’objc’>#import 

@class MGTwitterEngine;

@interface TweetsController : NSViewController{
    IBOutlet NSTableView *tableView;
    NSMutableArray *tweets;
    MGTwitterEngine *twitterEngine;
}

@property (retain) IBOutlet NSTableView *tableView;
@property (retain) NSMutableArray *tweets;
@property (retain) MGTwitterEngine *twitterEngine;

- (void) refreshTweets;

@end&lt;/code></pre>
</div>

As you can see we have added a few things. First, at the top we see a forward class declaration for our MGTwitterEngine. If you recall, forward class declarations are to combat circular imports. Here is a snippet from the objective-c documentation about forward class declarations.

> The @class directive minimizes the amount of code seen by the compiler and linker, and is therefore the simplest way to give a forward declaration of a class name. Being simple, it avoids potential problems that may come with importing files that import still other files. For example, if one class declares a statically typed instance variable of another class, and their two interface files import each other, neither class may compile correctly.

Next, we create a property called twitterEngine. It goes without saying by now that you should synthesize this property and release it in your .m file. I&#8217;m not going to show that code. Finally, we declare a method called refreshTweets. This will be the method we will call to when we want to refresh the list of tweets. At some point we will alter this method to take an additional argument that will allow us to differentiate between timeline, replies, and messages. For now, we will stick with timeline.

Now let&#8217;s take a look at the updates in the .m file.

<div>
  <pre>&lt;code class=’objc’>.
.
.
- (void)awakeFromNib {
    self.tweets = [[NSMutableArray alloc] init];

    OAToken *token = [[OAToken alloc] initWithKey:@""
                                      secret:@""];;

    // Put your Twitter username and password here:
    NSString *username = @"brandontreb";
    NSString *consumerKey = @"";
    NSString *consumerSecret = @"";

    // Create a TwitterEngine and set our login details.
    self.twitterEngine = [[[MGTwitterEngine alloc] initWithDelegate:self] autorelease];
    [twitterEngine setUsesSecureConnection:NO];
    [twitterEngine setConsumerKey:consumerKey secret:consumerSecret];
    [twitterEngine setUsername:username];
    [twitterEngine setAccessToken:token];
    [self refreshTweets];
}

- (void) refreshTweets {
    [twitterEngine getHomeTimelineSinceID:0 startingAtPage:0 count:20];
}
.
.
.&lt;/code></pre>
</div>

So, nothing really new here, we are just moving the scope of our twitter engine out of the awakeFromNib method and creating a reusable way to grab the user&#8217;s timeline. We are now ready to declare our IBOutlets and IBActions for our interface.

#### Setting Up IBOutlets and IBActions

Two additional IBOutlets will need to be set up for our Twitter client. The first is an NSTextView in which the user will by composing their Tweet in to. And the other is an NSTextField that is not editable. This will essentially be a label that displays the number of remaining characters to the user.

In addition to the IBOutlets, we need an IBAction that responds when the user clicks the Tweet button.

Our TweetsController.h header file should now look like this.

<div>
  <pre>&lt;code class=’objc’>#import 

@class MGTwitterEngine;

@interface TweetsController : NSViewController{
    IBOutlet NSTableView *tableView;
    IBOutlet NSTextView *tweetTextView;
    IBOutlet NSTextField *tweetCountLabel;
    NSMutableArray *tweets;
    MGTwitterEngine *twitterEngine;
}

@property (retain) IBOutlet NSTableView *tableView;
@property (retain) IBOutlet NSTextView *tweetTextView;
@property (retain) IBOutlet NSTextField *tweetCountLabel;
@property (retain) NSMutableArray *tweets;
@property (retain) MGTwitterEngine *twitterEngine;

- (void) refreshTweets;
- (IBAction) tweetButtonClicked:(id) sender;

@end&lt;/code></pre>
</div>

One other thing that I failed to mention above is we tell our class to implement the NSTextViewDelegate protocol. This will allow us to have a live counter of the characters being entered in our text view.

Now, let&#8217;s work on the interface&#8230;

#### Updating The Interface

Open up MainMenu.xib and drag an NSTextView, Label, and Button on to your view resizing as necessary. Your interface should now look something like this:

[<img class="alignnone size-full wp-image-1172" title="Screen shot 2010-12-16 at 1.26.02 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.26.02-PM.png" alt="" width="423" height="517" />][2]

Make sure that you click on the NSTextView that you added and uncheck the box that says &#8220;show vertical scroller&#8221;. Also, drag from the text view to TweetsController to set the delegate. I found that I had to expand the view tree to get at the TextView as in the screenshot below:

[<img class="alignnone size-full wp-image-1177" title="Screen shot 2010-12-16 at 1.42.02 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.42.02-PM.png" alt="" width="439" height="372" />][3]

Next, click on TweetsController in the explorer window and hook up each of the 2 IBOutlets. Here is a screenshot of the explorer window and the Connections window with the connections made.

[<img class="alignnone size-full wp-image-1173" title="Screen shot 2010-12-16 at 1.27.44 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.27.44-PM.png" alt="" width="472" height="209" />][4]

Also, you will want to control-click and drag from your button to the TweetsController to hook it up to your tweetButtonClicked IBAction.

You can now close Interface Builder and jump back to the code&#8230;

#### Implementing Live Character Counting

This process is actually pretty simple. We just need to implement one delegate method of our NSTextView. Open TweetsController.m and add the following method:

<div>
  <pre>&lt;code class=’objc’>- (BOOL)textView:(NSTextView *)aTextView
   shouldChangeTextInRange:(NSRange)affectedCharRange
   replacementString:(NSString *)replacementString {
    NSString *text = [tweetTextView string];
    int length = [text length] + 1;
    [tweetCountLabel setStringValue:[NSString stringWithFormat:@"%d",(140 - length)]];
    // Allows user to delete characters
    if([replacementString length] == 0) return YES;
    return length &lt; 140;
}&lt;/code></pre>
</div>

The shouldChangeTextInRange delegate method gets called every time the user types a character. We first check the length of the string currently in the box. 1 is added to it since we are looking at adding a potential character. Next, we update our character label to 140-(length of current string). Following that is a line to check if the replacement string is 0. This is needed for when the user presses backspace and they have already entered 140 characters. The final line will only return true if the character count in the text box is less than 140, otherwise it will prevent the user from typing anything else.

#### Publishing The Tweet To Twitter

Our final step is to actually publish the tweet to Twitter and update the timeline. We need to implement the tweetButtonClicked method and update the statusesReceived delegate method. So in, TweetsController.m, update to the following code:

<div>
  <pre>&lt;code class=’objc’>- (IBAction) tweetButtonClicked:(id) sender {
    [twitterEngine sendUpdate:[tweetTextView string]];
    [tweetTextView setString:@""];
}

#pragma mark -
#pragma mark MGTwitterEngineDelegate
- (void)statusesReceived:(NSArray *)statuses forRequest:(NSString *)connectionIdentifier {

    if([statuses count] == 1) { // when user updates their status
        NSDictionary *tweetDict = [statuses objectAtIndex:0];
        NSString *screenName = [[tweetDict objectForKey:@"user"] objectForKey:@"screen_name"];
        NSString *text = [tweetDict objectForKey:@"text"];
        Tweet *tweet = [[Tweet alloc] init];
        tweet.screenName = screenName;
        tweet.text = text;
        [self.tweets insertObject:tweet atIndex:0];
        [tweet release];
    } else {
        for(NSDictionary *tweetDict in statuses) {
            NSString *screenName = [[tweetDict objectForKey:@"user"] objectForKey:@"screen_name"];
            NSString *text = [tweetDict objectForKey:@"text"];
            Tweet *tweet = [[Tweet alloc] init];
            tweet.screenName = screenName;
            tweet.text = text;
            [self.tweets addObject:tweet];
            [tweet release];
        }
    }

    [self.tableView performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:NO];
}&lt;/code></pre>
</div>

First, we see the implementation of our IBAction. It simply calls one of our super handy methods in MGTwitterEngine. The sendUpdate method, will asynchronously update your Twitter status and post back to the statusesReceived method with YOUR status info. After that, we clear the text box that the user typed into.

The statusReceived method gets updated because we need to handle things differently when the user updates their status verses when we are pulling down the timeline. If there is only one status (ie the user just posted), we want to push it on to the head of the tweets array. We do this so that it displays at the top of our client as the timeline that comes down from Twitter is ordered from newest to oldest. Other than that, there are no major changes to this method.

After building and running, your client should now look something like this:

[<img class="alignnone size-full wp-image-1178" title="Screen shot 2010-12-16 at 1.54.56 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.54.56-PM.png" alt="" width="423" height="517" />][5]

Well, that about does it for today. I hope you have enjoyed this one. If you have any comments or questions, feel free to leave them here. You can even write them to me using your new &#8220;fancy&#8221; Twitter client to [@brandontreb][6].

[Download The Source Here][7]

Until next time, happy coding!

<p style="font-family: ‘Lucida Grande’;">
  &#8212;-
</p></p> 

<div style="font-family: ‘Lucida Grande’;">
  <span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em>﻿﻿This post is part of <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">iDevBlogADay</a>, a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">web site</a>, <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://feeds.feedburner.com/idevblogaday">RSS feed</a>, or <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://twitter.com/#search?q=%23idevblogaday">Twitter</a>.</em></span></span></strong></span>
</div></p> 

<div style="font-family: ‘Lucida Grande’;">
  <span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em><br /> <br /> </em></span></span></strong></span>
</div></p> 

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Creating A Twitter Client For OSX â Part 3: Publishing Tweets" data-url="http://brandontreb.com/creating-a-twitter-client-for-osx-a%c2%80%c2%93-part-3-publishing-tweets"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://brandontreb.com/creating-a-twitter-client-for-osx-part-2-displaying-tweets/
 [2]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.26.02-PM.png
 [3]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.42.02-PM.png
 [4]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.27.44-PM.png
 [5]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-16-at-1.54.56-PM.png
 [6]: http://twitter.com/brandontreb
 [7]: http://brandontreb.com/wp-content/uploads/2010/12/iChirpie2.zip