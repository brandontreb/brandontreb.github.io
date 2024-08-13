---
date: 2011-01-06T01:00:00-0600
slug: image-manipulation-retrieving-and-updating-pixel-values-for-a-uiimage
title: "Image Manipulation: Retrieving And Updating Pixel Values For A UIImage"
type: post
post_type: note
photos:
- /uploads/2011/jobs.png "jobs"
tags:
- iDevBlogADay
---

[![](/uploads/2011/jobs.png "jobs")](http://brandontreb.com/wp-content/uploads/2011/01/jobs.png)

 Grayscale Jobs
 



With the recent success of cool photo manipulation apps such as Camera+ and Instagram, it got me wondering. How do these photo apps modify the pixel data of the image.


After doing a bit of research on the subject, I found countless posts on Stack Overflow and the Developer forums about various methods to get and set the pixel values of a UIImage. Most of them unanswered or partially answered. I tested out many solutions and banged my head on my computer into the whee hours of the morning with no success. Every solution I tried seemed to completely destroy the image.


It wasn’t until this morning, I had an “aha” moment, changed one line of code and was able to produce a grayscale version of a UIImage.


Having the ability to get and set pixel values of a UIImage is super important if you want to create a photo related app that has “Filters”. Once you know the basics, you can apply your ninja math skillz to implement cool filter algorithms on the pixels. Below, I will show you onc such algorithm for converting an image to grayscale (it’s not *that* clever).


I should note, that a good majority of my code comes from Olie’s solution on this [Stack Overflow post](http://stackoverflow.com/questions/448125/how-to-get-pixel-data-from-a-uiimage-cocoa-touch-or-cgimage-core-graphics). His example simply returns and array of UIColor objects for a given image. Mine will modify those colors and write them back to a UIImage.


#### Converting A UIImage Into A Pixel Array


Here is the first part of our grayscale method. It is creating a char array from a global UIImage property named workingImage.




```
<code class=’objc’>- (IBAction) grayscale:(id) sender {
    CGContextRef ctx;
    CGImageRef imageRef = [self.workingImage CGImage];
    NSUInteger width = CGImageGetWidth(imageRef);
    NSUInteger height = CGImageGetHeight(imageRef);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    unsigned char *rawData = malloc(height * width * 4);
    NSUInteger bytesPerPixel = 4;
    NSUInteger bytesPerRow = bytesPerPixel * width;
    NSUInteger bitsPerComponent = 8;
    CGContextRef context = CGBitmapContextCreate(rawData, width, height,
    bitsPerComponent, bytesPerRow, colorSpace,
    kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGColorSpaceRelease(colorSpace);

```
CGContextDrawImage(context, CGRectMake(0, 0, width, height), imageRef);
CGContextRelease(context);
.
.
.&lt;/code></pre>

```


```

This is a lot of Core Graphics fanciness that isn’t super important to understand. It’s just getting the RGBA values from the image and writing them into the rawData char array. There are 4 bytes per pixel (red, green, blue, alpha), so this array contains 4 \* height \* width elements.


#### Modifying The Pixels of a UIImage


Here is where the magic happens. You can replace this code with the logic necessary to apply the filter you are making. Another clever way to approach this would be to pass this code in as a block into the method (I’ll leave that as an exercise for the reader :)).




```
<code class=’objc’>.
.
.
    int byteIndex = 0;
    for (int ii = 0 ; ii < width * height ; ++ii)
    {
    int outputColor = (rawData[byteIndex] + rawData[byteIndex+1] +
        rawData[byteIndex+2]) / 3;

```
rawData[byteIndex] = (char) (outputColor);
rawData[byteIndex+1] = (char) (outputColor);
rawData[byteIndex+2] = (char) (outputColor);

```
byteIndex += 4;

```

}



```

.
.
.</code>


```


The first part is pretty straight forward, we have a for loop that goes from 0 to width \* height. We index into the rawData array using a counter that we increment by 4 each time (remember 4 bytes per pixel). As you can imagine, the first pixel (rawData[byteIndex]) represents the red pixel, then green for +1, blue for +2, and finally alpha for +3. Note that the alpha byte is last because kCGImageAlphaPremultipliedLast flag above.


In order to do grayscale, we simple set all of the color values to the average color value. So, for example the color [218,232,244] (which is the light blue color of the WordPress editor’s toolbar) would be converted to [231,231,231] which is a fairly light gray color.


The most important step that everyone in the forums seemed to miss was casting the new value to a char. Remember we are using a char array, setting ints as values will generally screw up your image. (This was my “aha” moment that I mentioned above)


#### Writing The Pixels Back To a UIImage


The final step is to write the pixel data back to a UIImage. Again, I borrowed some of this code from somewhere else and unfortunately lost the link. If I find it, I will update the post.




```
<code class=’objc’>.
.
.
    ctx = CGBitmapContextCreate(rawData,
        CGImageGetWidth( imageRef ),
        CGImageGetHeight( imageRef ),
        8,
        CGImageGetBytesPerRow( imageRef ),
        CGImageGetColorSpace( imageRef ),
        kCGImageAlphaPremultipliedLast ); 

```
imageRef = CGBitmapContextCreateImage (ctx);
UIImage* rawImage = [UIImage imageWithCGImage:imageRef];  
CGContextRelease(ctx);


self.workingImage = rawImage;


free(rawData);



```

}</code>


```


All we are doing here is creating a new Bitmap Context, writing it to our CGImageRef and constructing a new UIImage from that CGImageRef. Finally, we just update our workingImage with the modified one. Fancy, I know…


Now, much of this code is to work with my example (download below), but it could easily be tweaked to fit within your super awesome photo app. If you have any questions or comments PLEASE leave them here or send them to me on Twitter (but probably leave them here 😉 ).


[Download The Sample Source Project](http://brandontreb.com/wp-content/uploads/2011/01/ImageManip.zip)


* Note on the sample code: Before you give me crap about doing this in the main thread, I know. Don’t do these operation on the main thread. The example is meant to be quick and dirty and by no means is ready for production. Enjoy!


***﻿﻿This post is part of [iDevBlogADay](http://idevblogaday.com/), a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the [web site](http://idevblogaday.com/), [RSS feed](http://feeds.feedburner.com/idevblogaday), or [Twitter](http://twitter.com/#search?q=%23idevblogaday).***



[Tweet](http://twitter.com/share)


