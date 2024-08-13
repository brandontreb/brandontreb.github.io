---
date: 2013-08-15T00:00:00-0600
slug: iphone-programming-tutorial-creating-an-image-gallery-like-over-part-2
title: "iPhone Programming Tutorial: Creating An Image Gallery Like Over &#8211; Part 2"
type: post
post_type: note
photos:
- /uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png
- /uploads/2013/Screen-Shot-2013-07-24-at-6.43.38-PM-300x281.png
- /uploads/2013/Screen-Shot-2013-07-24-at-6.46.35-PM.png
- /uploads/2013/Screen-Shot-2013-07-24-at-6.49.51-PM.png
- /uploads/2013/Screen-Shot-2013-07-24-at-7.07.14-PM.png
- /uploads/2013/Screen-Shot-2013-07-24-at-6.52.32-PM-300x147.png
- /uploads/2013/Screen-Shot-2013-07-24-at-7.10.39-PM-184x300.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.35.06-PM.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.44.23-PM.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.40.13-PM-177x300.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.41.54-PM-154x300.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.47.26-PM-300x213.png
- /uploads/2013/Screen-Shot-2013-07-25-at-12.51.25-PM-300x221.png
tags:
- iPhone Programming
- alassetslibrary-tutorial
- iOS-programming
- uicollectionview-tutorial
- iPhone App Development
---
[![Screen Shot 2013-08-09 at 8.36.42 PM](/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png)](/uploads/2013/Screen-Shot-2013-08-09-at-8.36.42-PM.png)


 


Welcome to the second part of my tutorial series “**Creating An Image Gallery Like Over”.**  In this part of the tutorial, you will learn how to actually display the photos in the UICollectionView as well as give the user the ability to take photos with their camera.


If you haven’t already done so, please go back and [complete part 1](http://brandontreb.com/iphone-programming-tutorial-creating-an-image-gallery-like-over-part-1).


### 1. Custom UICollectionViewCell


Start by creating a new subclass of **UICollectionViewCell** and naming it \*\*PhotoCell.  \*\*Now, open up PhotoCell.h and add the following code:





|  |
| --- |
| 
```
#import <AssetsLibrary/AssetsLibrary.h>
 
@interface PhotoCell : UICollectionViewCell
@property(nonatomic, strong) ALAsset \*asset;
@end
```
 |



Now, open PhotoCell.m and add the following code:





|  |
| --- |
| 
```
#import "PhotoCell.h"
 
@interface PhotoCell ()
// 1
@property(nonatomic, weak) IBOutlet UIImageView \*photoImageView;
@end
 
@implementation PhotoCell
- (void) setAsset:(ALAsset \*)asset
{
    // 2
    _asset = asset;
    self.photoImageView.image = [UIImage imageWithCGImage:[asset thumbnail]];
}
@end
```
 |



1. This is an \*\*IBOutlet \*\*to a **UIImageView** that we will create inside of the Storyboard
2. We overwrite the setter method for the asset in order to convert the asset’s thumbnail into a UIImage and set it to the contents of the UIImageView


Now that we have the custom cell created, we need to hook it up and create the UIImageView inside of Storyboard.  Open \*\*MainStoryboard.storyboard \*\*and click on the default **UICollectionViewCell** inside of your **UICollectionView.**


It might be tricky to see the cell as it has a white background and blends in, but it’s there.


[![Screen Shot 2013-07-24 at 6.43.38 PM](/uploads/2013/Screen-Shot-2013-07-24-at-6.43.38-PM-300x281.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-6.43.38-PM.png)


Now, click on the **Identity Inspector** from the right side bar and change the class to **PhotoCell.**  This will inform interface builder that this object is of the type PhotoCell and let us hook up the photoImageView outlet.


[![Screen Shot 2013-07-24 at 6.46.35 PM](/uploads/2013/Screen-Shot-2013-07-24-at-6.46.35-PM.png)](/uploads/2013/Screen-Shot-2013-07-24-at-6.46.35-PM.png)


Next, open the size inspector, change the size to \*\*Custom, \*\*the width to \*\*104 \*\*and the height to **104.**  This will give us nice sized images, with a good amount of padding between them.


[![Screen Shot 2013-07-24 at 6.49.51 PM](/uploads/2013/Screen-Shot-2013-07-24-at-6.49.51-PM.png)](/uploads/2013/Screen-Shot-2013-07-24-at-6.49.51-PM.png)


The **UICollectionView** will overwrite these sizes, so we need to change it in one other location.  To ensure that the cells stay the correct size, click on the **Collection View** in left side bar and open it’s **Size Inspector**.  Then set the **Cell Size** width and height to 104.


[![Screen Shot 2013-07-24 at 7.07.14 PM](/uploads/2013/Screen-Shot-2013-07-24-at-7.07.14-PM.png)](/uploads/2013/Screen-Shot-2013-07-24-at-7.07.14-PM.png)


The final step here is to drag a **UIImageView** on to your cell (scaling it to fit the entire cell size), and hook up the **IBOutlet** to the photoImageView. Do this by control-click and dragging from Photo Cell to the ImageView and selecting **photoImageView**.


[![Screen Shot 2013-07-24 at 6.52.32 PM](/uploads/2013/Screen-Shot-2013-07-24-at-6.52.32-PM-300x147.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-6.52.32-PM.png)


If you build and run at this stage, nothing will be different.  That’s because we still need to tell the ViewController class about our new **PhotoCell**.  Open \*\*ViewController.m \*\*and import **PhotoCell.h**.





|  |
| --- |
| 
```
#import "PhotoCell.h"
```
 |



Now, head down to the **collectionView:cellForItemAtIndexPath** method and replace the contents of it with the following code:





|  |
| --- |
| 
```
- (UICollectionViewCell \*) collectionView:(UICollectionView \*)collectionView cellForItemAtIndexPath:(NSIndexPath \*)indexPath
{
    PhotoCell \*cell = (PhotoCell \*)[collectionView dequeueReusableCellWithReuseIdentifier:@"PhotoCell" forIndexPath:indexPath];
 
    ALAsset \*asset = self.assets[indexPath.row];
    cell.asset = asset;
    cell.backgroundColor = [UIColor redColor];
 
    return cell;
}
```
 |



What’s changed here is, we are now telling the **UICollectionView** that the cell it’s returning is of the type **PhotoCell**. Also, we are fetching the **ALAsset** out of our array at each index and sending it to the cell so that it can display it’s thumbnail.


**Build And Run!**


[![Screen Shot 2013-07-24 at 7.10.39 PM](/uploads/2013/Screen-Shot-2013-07-24-at-7.10.39-PM-184x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-24-at-7.10.39-PM.png)


Whoohoo\*\*! \*\*You should now see your photos populating the \*\*UICollectionView. Congratulations! 


While, this is definitely cool, you might now be wondering “how do I select a photo?”.  Great question, and here is the solution.


### 2. Selecting Photos


Now that you have all of the groundwork in place, selecting photos from the collection could not be easier.  Open up **ViewController.m** and replace the \*\*collectionView:didSelectItemAtIndexPath \*\*method with the following code:





|  |
| --- |
| 
```
- (void) collectionView:(UICollectionView \*)collectionView didSelectItemAtIndexPath:(NSIndexPath \*)indexPath
{
    ALAsset \*asset = self.assets[indexPath.row];
    ALAssetRepresentation \*defaultRep = [asset defaultRepresentation];
    UIImage \*image = [UIImage imageWithCGImage:[defaultRep fullScreenImage] scale:[defaultRep scale] orientation:];
    // Do something with the image
}
```
 |



This will get the selected asset and convert it to a UIImage. You are now free to use the UIImage how you want. Perhaps you create a protocol for this class and make a callback to a delegate OR maybe you add this to a UINavigationController stack and push a new view controller on to the stack containing this image. The sky is the limit!


If you look at the Over app and back to your image gallery that you just created, you will notice something is still missing.  What if the user wants to take a photo or access other albums?  This is where Over adds a bar across the top of the interface with 2 buttons that fall back to the “default” style of fetching images if the user wants to take a photo or access a different photo album.  Let’s build this out now.


### 3. Building The Interface To Take Photos And Access Albums


Start by setting up the **IBActions** for theses buttons.  Open **ViewController.m** and add the following empty methods:





|  |
| --- |
| 
```
#pragma mark - Actions
 
- (IBAction)takePhotoButtonTapped:(id)sender
{
 
}
 
- (IBAction)albumsButtonTapped:(id)sender
{
 
}
```
 |



We don’t need to add the code yet since we still need to build the UI and hook up the **IBOutlets**. Now open \*\*MainStoryboard.storyboard \*\*and drag a \*\*UIView \*\*right on top of your **UIView.**


One issue you might run in to here is the view will want to become a subview of the collection view.  To combat this, drag the view outside of the collection view inside the left bar so the hierarchy will look like this:


[![Screen Shot 2013-07-25 at 12.35.06 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.35.06-PM.png)](/uploads/2013/Screen-Shot-2013-07-25-at-12.35.06-PM.png)


 


One other “gotcha” is, you must ensure that the view is positioned **below** the collection view in this list, otherwise it won’t show above it on screen.


Now, let’s manually size and position the view as Interface Building will make things hard on us if we want to position it over our collection view.


Select the view and open the **Size Inspector.** Set the values as follows:


[![Screen Shot 2013-07-25 at 12.44.23 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.44.23-PM.png)](/uploads/2013/Screen-Shot-2013-07-25-at-12.44.23-PM.png)


 


Again, remember this positioning is optimized for the iPhone 5. So make sure you are testing with that simulator or you won’t see this bar.


After this, the bar still won’t be visible inside of Interface Builder.  We need to set the background color to black with some transparency.  Open the **Attributes Inspector** and click on the background color.  Then set the color to black with 80% opacity:


[![Screen Shot 2013-07-25 at 12.40.13 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.40.13-PM-177x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.40.13-PM.png)


 


You should now see the bar positioned on the screen like this:


[![Screen Shot 2013-07-25 at 12.41.54 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.41.54-PM-154x300.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.41.54-PM.png)


 


Now drag a \*\*UIButton \*\*on to the view you just created. There are a few things that must be done to style the button:


1. Position it at 0,0
2. Set the width to 160px and the height to 70x
3. Change the type to custom
4. Change the text to “Take Photo”
5. Change the font to “Helvetica Neue Condensed Black” size 20
6. Set the text color to white


When you have completed these steps, the button should look like this:


[![Screen Shot 2013-07-25 at 12.47.26 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.47.26-PM-300x213.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.47.26-PM.png)


 


Now, hook up the **IBAction **by opening the **Connections Inspector** and dragging from **Touch Up Inside** to the **View Controller** object and selecting t**akePhotoButtonTapped:**


Finally, duplicate this button (copy and paste), rename the title to “Albums”, move it next to the “Take Photo” button and hook its **Touch Up Inside** to **albumsButtonTapped:**


The final Interface should look like this:


[![Screen Shot 2013-07-25 at 12.51.25 PM](/uploads/2013/Screen-Shot-2013-07-25-at-12.51.25-PM-300x221.png)](http://brandontreb.com/wp-content/uploads/2013/07/Screen-Shot-2013-07-25-at-12.51.25-PM.png)


 


Go ahead and do a **Build and Run** and this stage and marvel at your interface development prowess!


### 4. Actually Taking Photos And Accessing Albums


The final step for this tutorial is to implement the code to bring up the camera as well as bring up the photo albums.  Let’s start with the camera.  Open **ViewController.m** and add the following code to the **takePhotosButtonTapped:** method:





|  |
| --- |
| 
```
- (IBAction)takePhotoButtonTapped:(id)sender
{
    if (([UIImagePickerController isSourceTypeAvailable:
          UIImagePickerControllerSourceTypeCamera] == NO))
        return; // 1
 
    // 2
    UIImagePickerController \*mediaUI = [[UIImagePickerController alloc] init];
    mediaUI.sourceType = UIImagePickerControllerSourceTypeCamera;
    mediaUI.allowsEditing = NO;
    mediaUI.delegate = self;
    // 3
    [self presentViewController:mediaUI animated:YES completion:nil];
}
```
 |



1. Makes sure that the photo library is available.  If the user declines photo access, this will be the case.
2. Create the **UIImagePickerController** and set its source type to **UIImagePickerControllerSourceTypeCamera**.  This lets the media picker know to use the camera and not the image library.
3. Finally, present the view controller modally


The method to bring up the photo albums is almost identical to the method above.  Add the following code to the **albumsButtonTapped:** method.





|  |
| --- |
| 
```
- (IBAction)albumsButtonTapped:(id)sender
{
    if (([UIImagePickerController isSourceTypeAvailable:
          UIImagePickerControllerSourceTypePhotoLibrary] == NO))
        return;
 
    UIImagePickerController \*mediaUI = [[UIImagePickerController alloc] init];
    mediaUI.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;    
    mediaUI.allowsEditing = NO;
    mediaUI.delegate = self;
    [self presentViewController:mediaUI animated:YES completion:nil];
}
```
 |



As I said before, this method is almost identical with the only difference being, we are using \*\*UIImagePickerControllerSourceTypePhotoLibrary \*\*to open up the photo albums.


**Build and Run** and tap the “Take Photo” button. Make sure you are testing on the device at this stage or nothing will happen since the simulator doesn’t have a camera.  You can however test the “Albums” button assuming you have some photos in your photo library.


Now that you are able to pick a photo, you need to be able to access the photo that was selected or taken.  To do this implement the following delegate method for **UIImagePickerController.**





|  |
| --- |
| 
```
#pragma mark - image picker delegate
 
- (void) imagePickerController:(UIImagePickerController \*)picker didFinishPickingMediaWithInfo:(NSDictionary \*)info
{
    UIImage \*image = (UIImage \*) [info objectForKey:
                                          UIImagePickerControllerOriginalImage];    
    [self dismissViewControllerAnimated:YES completion:^{
        // Do something with the image
    }];
}
```
 |



This method fetches the selected (or taken) image and stores. It then dismisses the camera or photo albums allowing you to do whatever is needed with the image.


### 5. Next Steps


By now, you should have learned how to use the \*\*ALAssets \*\*library to interact with a user’s photos and use them to build a custom interface. You also learned how to use a **UICollectionView** to display a grid of photos.


With this knowledge in hand, you should now be able to make much more interesting photo selection interfaces than the default one Apple has to offer.  Other apps like Google+ and Instagram both have very slick photo pickers and I hope this tutorial has your gears going thinking about other interesting photo selection interfaces.


You can download the source from this tutorial on [GitHub](https://github.com/brandontreb/OverPicker)


Feel free to leave a comment if you have any questions. Happy Hacking!


 



[Tweet](http://twitter.com/share)


