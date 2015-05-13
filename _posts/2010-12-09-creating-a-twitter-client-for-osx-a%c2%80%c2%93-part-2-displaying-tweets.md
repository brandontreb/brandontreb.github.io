---
title: 'Creating A Twitter Client For OSX â Part 2: Displaying Tweets'
author: brandontreb
layout: post
permalink: /creating-a-twitter-client-for-osx-a%c2%80%c2%93-part-2-displaying-tweets
dsq_thread_id:
  - 1346617627
categories:
  - Mac
---
Welcome to the second installment of my [#iDevBlogADay][1] tutorial series entitled &#8220;Creating A Twitter Client For OSX&#8221;. In case you missed it,[ here is a link to the previous tutorial in the series][2]. From the last tutorial, you should have a basic understanding of the folllowing:

  * Checking out the MGTwitterEngine code from github
  * Setting up Twitter and creating a new application
  * Building and running the MGTwitterEngine
  * Basic usage of the MGTwitterEngine including retrieving Tweets and updating your status

In today&#8217;s tutorial, we are going to go a bit further and begin work on our very own Twitter app for OSX. By the end of this tutorial, you should have a simple OSX application that displays tweets in a table view.

#### Creating A New Project And Integrating MGTwitter Engine

We will start off by creating a new Cocoa Application. This will provide us with a simple window that we will later fill with a table.

[<img class="alignnone size-medium wp-image-1134" title="Screen shot 2010-12-08 at 1.18.50 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-08-at-1.18.50-PM-500x446.png" alt="" width="350" height="312" />][3]

Now, I&#8217;m sure there are several ways we can integrate the MGTwitterEngine framework into the project, but I&#8217;m going to go the route that I found to be the easiest. We are going to simply go folder by folder and copy all of the source files into our project. That way we don&#8217;t have to deal with header search paths and all of that fun stuff.

Here are the steps to get MGTwitterEngine into your project. It was actually much easier to do this, than to build the sample project that came with the source 😉 .

  1. Create a new group in your project called MGTwitterEngine
  2. Copy all source files (except AppController.m/h) in the MGTwitterEngine root folder into the group. (Make sure you tick the box that says &#8220;Copy items into destination&#8217;s group folder&#8221;
  3. Copy the entire TouchJSON folder into the project. Then, expand it and delete the Support folder from your project (it causes some errors)
  4. Copy the entire oauthconsumer folder into your project.

When you are done, your project directory should look something like this (I made a subgroup called core to put the engine files into).

[<img class="alignnone size-full wp-image-1136" title="Screen shot 2010-12-09 at 12.05.13 AM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-12.05.13-AM.png" alt="" width="287" height="172" />][4]

The last dependency is on the libxml2 framework. We need to add it to the project. So, rightclick on the Frameworks folder and click Add -> Existing Frameworks&#8230; Search this list for libxml2.dylib and click Add.

[<img class="alignnone size-full wp-image-1137" title="Screen shot 2010-12-08 at 11.59.20 PM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-08-at-11.59.20-PM.png" alt="" width="283" height="326" />][5]

Next, we need to set up the header search path to use this library. Right click on your project and click Get Info. Scroll down to the cell that&#8217;s labeled &#8220;Header Search Paths&#8221;. Double click in the empty cell on the right, and then click the + button on the next window. Then enter /usr/include/libxml2 into the path and click ok.

At this point, try to build your project. It may contain a few warnings, but no errors.

#### Creating The Tweet Model

We could simply take the dictionaries that TouchJSON returns to us, stick them in an array and display them in the table, but that wouldn&#8217;t be very clean. So, we are going to create a simple Tweet model. Keep in mind, we are only storing the necessary data for this stage in the tutorial. We will be adding the rest of the data later.

Go to File -> New File and select **Objective-C Class**. Name the file Tweet.m. And here is the code:

The header&#8230;

<div>
  <pre>&lt;code class=’objc’>// Tweet.h
@interface Tweet : NSObject {
    NSString *screenName;
    NSString *text;
}
@property(retain) NSString *screenName;
@property(retain) NSString *text;
@end&lt;/code></pre>
</div>

And the source&#8230;

<div>
  <pre>&lt;code class=’objc’>// Tweet.m
#import "Tweet.h"
@implementation Tweet
@synthesize screenName;
@synthesize text;
- (void) dealloc {
    [screenName release];
    [text release];
    [super dealloc];
}
@end&lt;/code></pre>
</div>

Next, we are going to set up our table view that will display the tweets.

#### Creating An NSTableView And ViewController

So, there are 2 ways to populate a table view in Cocoa. The &#8220;newest&#8221; way is to use Cocoa bindings, however we are not going to do that today. Since I assume most of you are coming from iOS dev, we will stick with the &#8220;old Skool&#8221; way which is actually quite similar to how the iPhone populates a UITableView.

Start by adding a new Objective-C file to your project called TweetsController. Just take the default subclass of NSObject. Once it&#8217;s added, change it to be a subclass of NSViewController and let it implement NSTableViewDelegate. Here is what the code for the header file should look like (The NSTableViewDelegate stuff isn&#8217;t appear because of this WP plugin I&#8217;m using to display code <NSTableViewDelegate>). :

<div>
  <pre>&lt;code class=’objc’>@interface TweetsController : NSViewController{
    IBOutlet NSTableView *tableView;
    NSMutableArray *tweets;
}
@property (retain) IBOutlet NSTableView *tableView;
@property (retain) NSMutableArray *tweets;
@end&lt;/code></pre>
</div>

We have an IBOutlet to the table and an array of tweets that will populate the table. Also, make sure to synthesize these properties in the .m file as well as release them in your dealloc method (not created automatically like the iPhone does). We will come back to the implementation of the .m file.

Now, double click on MainMenu.xib opening it up in Interface Builder. There are a few steps involved here.

  1. Double click on Window in the content explorer and you should see the main application&#8217;s window
  2. Drag an NSTableView from the library on to your view and size it accordingly. By default the NSTableView will have 2 columns, delete on of them and stretch the other the width of the table.  
    [<img class="alignnone size-full wp-image-1141" title="Screen shot 2010-12-09 at 1.04.40 AM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.04.40-AM.png" alt="" width="237" height="264" />][6]
  3. From the library, drag ViewController object into the content explorer.  
    [<img class="alignnone size-full wp-image-1142" title="Screen shot 2010-12-09 at 1.06.25 AM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.06.25-AM.png" alt="" width="286" height="79" />][7]
  4. [][7]Click on it and from the top menu click Tools -> Identity Inspector.
  5. In the box that says Class, type in TweetsController.
  6. Right-click drag from your table view to your new Tweets controller to connect both the delegate and datasource (same as you would do for the iPhone)  
    [<img class="alignnone size-full wp-image-1143" title="Screen shot 2010-12-09 at 1.09.05 AM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.09.05-AM.png" alt="" width="267" height="223" />][8]
  7. Finally, drag from the controller to the table view to hook up the tableview outlet.

We are done in interface builder and you can now close it.

#### Populating The TableView With Tweets

The last steps are to pull the tweets using the MGTwitterEngine and display them in the tableview. Open up TweetsController.m and let&#8217;s add the first bit of code:

<div>
  <pre>&lt;code class=’objc’>#import "TweetsController.h"
#import "MGTwitterEngine.h"
#import "Tweet.h"

@implementation TweetsController

@synthesize tableView;
@synthesize tweets;

- (void)awakeFromNib {
    self.tweets = [[NSMutableArray alloc] init];

    MGTwitterEngine *twitterEngine = [MGTwitterEngine twitterEngineWithDelegate:self];
    OAToken *token = [[OAToken alloc] initWithKey:@"16369316-GgqA00WO0poCAj0XAFhJYDDRthVvWMxTnVyKdfWa1"
                                           secret:@"someSecret"];;

    // Put your Twitter username and password here:
    NSString *username = @"brandontreb";
    NSString *consumerKey = @"aKKEsJHTDNsv4xVlMHmMqw";
    NSString *consumerSecret = @"AnotherSecret";

    // Create a TwitterEngine and set our login details.
    twitterEngine = [[MGTwitterEngine alloc] initWithDelegate:self];
    [twitterEngine setUsesSecureConnection:NO];
    [twitterEngine setConsumerKey:consumerKey secret:consumerSecret];
    [twitterEngine setUsername:username];
    [twitterEngine setAccessToken:token];

    [twitterEngine getHomeTimelineSinceID:0 startingAtPage:0 count:20];
}&lt;/code></pre>
</div>

So we see some of the usual suspects (imports, synthesize, etc&#8230;). Now, take a look at the awakeFromNib method. Like on the iPhone, this method fires when this controller is loaded from the nib. This is where we will initialize our engine, and grab the user&#8217;s timeline. Most of this code should be familiar from the last tutorial. We have one new addition, and that&#8217;s setting ourself as the delegate. MGTwitterEngine has some nice delegate methods that it calls back to when it has grabbed all of the data. Let&#8217;s add that method to our code:

<div>
  <pre>&lt;code class=’objc’>.
.
.
#pragma mark -
#pragma mark MGTwitterEngineDelegate
- (void)statusesReceived:(NSArray *)statuses forRequest:(NSString *)connectionIdentifier {
    for(NSDictionary *tweetDict in statuses) {
        NSString *screenName = [[tweetDict objectForKey:@"user"] objectForKey:@"screen_name"];
        NSString *text = [tweetDict objectForKey:@"text"];
        Tweet *tweet = [[Tweet alloc] init];
        tweet.screenName = screenName;
        tweet.text = text;
        [self.tweets addObject:tweet];
        [tweet release];
    }

    [self.tableView performSelectorOnMainThread:@selector(reloadData) withObject:nil waitUntilDone:NO];
}&lt;/code></pre>
</div>

This method simply returns an NSArray of NSDictionaries containing all of the information about each tweet in the user&#8217;s timeline. We loop over this array, build a new Tweet object, and add it to our tweets array. Finally, we reload the table view on the main application&#8217;s thread (UI operations should always be done in the main thread).

The last step is to implement the delgate/datasource methods for the tableview that will feed our tweets into it. Let&#8217;s add the final bit of code to TweetsController.m:

<div>
  <pre>&lt;code class=’objc’>the#pragma mark -
#pragma mark TableView Data Source
- (NSInteger)numberOfRowsInTableView:(NSTableView *)aTableView {
    return [self.tweets count];
}

- (id)tableView:(NSTableView *)aTableView objectValueForTableColumn:(NSTableColumn *)aTableColumn row:(NSInteger)rowIndex {
    return nil;
}

#pragma mark -
#pragma mark TableView Delegate
- (CGFloat)tableView:(NSTableView *)tableView heightOfRow:(NSInteger)row {
    return 50.0;
}

- (void)tableView:(NSTableView *)aTableView willDisplayCell:(id)aCell forTableColumn:(NSTableColumn *)aTableColumn row:(NSInteger)rowIndex {
    Tweet *tweet = [self.tweets objectAtIndex:rowIndex];
    [aCell setTitle:[NSString stringWithFormat:@"%@: %@",tweet.screenName,tweet.text]];
    [aCell setWraps:YES];
}

- (void) dealloc {
    [tableView release];
    [tweets release];
    [super dealloc];
}&lt;/code></pre>
</div>

These methods should look vaguely familiar to the iOS developer. The method objectValueForTableColumn is not needed here but is required for a table view datasource so we just make it return nil. willDisplayCell is very similar to the iOS cellForRowAtIndexPath only this time it passes the cell to us and we do the configuration. In this case we display the tweet and tell the cell text to wrap.

Finally, we just see our dealloc method for cleanup.

That&#8217;s it for the code. Go ahead and hit Build and Run to see what we have created (spoiler alert: look below).

[<img class="alignnone size-full wp-image-1145" title="Screen shot 2010-12-09 at 1.23.49 AM" src="http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.23.49-AM.png" alt="" width="423" height="471" />][9]

Ok, so it&#8217;s not much to look at in its current stage, but we will improve on it. In the next tutorial, we will be displaying a bit more data as well as adding more functionality.

If you have any questions or comments, please feel free to leave them in the comments section.

[Download The Source For This Tutorial][10]

Until next time, happy coding!

[Click here to go to part 3][11]

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
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Creating A Twitter Client For OSX â Part 2: Displaying Tweets" data-url="http://brandontreb.com/creating-a-twitter-client-for-osx-a%c2%80%c2%93-part-2-displaying-tweets"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://idevblogaday.com
 [2]: http://brandontreb.com/creating-a-twitter-client-for-osx-part-1/
 [3]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-08-at-1.18.50-PM.png
 [4]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-12.05.13-AM.png
 [5]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-08-at-11.59.20-PM.png
 [6]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.04.40-AM.png
 [7]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.06.25-AM.png
 [8]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.09.05-AM.png
 [9]: http://brandontreb.com/wp-content/uploads/2010/12/Screen-shot-2010-12-09-at-1.23.49-AM.png
 [10]: http://brandontreb.com/wp-content/uploads/2010/12/iChirpie.zip
 [11]: http://brandontreb.com/creating-a-twitter-client-for-osx-%E2%80%93-part-3-publishing-tweets/