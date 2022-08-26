8/11
Hoorah - the moment has finally arrived to create my first full blown web page. I'm excited to get started on this and see how it evolves over time.  

I finally got past cors on using my own machine for a server - that was pretty sweet. 

8/12
Learning about naming conventions in SQL. 

8/21
Worked on database structure and created my first few to get to work on the app. I was able to implement on primary/foreign keys, and also build a mapping database to keep track of pre-built workouts, as well as logged workouts. 
Starting to implement Passport.js as well to begin creating some auth aspects of the app.
I learned the date data type in SQL is in the YYYY-MM-DD format, and in order to get that in JS I need to do new Date().toISOLocaleString().split('T')[0]
I did some more Routing today - creating pages and links.

8/22
Today I started using Passport for the first time. I was able to get my Google Auth2 setup and working.
I mapped out all (for now, I'm sure) of the APIs to create for the website, and started implementing the documentation through Swagger.
I ended up doing some research on the various Auth flows as well

Access Code (Authorization Code Grant) - App has a backend
Application (Client Credentials Grant) - only when User & App are the same entity (app has limited usage as it only serves one user)
Implicit - works best if the App is a single-page app or a native mobile app
Password - last resort, user hands PW credentials to application, only if App & OAuth Server belong to the same entity

8/23
Today I'm 