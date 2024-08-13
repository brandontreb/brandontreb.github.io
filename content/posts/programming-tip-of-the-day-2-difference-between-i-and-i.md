---
date: 2009-12-04T01:00:00-0600
slug: programming-tip-of-the-day-2-difference-between-i-and-i
title: "Programming Tip Of The Day #2 &#8211; Difference Between i++ and ++i"
type: post
post_type: note

tags:
- Articles
---
To some, this should seem a bit obvious and if I am insulting your intelligence by discussing it, I am sorry. But, one of the main reasons I want to discuss this topic is, I was asked this question in a job interview for Lockheed Martin.


**What is the difference between i++ and ++i?**


The answer is actually quite simple.


### i++ first evaluates the value of i and then increments it


### ++i increments the value of i and then evaluates it


Here is a brief example to demonstrate what I mean.





|  |
| --- |
| 
```
// Example: i++ 
$i = 5;
echo "The value of i is " . $i++ ;
// Output "The value of i is 5"
// i = 6
 
// Example: ++i 
$i = 5;
echo "The value of i is " . ++$i;
// Output "The value of i is 6"
// i = 6
```
 |



So, now if you are ever asked about this in an interview, you will have a response.


Happy programming!



[Tweet](http://twitter.com/share)

