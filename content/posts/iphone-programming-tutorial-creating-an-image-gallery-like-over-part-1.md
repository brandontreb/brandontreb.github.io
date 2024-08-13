---
date: 2013-08-12T00:00:00-0600
slug: iphone-programming-tutorial-creating-an-image-gallery-like-over-part-1
title: "iPhone Programming Tutorial: Creating An Image Gallery Like Over &#8211; Part 1"
type: post
post_type: note
photos:
- /uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png
- /uploads/2013/Screen-Shot-2013-07-21-at-8.44.02-PM-172x300.png
- /uploads/2013/Screen-Shot-2013-07-21-at-8.41.29-PM.png
- /uploads/2013/Screen-Shot-2013-07-21-at-8.45.05-PM.png
- /uploads/2013/Screen-Shot-2013-07-21-at-9.13.08-PM-300x67.png
- /uploads/2013/Screen-Shot-2013-07-21-at-8.57.37-PM-259x300.png
- /uploads/2013/Screen-Shot-2013-07-21-at-9.26.07-PM-184x300.png
tags:
- iPhone
- iPhone Programming
- alassetslibrary-tutorial
- iOS-programming
- uicollectionview-tutorial
- iPhone App Development
---
[![Screen Shot 2013-08-09 at 8.36.42 PM](/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png)](/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png)


 


Recently, I have had to build an app ([download link](http://j.mp/scriptapp)) that required the user to choose a photo from their photo library.  Rather than just throwing up a **UIImagePickerController** like many apps, I decided to add a little bit of style.  Being inspired by Over’s ultra simplistic (and beautiful) photo selection interface, I decided to fancy things up a bit.


For this tutorial, I will start with a Fresh **iOS6** View-Based application that uses **Storyboards** and **ARC**. Also note that I will be optimizing for the iPhone 5 resolution.  You are free to make the tweaks necessary to deploy on the iPhone 4 and 4S.


 


Here is a breakdown of what we will cover in this part:


1. Creating a **UICollectionView**inside of **Storyboard**
2. Using the **ALAssetsLibrary** to fetch photos from the user’s **Camera Roll**
3. Displaying the **ALAssets** inside of the **UICollectionView**


### 1. Preparing The IBOutlets


Start by opening up \*\*ViewController.m \*\*and replacing the **@interface** declaration at the top with the following code:





|  |
| --- |
| 
```
@interface ViewController ()<UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout>
@property(nonatomic, weak) IBOutlet UICollectionView \*collectionView;
@end
```
 |



This will declare the \*\*IBOutlet \*\*needed to hook up the main **UICollectionView** that we will be using to display the user’s photos.  I have also set up our class to be a **UICollectionViewDataSource**, **UICollectionViewDelegate**, and **UICollectionViewDelegateFlowLayout**. This is necessary when interfacing with the **UICollectionView.**


### 2. Setting Up The UICollectionView In Storyboard


Open up \*\*MainStoryboard.storyboard \*\*and drag a **UICollectionView** on to your view ensuring that it stretches the entire screen.


[![Screen Shot 2013-07-21 at 8.44.02 PM](/uploads/2013/Screen-Shot-2013-07-21-at-8.44.02-PM-172x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-8.44.02-PM.png)


Then, **Control-Click** and drag from the \*\*UICollectionView \*\*to your \*\*ViewController \*\*Object and set it as the \*\*delegate \*\*and **datasource.**


[![Screen Shot 2013-07-21 at 8.41.29 PM](/uploads/2013/Screen-Shot-2013-07-21-at-8.41.29-PM.png)](/uploads/2013/Screen-Shot-2013-07-21-at-8.41.29-PM.png)


Finally, \*\*Control-Click \*\*and drag from \*\*View Controller \*\*to **Collection View** and selected \*\*collectionView \*\*to make the \*\*IBOutlet \*\*connection.


[![Screen Shot 2013-07-21 at 8.45.05 PM](/uploads/2013/Screen-Shot-2013-07-21-at-8.45.05-PM.png)](/uploads/2013/Screen-Shot-2013-07-21-at-8.45.05-PM.png)


Now, we need to give a **Cell Identifier** to the **UICollectionViewCell** so that we can reference it in code.  Click on the default cell inside of the **UICollectionView** and open the \*\*Attributes Inspector. \*\*For the **Identifier** type in **PhotoCell.** The cell might be a little tricky to see as its background color is clear, but it’s there. Simply click in the top left corner of the **UICollectionView**.


[![Screen Shot 2013-07-21 at 9.13.08 PM](/uploads/2013/Screen-Shot-2013-07-21-at-9.13.08-PM-300x67.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-9.13.08-PM.png)


Now that the **UICollectionView** has been set up, it’s time to fetch the photos from the user’s photo library.



```
If you are using the simulator, make sure to populate the Photo Gallery with images from the web. Simply open up a browser, do a Google Image Search, and click and hold on various images. You should have an option from the menu that pops up to save the images to your camera roll.
Finally, open up the **Photos** app on the simulator to initialize the Assets Library.


```

### 3. Fetching ALAssets (user photos) From The ALAssets Library


In order to interface with the user’s photo library, we must first import the \*\*AssetsLibrary.framework \*\*framework.  To do this, click on your project in the sidebar, select the Target, then click \*\*Build Phases, \*\*expand the **Link Binary With Libraries** section and click the \*\*+ \*\*button.  Do a search for \*\*Assset \*\*and then double click on **AssetsLibrary.framework.**


[![Screen Shot 2013-07-21 at 8.57.37 PM](/uploads/2013/Screen-Shot-2013-07-21-at-8.57.37-PM-259x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-8.57.37-PM.png)


It should now be added to your project and ready to use.  Now that it has been linked, we must import it into the \*\*ViewController.m \*\*file.  Open up \*\*ViewController.m \*\*and add the following import to the top of the file:





|  |
| --- |
| 
```
#import <AssetsLibrary/AssetsLibrary.h>
```
 |



Before we can fetch the user’s photos, we need to set up an **NSArray** to put them in.  Add the following line within the \*\*@interface \*\*declaration at the top.





|  |
| --- |
| 
```
@property(nonatomic, strong) NSArray \*assets;
```
 |



Now, add the following method to your class:





|  |
| --- |
| 
```
+ (ALAssetsLibrary \*)defaultAssetsLibrary
{
    static dispatch_once_t pred = ;
    static ALAssetsLibrary \*library = nil;
    dispatch_once(&pred, ^{
        library = [[ALAssetsLibrary alloc] init];
    });
    return library;
}
```
 |



This is a static method that creates a static instance to the **ALAssetsLibrary**.  The reason this is needed is, when we enumerate the **ALAssets** in the next method, it seems that the assets get released immediately and otherwise wouldn’t be able to be used in the rest of the application. I will explain this a little more in a moment.


Head over to **viewDidLoad** and add the following code:





|  |
| --- |
| 
```
- (void)viewDidLoad
{
    [super viewDidLoad];
 
    _assets = [@[] mutableCopy];
    __block NSMutableArray \*tmpAssets = [@[] mutableCopy];
    // 1
    ALAssetsLibrary \*assetsLibrary = [ViewController defaultAssetsLibrary];
    // 2
    [assetsLibrary enumerateGroupsWithTypes:ALAssetsGroupAll usingBlock:^(ALAssetsGroup \*group, BOOL \*stop) {
        [group enumerateAssetsUsingBlock:^(ALAsset \*result, NSUInteger index, BOOL \*stop) {
            if(result)
            {
                // 3
                [tmpAssets addObject:result];
            }
        }];
 
        // 4
        //NSSortDescriptor \*sort = [NSSortDescriptor sortDescriptorWithKey:@"date" ascending:NO];
        //self.assets = [tmpAssets sortedArrayUsingDescriptors:@[sort]];
        self.assets = tmpAssets;
 
        // 5
        [self.collectionView reloadData];
    } failureBlock:^(NSError \*error) {
        NSLog(@"Error loading images %@", error);
    }];
}
```
 |



1. Grab our static instance of the **ALAssetsLibrary**
2. Enumerate through all of the \*\*ALAssets \*\*(photos) in the user’s **Asset Groups** (Folders)
3. Enumerate each folder and add it’s \*\*ALAssets \*\*to the temporary array
4. Sort the assets list by date (this won’t work yet, but I will show you how to fix later). For now this code is commented out and the Assets will be sorted however they come out.
5. Reload the **UICollectionView** (this won’t work yet as we haven’t set up the delegate methods)


Now that we have an **NSArray** populated with **ALAssets**, let’s set up the \*\*delegate \*\*methods for the **UICollectionView** in order to populate it with data.


### 4. Populating the UICollectionView With Data


A **UICollectionView** functions much like a \*\*UITableView \*\*having delegate and datasource methods.  Add the following methods to your **ViewController** class to populate the view.





|  |
| --- |
| 
```
#pragma mark - collection view data source
 
- (NSInteger) collectionView:(UICollectionView \*)collectionView numberOfItemsInSection:(NSInteger)section
{
    return self.assets.count;
}
 
- (UICollectionViewCell \*) collectionView:(UICollectionView \*)collectionView cellForItemAtIndexPath:(NSIndexPath \*)indexPath
{
    UICollectionViewCell \*cell = (UICollectionViewCell \*)[collectionView dequeueReusableCellWithReuseIdentifier:@"PhotoCell" forIndexPath:indexPath];
 
    ALAsset \*asset = self.assets[indexPath.row];
    //cell.asset = asset;
    cell.backgroundColor = [UIColor redColor];
 
    return cell;
}
 
- (CGFloat) collectionView:(UICollectionView \*)collectionView layout:(UICollectionViewLayout \*)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section
{
    return 4;
}
 
- (CGFloat) collectionView:(UICollectionView \*)collectionView layout:(UICollectionViewLayout \*)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section
{
    return 1;
}
```
 |



This code should be fairly straight forward if you have ever worked with a **UITableView.**  The only lines to note are where ‘cell.asset = asset’ is commented out and we set the cell’s background color to red.  We will uncomment that line when we create a custom cell to display the image (for now it won’t).  I have also set the background color to red so that you can see that the number of cells is actually corresponding to the number of photos in the camera roll.


**Build and Run!**


Let’s take a break to do a build and run to see what happens.  If you have hooked everything up correctly, you should see a black screen with red squares on it with a count equalling the number of photos in the user’s library.


[![Screen Shot 2013-07-21 at 9.26.07 PM](/uploads/2013/Screen-Shot-2013-07-21-at-9.26.07-PM-184x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-21-at-9.26.07-PM.png)


Not too exciting, however it shows that we are displaying a number of cells corresponding to the number of photos in the user’s asset library.  At least it’s showing that you have done something.  The next step is to create a custom **UICollectionViewCell** that actually displays the photos, which we will do next time.


### 5. Next Time


That’s all for today.  In a ploy to get you to come back to my site (and [subscribe to my RSS feed](http://feeds.feedburner.com/brandontreb)), I have chosen to break this post up into two parts.


Luckily for you, I wrote the above message a while ago. Click the link below to go to part 2!


[iPhone Programming Tutorial: Creating An Image Gallery Like Over – Part 2](http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-2)


Stay tuned!



[Tweet](http://twitter.com/share)


