---
date: 2011-07-02T00:00:00-0600
slug: configuring-photoshop-for-pixel-art
title: "Configuring Photoshop For Pixel Art"
type: post
post_type: note
photos:
- /uploads/2011/a63ad6fab0dc4839a604e885a8a85f50_7.jpg
- /uploads/2011/e77e30a4d504437ba75df8a7129f7d9d_7.jpg
- /uploads/2011/bitizens-compare.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2010.34.22%20AM.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2010.42.00%20AM.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2010.57.03%20AM.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2010.53.40%20AM.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2012.31.54%20PM.png
- /uploads/2011/Screen%20shot%202011-07-02%20at%2012.39.07%20PM.png
tags:
- Articles
---
First things first. My wife and I had welcomed a new baby boy into the world on Monday so you guys are going to have to see the obligatory “dad” pics.


Here they are


![Jack](/uploads/2011/a63ad6fab0dc4839a604e885a8a85f50_7.jpg)


![Jack](/uploads/2011/e77e30a4d504437ba75df8a7129f7d9d_7.jpg)


Ok, now that’s past us, let’s chat about pixel art. I have always been a HUGE fan of pixel art both in games and as a form of art. As an aspiring game developer (games coming soon 😉 ), I found pixel art a great fit for me. Not only is is aesthetically pleasing, it also allows developers to create “better” art than developer art. All it takes is a little patience.


Today, I’m going to share with you how I have configured Photoshop to create some pixel art and eventually show you how to make your own Bitizens from [Tiny Tower](http://itunes.apple.com/us/app/tiny-tower/id422667065?mt=8) in a follow up post.


Some of you might argue that Photoshop is not the way to go and that there are *better* tools for Pixel art. I have tried quite a few and keep coming back to PS because of some of it’s great features (shapes, layering, masks, gradients, noise filters, etc…). We can use a lot of these tools to our advantage when creating pixel art, PS just needs to be set up correctly.


Just a heads up before I start, I’m using Adobe Photoshop CS3 for Mac.


#### Change The Way Photoshop Scales Images


![](/uploads/2011/bitizens-compare.png)


First, we need to change the way PS scales images. This is useful for when you are ready to export your sprites for production. By default, PS uses a Bicubic algorithm when you want to enlarge an image. This generally produces a very blurry effect. It’s quite useful in many cases, but terrible for pixel art. Here, we need to tell PS to use a “Nearest Neighbor” scaling algorithm. This will preserver all of our edges without PS mucking with the blending.


To change this setting, navigate to **Photoshop->Preferences->General**


![Nearest Neighbor](/uploads/2011/Screen%20shot%202011-07-02%20at%2010.34.22%20AM.png)


The only setting you need to modify is “Image Interpolation”. Make sure to change it to “Nearest Neighbor”.


#### Enabling A Grid


When creating pixel art, it is very useful to have a grid in place in order to determine where to place your next pixel. Without it, you are just blindly placing them. To turn on and configure a grid in PS, navigate to **Photoshop->Preferences->Guides, Grid, Slices & Count…**


![1px gridlines](/uploads/2011/Screen%20shot%202011-07-02%20at%2010.42.00%20AM.png)


Make sure to set **Gridline every** to 1 and **Subdivisions** to 1. This will create a 1px grid on for you to use as a guide.


Once you have configured the grid, click on **View->Show->Grid** to display it. You might have to do this for every document.


#### Configuring the Pencil Tool


When creating pixel art in PS, the pencil tool is your best friend. You will use it ~95% of the time when drawing. We need to make sure that the pencil draws single pixel dots without any interpolation. With the pencil tool selected, click the dropdown next to **brush**, tap the **arrow** and then select **basic brushes**. When prompted to replace current brushes, click **OK**.


![Basic Brushes](/uploads/2011/Screen%20shot%202011-07-02%20at%2010.57.03%20AM.png)


Next, select the 1 px brush (it should be in the top left). Most of the time, you will want to draw with single pixels.


![1 px brush](/uploads/2011/Screen%20shot%202011-07-02%20at%2010.53.40%20AM.png)


#### Creating A New Document


Deciding on a document size can be tricky. You generally want to create your document as small as possible to avoid having to do more work than you need. The size depends on how “pixellated” you want your art to look after scaling. Basically, using the scaling we chose above (nearest neighbor), the “pixels” will just increase in size.


Here is a blown up view of our 15×25 image that we will use in the next tutorial to create a Bitizen from Tiny Tower.


![New Document](/uploads/2011/Screen%20shot%202011-07-02%20at%2012.31.54%20PM.png)


Since the zoom level isn’t too high, we are seeing grid slices every 2 pixels rather than 1. As you zoom, you will see the grid size increasing.


#### Multiple Zoom Levels In View


One cool trick with PS is, it allows you to have multiple windows of the same document open. The reason this is handy is you can see various zoom levels for your artwork all at once. While drawing each pixel zoomed in, you can see the result in the desired resolution. This helps out dramatically when you are trying to fine tune your work.


To do this, go to **Window->Arrange->New Window for [projectname.psd]** Now you can control the zoom level of each window individually.


![](/uploads/2011/Screen%20shot%202011-07-02%20at%2012.39.07%20PM.png)
