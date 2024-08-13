---
date: 2010-11-11T01:00:00-0600
slug: core-data-quicktip-inverse-relationships
title: "Core Data QuickTip: Inverse Relationships"
type: post
post_type: note

tags:
- Mac
---
One thing I always wondered about Core Data is why the compiler would warn you if you didn’t specify the inverse relationship. After reading through Apple’s docs, they essentially say its to make your database more robust by reinforcing those relationships. Plus, you never know when you may have one thing and need to get to the other.


After working on a project with an Enormous Core Data database, I found one very useful thing about inverses. When you specify one side of the relationship, core data automatically hooks up the other. Allow me to explain in code.


Let’s say we have a person object with many pets…




```
<code class=’objc’>Person *john = [[Person alloc] init];
Pet *pet = [[Pet alloc] init];
// Add the one to many relationship from john to pets
[john addPetObject:pet];


// Add the inverse relationship
[pet setPerson:john];</code>


```


So, I was doing this in all of my code and then forgot to one time. However, to my surprise, everything still worked. Why, because once you set up one of the relationships, Core Data automatically handles the other. So, the above code is redundant and could just as easily have been.




```
<code class=’objc’>[john addPetObject:pet];</code>
```


OR




```
<code class=’objc’>[pet setPerson:john];</code>
```


and both directions of the relationship would have been established.


Not super exciting, but I found it to be pretty handy and also saved me quite a bit of extra code.


Happy Coding!



[Tweet](http://twitter.com/share)

