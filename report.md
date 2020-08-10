# Final Project Report

by Rubber Ducks

Team Members:

Binyu Wang [biw21@pitt.edu](biw21@pitt.edu), Sichen Ma [sim50@pitt,edu](sim50@pitt,edu),

Sixuan Huang [sih36@pitt.edu](sih36@pitt.edu), Yuchao Zhang [yuz130@pitt.edu](yuz130@pitt.edu)

1. Introduction

Our project’s name is rubber ducks, which is inspired by the famous Rubber Duck Debugging method.
In this final project, we want to build a microblog website where people can post any idea or interesting thing.

2. Objective

As we introduced before, this project is a microBlog website for people to share their colorful lives and be able to communicate
with others through blogs. To match our team name, we named this website as "Rubber Ducks Blog".

There are several functions we suppose to achieve on this website. As different roles, they would have different rights on this website. I will list them by roles as following:

- Visitors without accounts:
  - ABLE TO DO:
    - look through all blogs in the plaza
  - CANNOT DO:

    - post blogs
    - add comments on blogs
    - check users' personal page
- Regular users:

  - ABLE TO DO:
    - post blogs in the plaza
    - add comments on others' blog
    - like others' blog
    - follow users they are interested in
    - edit posted blogs in personal page
    - check followings' personal page
  - CANNOT DO:
    - Look through all user's personal page
    - edit others' blog

- Admin:
  - ABLE TO DO:

    - post blogs in the plaza
    - add comments on others' blog
    - like others' blog
    - follow users they are interested in
    - Look through **all user's** personal page (People)
    - check **all blogs** and **update some of them** if the content is rude

The purpose for developing this website is to make an application which is able to use in our real life. In addition,
during the course, we have learned React framework which is popular on social media especially Facebook. As an social website, we would
like to use React and apply it to our final project. Therefore, how to connect correctly between **backend with express.js and frontend with
react instead of vanilla JavaScript** might be the biggest **highlight** which is beyond the list of project requirement. In addition, **the authentication on
different roles** in this website might also be a challenge of this project.

3. Team member’s contributions

- Frontend:

  - **Sixuan Huang:** implemented the webpage functions with React; made RESTful APIs for "comment" data model.

  - **Sichen Ma**: designed the appearances of components on the webpage

- Backend:

  - **Yuchao Zhang**: made RESTful APIs for "user" data model with authentication and implement authentication and authorization based on JWT.

  - **Binyu Wang**: made RESTful APIs for "blog" data model with authentication.

4. Technical Architecture

![MVC model](https://cdn.glitch.com/84652ec2-b492-49e3-8631-54eb47d483c4%2F3eaff7f8-a9ce-4c9b-a7a9-3d0df34abf44.image.png?v=1587647793122)

- Frontend: React JS + W3 CSS (note: the React-bootstrap is ideal but too big for a Glitch project, therefore using vanilla CSS instead)

- Backend: Express Web Framework + Mongoose

- Database: MongoDB

Here is important thing to mention:

At the beginning of developing this application, we found that React JS and Express Node JS have conflicts in the same project on Glitch.
Therefore, we have two glitch projects for this application. This project [react-starter-hsx](https://glitch.com/~react-starter-hsx) is the front end section for Rubber Duck blog website.
Our backend project is [final-project-rubberducks](https://glitch.com/~final-project-rubberducks) . These two projects is linked when front-end calls back-end's API via CORS(Cross-Origin Resource Sharing).
In the backend glitch project, we designed three data models including user, blog and comment. The API documentation is listed in the README.md file in that project.

5. Challenges

   - How to connect frontend and backend

     - We struggled to incorporate React into the same project, only to find they had conflicts in "scripts" in package.json and in the CPU resources, and made the project heavy.
     - After spliting them into two projects, we found the back-end Glitch project was an external API to the front-end Glitch project, which brought CORS into the package.

   - How to create authentication

     - At first, we used Passport JS to implement authentication. We chose the local strategy and it worked perfect, but only on Postman. Since our frontend and backend are separated into 2 Glitch projects, we need CORS to connect them. As we know, Passport JS authentication is based on Session ID, but, unfortunately, Session ID cannot persist between CORS calls.
     - Finally, we chose JWT to implement authentication. When user is trying to login, the backend checks the username and password. If they are match, backend generates a token, then sends the token as a cookie to frontend through CORS calls. Additionally, unlike session id, token doesn’t need to store anything at server side. The server side only needs to verify the token from user is valid or not. If it’s valid, it calls next function in middleware stack, otherwise return 401 error.

   - How to get Auth from front-end

     - the first approach we had tried is to store the session information in MongoDB, we realized the problems soon: the front end is not able to maintain the session status.
     - As TA's suggests, we tried JWT and passed the token into front-end's cookie. In the front-end, we maintained the logged in user information in LocalStorage.

   - How to set admin privilege
     - We used a very simple way to implement authorization. We created a function named checkAdmin. It will check the “admin” attribute of the user is true or not. If admin is true, it calls next middleware function, otherwise, it just returns a 401 unauthorized error.

6. Future Work

   - Design a recommendation system based on users' behavior;
   - Guarantee thread safe;
   - The functions in front-end need further implementing.
     - Since the challenges above had took most of our time, the front-end had some functions suspended: a robust "Like" button, deleting one's own button, and adding comments on the website, Although all these functions are implemented in back-end API.

7. Conclusion

Through the process of implementing the whole project, the front-end web page designing or back-end testing by postman are kind of easy. However, once we combined these
two things together, difficulties or challenges appeared. We need to consider things on both sides. During this course, we have known many popular frameworks in web technologies and there are still tons of things we
need to explore. Learning would never stop through the full-stack development. In addition, keeping abreast of the new technology is an exciting challenge. The begins are pretty tough,
but still excited to see stuff produced by our own hands.


8. References
   - Documentation for passport js, URL:[http://www.passportjs.org/docs/](http://www.passportjs.org/docs/),
   - Schemas in mongoose, URL: [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html),
   - SchemasTypes in mongoose, URL: [https://mongoosejs.com/docs/schematypes.html](https://mongoosejs.com/docs/schematypes.html),
   - W3 CSS Tutorial, URL: [https://www.w3schools.com/w3css/default.asp](https://www.w3schools.com/w3css/default.asp),
   - Forms in react, URL: [https://reactjs.org/docs/forms.html](https://reactjs.org/docs/forms.html),
   - Handling events in react, URL: [https://reactjs.org/docs/handling-events.html](https://reactjs.org/docs/handling-events.html),
   - Authentication with JWT, URL: [https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0](https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0),
   - Passing token through CORS, URL: [https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests](https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests).
