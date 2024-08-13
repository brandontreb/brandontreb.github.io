---
date: 2009-12-03T01:00:00-0600
slug: programming-tip-of-the-day-1-ternary-operator
title: "Programming Tip Of The Day #1 &#8211; Ternary Operator"
type: post
post_type: note

tags:
- Articles
---
So, I though I’d start this series called Programming Tip Of The Day to write about useful things I come across in programming. Both to educate my readers and as a personal archive of ideas and tips.


I will kick it off today with a quick rant about the **ternary operator**. I <3 the ternary operator. It’s quick, efficient and saves a lot of ugly code.


For those of you who don’t know, the ternary operator is made up of 3 elements: The condition and two results. It is of the form:


## (condition) ? (result if true) : (result if false);


This is much nicer than an if statement. So here is a brief example about how a ternary operator can replace an if-statement.


### if-statement




```
<code class=’c’>if(isSnowing) {
    iMustBe = "cold";
} else {
    iMustBe = "warm";
}</code>
```


### Same thing using ternary




```
<code class=’c’>iMustBe = isSnowing ? "cold" : "warm";</code>
```


That is so much easier to read (IMHO). You can even do clever things in printing. Here is a small example in PHP for using the ternary operator when doing an echo.




```
<code class=’php’><?php
  echo "I am a ".((height > 72) ? "tall" : "short")." person!";
?></code>
```


Most languages support the ternary operator. Check out [this wiki page](http://en.wikipedia.org/wiki/Ternary_operation) if you want more info.


Happy programming!



[Tweet](http://twitter.com/share)


