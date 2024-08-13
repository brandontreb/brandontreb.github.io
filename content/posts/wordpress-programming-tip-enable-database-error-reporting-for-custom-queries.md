---
date: 2010-03-12T01:00:00-0600
slug: wordpress-programming-tip-enable-database-error-reporting-for-custom-queries
title: "WordPress Programming Tip: Enable Database Error Reporting For Custom Queries"
type: post
post_type: note
photos:
- /uploads/2010/reblog_e.png?x-id=a1d99446-c73f-4722-97e6-3e584300069e
tags:
- Wordpress
---
So this one should seem pretty obvious, but it wasn’t apparent to me at first.  It was only after digging through the wp-db.php file that I discovered how to enable error reporting.


#### The Problem


As you may have discovered, the wp\_query() function isn’t a “one size fit’s all” solution.  Often times, you may need to query the WordPress database using a custom MySQL query.  Especially  if you are using WordPress for anything other than a blog (ie [freshapps.com](http://freshapps.com)).


When writing custom queries, it can often be frustrating if you make a mistake in the SQL syntax as WordPress will simply display no results.  For example:





|  |
| --- |
| 
```
$results = $wpdb->get\_results("SELECT \* FROM $wpdb->posts 
 WHERE post\_title = ‘foo bar baz");
print\_r($results);
 
// Outputs Array ( )
```
 |



Since we have made an error in our SQL statement (I didn’t add the second single quote), WordPress will suppress it and simply return an empty array. This is not very helpful for debugging.


#### The Solution


The solution is actually quite simple. The global $wpdb object has a property called show\_errors. Setting this property to true will cause WordPress to output the SQL errors to the screen for a given query.


Here it is with our example above





|  |
| --- |
| 
```
// Enables Wordpress’s DB Error reporting
$wpdb->show\_errors = true;
 
$results = $wpdb->get\_results("SELECT \* FROM $wpdb->posts 
 WHERE post\_title = ‘foo bar baz");
print\_r($results);
 
// Outputs 
// WordPress database error: [You have an error in your 
// SQL syntax; check the manual that corresponds to your 
// MySQL server version for the right syntax to use near 
// ”foo bar baz’ at line 1]
// SELECT \* FROM wp\_posts WHERE post\_title = ‘foo bar baz
```
 |



Now we know what went wrong with our query rather than just receiving empty results.


Let me know if you have any questions or comments.


Happy WPCoding!



[![Reblog this post [with Zemanta]](/uploads/2010/reblog_e.png?x-id=a1d99446-c73f-4722-97e6-3e584300069e)](http://reblog.zemanta.com/zemified/a1d99446-c73f-4722-97e6-3e584300069e/ "Reblog this post [with Zemanta]")


[Tweet](http://twitter.com/share)


