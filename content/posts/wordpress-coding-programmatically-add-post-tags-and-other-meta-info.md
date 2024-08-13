---
date: 2010-03-17T00:00:00-0600
slug: wordpress-coding-programmatically-add-post-tags-and-other-meta-info
title: "WordPress Coding: Programmatically Add Post Tags (and other meta info)"
type: post
post_type: note
photos:
- /uploads/2010/561962_price_tag[3].jpg "Tags"
tags:
- Wordpress
---
![](/uploads/2010/561962_price_tag[3].jpg "Tags") 
I was recently working on a script that imports from a custom blogging platform into WordPress and had some need to programmatically add post keywords.
The script to do this is actually quite simple and can be used to update any post attribute.


Here is the code:





|  |
| --- |
| 
```
// Create the post array
$post = array(
    ‘ID’ => 5,
    ‘tags_input’ => ‘foo,bar,baz’);     
 
// Update the post
wp_update_post($post);
```
 |



This will assign the keywords “foo”, “bar”, and “baz” to the post with ID 5. This task seems trivial, however it’s very powerful when you think about automation. For example, you could write a script to scrape a google search for your target keyword and find related keywords for each of your posts automatically. Hrm… plugin idea?


Give it a shot. More info on available parameters can be found on [WordPress’ site here](http://codex.wordpress.org/Function_Reference/wp_insert_post)


Here are some of the other fields that you are able to update this way:





|  |
| --- |
| 
```
defaults = array(
‘post_status’ => ‘draft’, 
‘post_type’ => ‘post’,
‘post_author’ => $user\_ID,
‘ping_status’ => get_option(‘default_ping_status’), 
‘post_parent’ => ,
‘menu_order’ => ,
‘to_ping’ =>  ”,
‘pinged’ => ”,
‘post_password’ => ”,
‘guid’ => ”,
‘post_content_filtered’ => ”,
‘post_excerpt’ => ”,
‘import_id’ => );
```
 |



Happy WPCoding!



[Tweet](http://twitter.com/share)


