8/11
Hoorah - the moment has finally arrived to create my first full blown web page. I'm excited to get started on this and see how it evolves over time.  

I finally got past cors on using my own machine for a server - that was pretty sweet. 

8/21
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

8/25
Was able to implement mongodb with full crud. The U part was definitely the most intense part - learning how to use defaultValue & defaultChecked when editing existing lift's was great. I know there is a lot to learn in regards to standard folder practices and organization practices for true constant variables.

8/26
I got sick of the look of my different routes during testing, so I added some CSS to make it look more appealing, and also changed up where some of my routes were displayed.

8/27
I started off by breaking out my express portion of my app onto it's own app. 
Learned:
when I call next() during express middleware, I need to 'return next()', otherwise the function will still call any lines after the next().
I was able to slam my head into the wall for 10 minutes figuring out why my req.body wasn't sending to my post route, only to realize I hadn't needed to add a body-parser to my express app yet. body-parser.json() ftw.

8/28
Reiterating the need to 'return' a next call during error handling. If you just call next(err) within your middleware, it will still run the remaining code and try to return some (likely) null information. Implemented some custom error handling on the server side.

8/29
Going through some form validation on the client side.

8/31
I've been updating my workout structure on my API and client side. Where I'm at currently
Workout CRUD
C - X
R - X(all) X(single)
U - X
D - X


9/9
I've been a little bit disrupted with the holiday weekend, but have been working on this still when I can. I've completed the CRUD for the workouts. Now I begin working on mapping lift's to each workout.
Workout Lift CRUD
C - O
R - O
U - O
D - O

9/12
Did some CSS updating and made some decisions on data flow for adding lifts to workouts. I need to..
1)add lift to DB when I click add lift
2)delete lift from DB when I click delete