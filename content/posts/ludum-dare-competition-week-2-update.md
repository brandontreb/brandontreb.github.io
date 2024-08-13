---
date: 2010-10-20T00:00:00-0600
slug: ludum-dare-competition-week-2-update
title: "Ludum Dare Competition: Week 2 Update"
type: post
post_type: note
photos:
- /uploads/2010/Screen-shot-2010-10-19-at-2.37.00-PM-500x350.png "Screen shot 2010-10-19
  at 2.37.00 PM"
tags:
- iPhone
---
So another week has gone by and I have made quite a bit of progress, here are the additions since I last posted.


* Texturing
* Lighting
* Skybox
* Better Terrain generation
* Environment Fog
* Basic navigation


So judging by the screenshot, you might really be thinking that I’m working on Minecraft for the iPhone (I used textures that someone created for Minecraft). While this isn’t my intention, it is starting to look like my engine would be perfect for a simple port. Perhaps, I may consider creating something inspired by Minecraft in the future. For now, I will be sticking to my current game idea which I call Cube Hive.


As I continue to update this blog, the game idea will become more and more apparent but basically I want to create a game [similar to this](http://sites.google.com/site/handkor/hive%E2%80%99sprojectpage) on the iPhone in a cube environment.


Anyway, here is a screenshot of where I’m at:


[![](/uploads/2010/Screen-shot-2010-10-19-at-2.37.00-PM-500x350.png "Screen shot 2010-10-19 at 2.37.00 PM")](http://brandontreb.com/wp-content/uploads/2010/10/Screen-shot-2010-10-19-at-2.37.00-PM.png)


Oh, and BTW doing Fog in OpenGL ES is crazy easy. Here is the code (thanks to [Mike Daley](http://twitter.com/#!/mikedaley) of [71 Squared](http://www.71squared.com/) for showing me this)




```
<code class=’objc’>GLfloat fogColor[] = {1.0f, 1.0f, 1.0f, 1.0f};
    glFogf(GL_FOG_MODE, GL_LINEAR);
    glFogfv(GL_FOG_COLOR, fogColor);
    glFogf(GL_FOG_DENSITY, 0.5f);
    glHint(GL_FOG_HINT, GL_DONT_CARE);
    glFogf(GL_FOG_START, 10);
    glFogf(GL_FOG_END, 20);
    glEnable(GL_FOG);</code>
```


That’s it! Such a great effect with so little effort.


Anyway, I don’t foresee my game being completed by the end of this month for the Ludum Dare competition. However, I have been working on a killer MUD client for the iPhone that I will most likely submit. I feel that current solutions are clunky, ugly, and unintuitive (sorry if you are a reader and a dev of one of these :/).


I should have some screenshots up soon.


I would love to hear thoughts/opinions of doing a Minecraft inspired game as well?



[Tweet](http://twitter.com/share)


