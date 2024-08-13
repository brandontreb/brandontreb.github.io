---
date: 2011-06-04T00:00:00-0600
slug: autonomous-steering-behaviors-in-corona-sdk-games
title: "Autonomous Steering Behaviors In Corona SDK Games"
type: post
post_type: note

tags:
- Game Development
---
Wow, it’s already been 5 months since I was last blogging for #iDevBlogADay. The time has flown by!


Recently, I have been dabbling with [Corona SDK](http://www.anscamobile.com/corona/) and have been getting really excited about the possibilities. For those of you who don’t know, Corona SDK is a multi platform game engine that allows you to write your code in Lua and deploy on iOS and Android devices.


Today I want to chat with you about Autonomous Steering Behaviors and show you how I have implemented a few of them in a small game that I’m working on.


Here is a short demo video of what we will be creating



  


[Boids Demo](http://vimeo.com/24649841) from [Brandon Trebitowski](http://vimeo.com/user2413855) on [Vimeo](http://vimeo.com).
 







#### 
 What Are Autonomous Steering Behaviors



 The name does sound pretty fancy. At the core they are just behaviors that define how a character interacts with the world around them in a life-like manner. Some of the main behaviors include wandering, path following, flocking, pursing and evading. The theory and algorithms for all of these behaviors and more can be found in a paper published by Craig Reynolds in the 80’s called [Steering Behaviors For Autonomous Characters](http://www.red3d.com/cwr/steer/).
 



 While I admit I didn’t quite read all of it, the paper contains some incredible gems in terms of making your character AI seem much more life like.
 



 There are plenty of examples (especially in games) where these behaviors come in handy. Perhaps the easiest behavior to implement is wander. Say for example you have an NPC (non player character) that walks around a village. The wander algorithm is a perfect fit to make it seem like that NPC is actually “thinking” about where he’s going and keeps your animations looking smooth.
 



 The seek and evade is another interesting algorithm. Often times in our games, we want enemies to chase after us without it seeming like they have the exact shortest path to use. It adds a bit of randomness and makes your enemies seem much more realistic.
 


#### 
 How Can I Use Them In My Corona SDK Game?



 After doing a bit of research, I found this [incredible site by daniel shiffman](http://www.shiffman.net/teaching/nature/steering/) that detailed some of the algorithms using processing. This at least took the words from the paper and made them in to some code. I really suggest that you read up on that page to get a solid understanding of what we are doing here. Rather than simply regurgitating what Daniel wrote, I’m going to focus on showing you how his code can be ported for use in your Corona SDK games.
 



 The first challenge was, the code relies heavily on using 2D vectors. Now, I didn’t see a nice built-in way to do this in Corona or Lua for that matter. So I decided to roll my own Vector2D class. For those Corona SDK veterans reading this, feel free to blast me in the comments if I’m reinventing the wheel with this and just failed to fully read the documentation. Otherwise, enjoy this Vector2D class!
 



[Here is the link](https://gist.github.com/1006414) to the gist containing that file.
 



 Here is a short snippet of that class just to add to the aesthetics of this post:
 




```
<code class=’lua’>function Vector2D:new(x, y)  – The constructor
  local object = { x = x, y = y }
  setmetatable(object, { __index = Vector2D })  – Inheritance
  return object
end
function Vector2D:normalize()
local temp
temp = self:magnitude()
if temp > 0 then
self.x = self.x / temp
self.y = self.y / temp
end
end


function Vector2D:dot(vec)
return self.x \* vec.x + self.y \* vec.y
end</code>


```



 Basically it’s a lua “object” that has an x and y with some helper methods for doing vector math. The lower case methods act on the current self object and the upper case methods act as static class level methods meant to return a new vector. The file is a little sloppy but it gets the job done.
 


#### 
 Creating A Boid



 In the paper, an autonomous character is called a Boid. There are basically 2 actions that we need to implement that are needed in most of the behaviors. They are **steer** and **seek**. **Steer** is the basis for all of the autonomous behaviors. Given a Vector2D as the target, it will return a new Vector2D for the boid’s acceleration in the direction of the target. We simply wrap this call in the **seek** method. Now, any behavior can call **seek** in order to direct the boid towards a target.
 



[Here is a link to our Boid on github](https://github.com/brandontreb/Boids/blob/master/Boid.lua)




 A snippet of the wander function
 




```
<code class=’lua’>function Boid:wander()
    local wanderR = 16.0
    local wanderD = 60.0
    local change  = 0.5

```
local negChange = math.random(2)
local randomNum = math.random() * change
if negChange == 2 then
    self.wanderTheta = self.wanderTheta - randomNum
else 
    self.wanderTheta = self.wanderTheta + randomNum
end 
local circleLoc = self.vel:copy()


circleLoc:normalize()
circleLoc:mult(wanderD)
circleLoc:add(self.loc)


local circleOffset = Vector2D:new(wanderR*math.cos(self.wanderTheta),
wanderR*math.sin(self.wanderTheta))
local target = circleLoc:copy()
target:add(circleOffset)


self.acc:add(self:steer(target))



```

end</code>


```



 What I have done is taken the code from [Daniel Shiffman’s processing project](http://www.shiffman.net/itp/classes/nature/week06_s09/wander/) and ported it directly to lua. As of right now, I have only implemented wander, however you can see how easy it is to implement other behaviors using the same techniques. Since Daniel has processing code for each of them, it’s a simple matter of making them work in your lua class.
 



 The way wander works is, it picks random points on a circle to steer towards. These random points only vary by a fraction of a radian (defined by the **change** variable above) from the current steer point. The larger the change value is, the more your boid will appear jittery. This value must be tweaked to fit the wander style for your game. Based on my testing, .5 seems to generate a pretty smooth wander path.
 


#### 
 Putting It All Together



 In your own code you might want to build directly on top of my boid class or subclass it for each boid type. In the following example, I’m going to show you how to simply run our boid class and watch some dots wander around (hang on to your hats).
 



[Here is a link to main.lua on github](https://github.com/brandontreb/Boids/blob/master/main.lua), but I have also pasted it here so we can talk about it.
 




```
<code class=’lua’>local Boid = require(‘Boid’)
– Define some limiting constants
MAX\_FORCE = 1.75
MAX\_SPEED = 2.0


local wanderers = {}


function animate(event)
for i=1,#wanderers do
local wanderer = wanderers[i]
wanderer:wander()
wanderer:run()
end
end


function Main()
math.randomseed( os.time() )



```
for i=1,10 do
    local loc = Vector2D:new(display.contentWidth / 2,display.contentWidth / 2)
    local wanderer = Boid:new(loc,MAX_FORCE,MAX_SPEED)
    table.insert(wanderers,wanderer)
end
Runtime:addEventListener( "enterFrame", animate );



```

end


Main()</code>


```



 Here we declare an array of wanderers. In the Main() method we initialize each one, insert them into the array, and add a hook to call our animate method for each frame. Inside of the animate method, we simply tell each wanderer to wander and then run itself. The boid class will take care of the rest.
 



 One thing to note is, the boids are unaware of each other at this time. That requires a cohesion method. I have it written and might post it up at a later time; I just want to keep things simple for now. Please feel free to ask me questions in the comments or [write me on Twitter](http://twitter.com/brandontreb).
 



 You can download or fork the full source for this project [here](https://github.com/brandontreb/Boids).
 



 Happy Coding!
 



***﻿﻿This post is part of [iDevBlogADay](http://idevblogaday.com/), a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the [web site](http://idevblogaday.com/), [RSS feed](http://feeds.feedburner.com/idevblogaday), or [Twitter](http://twitter.com/#search?q=%23idevblogaday).***




[Tweet](http://twitter.com/share)


