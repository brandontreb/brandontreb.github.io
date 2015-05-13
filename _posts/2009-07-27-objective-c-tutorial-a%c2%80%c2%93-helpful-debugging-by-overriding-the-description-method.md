---
title: Objective-C Tutorial â Helpful Debugging By Overriding The Description Method
author: brandontreb
layout: post
permalink: /objective-c-tutorial-a%c2%80%c2%93-helpful-debugging-by-overriding-the-description-method
dsq_thread_id:
  - 1406563732
categories:
  - Mac
---
If you have ever coded Java, you know how important the toString() method is. Well, objective-c has a similar method called **Description. **What overriding the description will allow you to do is, customize the output when you want to print your object.** **

Let&#8217;s take an example where you might have a class called **User **that contains a few properties.

<div>
  <pre>&lt;code class=’objc’>@interface User : NSObject {
    NSInteger userID;
    NSString  *name;
    NSString  *website;
}
@end&lt;/code></pre>
</div>

Now, at this point if we did

<div>
  <pre>&lt;code class=’objc’>NSLog(@"%@",user);&lt;/code></pre>
</div>

we would end up with output like

<div>
  <pre>&lt;code class=’bash’>User: 0xd18f50&lt;/code></pre>
</div>

which is not very helpful. What would be better is when we want to print the user for it to display their userID, name, and website. This can be done by overriding the **description **method like this.

<div>
  <pre>&lt;code class=’objc’>-(NSString *) description {
    return [NSString stringWithFormat:@"ID: %d\nName: %@\nWebsite: %@\n",
            userID,name,website];
}&lt;/code></pre>
</div>

Now when we call

<div>
  <pre>&lt;code class=’objc’>NSLog(@"%@",user);&lt;/code></pre>
</div>

is will nicely display this:

<div>
  <pre>&lt;code class=’bash’>ID: 42
Name: brandontreb
Website: http://brandontreb.com&lt;/code></pre>
</div>

Note: NSLog is your best friend when debugging any objective-c application. Use it often. Also, to open up the** Debugger Console**, click **Run -> Console**.

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Objective-C Tutorial â Helpful Debugging By Overriding The Description Method" data-url="http://brandontreb.com/objective-c-tutorial-a%c2%80%c2%93-helpful-debugging-by-overriding-the-description-method"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>