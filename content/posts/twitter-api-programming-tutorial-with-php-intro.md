---
date: 2009-02-20T01:00:00-0600
slug: twitter-api-programming-tutorial-with-php-intro
title: "Twitter API Programming Tutorial With PHP &#8211; Intro"
type: post
post_type: note
photos:
- /uploads/2009/picture-15.png "&uuot;picture-15\""
tags:
- Articles
---

[![picture-15](/uploads/2009/picture-15.png "&uuot;picture-15\"")](http://brandontreb.com/wp-content/uploads/2009/02/picture-15.png)

I have recently started using Twitter and completely fell in love with it. Being a programming, this naturally made me want to develop applications for interfacing with it. So, I scoured the internet (checking Twitter’s website as well) to find good \*simple tutorials for doing this. After searching for a while, I couldn’t really find any. Ok, I lied, I found a few but they were terrible. I hate tutorials that assume the reader knows more than they actually do. 


So, I am taking it upon myself to write a series of comprehensive tutorials for interfacing with Twitter. I will first do them all in PHP and then maybe in some other languages. I may even do some in Objective-C to be implemented on the iPhone. These would be written of course at [iCodeBlog.com](http://iCodeBlog.com) 😉 .


Let’s just jump right in. Twitter offers a few ways to interface with their web services, which are all documented on their [API Wiki](http://apiwiki.twitter.com/). The documentation is great, assuming you know the code to get connected and make the calls. So, let’s skip all of the nerdy low level stuff and write an application.


Today, I will be teaching you how to simply connect to Twitter and update your status. This will be pretty straight forward and require very little PHP code. So, grab some coffee, open up your favorite PHP editor (notepad?).


Ok, so let’s start by wrapping our code into an easy to call function. We don’t want to have to copy and paste our Twitter interface code every time we need it in a project. Wouldn’t it be nice if we could just call it like this




```
<code class=’php’>updateTwitter("Just Rockin Out")</code>
```


So let’s begin by declaring a function called **updateTwitter**. Type the following code




```
<code class=’php’>function updateTwitter($status){ 
    // Twitter login information 
    $username = "TwitterUsername"; 
    $password = "TwitterPassword";</code>
```



Our function begins with a declaration of a username and password. This will be *your* Twitter login information. Every Twitter API call requires that you authenticate yourself. Make sure you update the code to include *your* username and password/




Next, we will add the following code to initialize the variables needed to make our Twitter API call. Continue by adding the following code.





```
<code class=’php’>// The url of the update function 
    $url = ‘http://twitter.com/statuses/update.xml’; 
    // Arguments we are posting to Twitter 
    $postargs = ‘status=’.urlencode($status); 
    // Will store the response we get from Twitter 
    $responseInfo=array(); 
    // Initialize CURL 
    $ch = curl_init($url);</code>
```



One thing I want to point out is the URL. Notice the update.xml at the end of it. This is telling the Twitter API we want to call the **update** function and we expect to receive **xml** back. You could also change it to be **update.json** if you want to receive json data back.




The next variable **postargs** is simply the arguments we will pass to the update function. Since these arguments get appended to the URL, they need to be urlencoded. The **responseInfo** array will contain the return data from the cURL request to Twitter. Finally, we just initialize a new cURL session. cURL is just a protocol for transferring data. You can read up on it [on Wikipedia](http://en.wikipedia.org/wiki/CURL) if you feel so inclined.




Next, we need to tell cURL to do a POST rather than a GET and pass it our argument string





```
<code class=’php’>// Tell CURL we are doing a POST 
    curl_setopt ($ch, CURLOPT_POST, true); 
    // Give CURL the arguments in the POST 
    curl_setopt ($ch, CURLOPT_POSTFIELDS, $postargs);</code>
```



The next part is where the magic happens. Here is the next bit of code (I’ll explain it below)…





```
<code class=’php’>// Set the username and password in the CURL call 
    curl_setopt($ch, CURLOPT_USERPWD, $username.’:’.$password); 
    // Set some cur flags (not too important) 
    curl_setopt($ch, CURLOPT_VERBOSE, 1); 
    curl_setopt($ch, CURLOPT_NOBODY, 0); 
    curl_setopt($ch, CURLOPT_HEADER, 0); 
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // execute the CURL call 
    $response = curl_exec($ch); 
    // Get information about the response 
    $responseInfo=curl_getinfo($ch); 
    // Close the CURL connection curl_close($ch);</code>
```



Wow! that looks like a lot of nerdy code. Good thing you only have to write it once and don’t have to understand it (unless you want to). The first line sets the username and password fields in our cURL call. When we first connect with the Twitter API, it will prompt for a username and password. cURL will automatically feed the username and password to the API.  The next few lines are not super important. If you one of those people that get hung up on that sort of thing, you can read about them [here](http://us.php.net/curl). We’re almost done, I promise… Finally, we make the cURL call itself by calling curl\_exec. This will return a response **from Twitter** which will contains some XML if your call completed successfully. The next line, gets the http response (makes sure you were able to connect to Twitter). If it is anything other than 200 (HTTP OK), it means your cURL request never even reached Twitter. Here is the last bit of code





```
<code class=’php’>// Make sure we received a response from Twitter 
    if(intval($responseInfo[‘http_code’])==200){ 
        // Display the response from Twitter 
        echo $response; 
    }else{ 
        // Something went wrong 
        echo "Error: " . $responseInfo[‘http_code’]; 
    } 
} 
?></code>
```



All this code really does is makes sure we got a 200 code (successfully reached Twitter). If so, it prints out the XML that Twitter returned to us.  Now you have a handy-dandy function you can call whenever we want to update your Twitter status from your website. Simply type





```
<code class=’php’>updateTwitter("Just finished a sweet tutorial on http://brandontreb.com")</code>
```



and like magic, your Twitter status will be updated. This has many different uses as you can imagine. Join me next time when I will be putting this code into a PHP class as well as implementing the rest of the Twitter API functions. We will then be able to use this Twitter class in a variety of PHP applications. So , be sure to [subscribe to my RSS feed](http://feeds2.feedburner.com/brandontreb) and feel free to ask me any questions in the comments section of this post. You can also download the source code of this tutorial here… (insert clever tag line here (iCodeBlog’s is happy iCoding, I need a new one)). 




[Tweet](http://twitter.com/share)

