Project based on Movie review web application.

Front-end : HTML, CSS, Bootstrap

Back-end : JS, node JS, Express, EJS, OMDb API.

Database : PostgreSQL - PgAdmin

DB is listening on port 5432.


a) This applications allows you to add movie reviews, view movie reviews added, edit the already existing movie reviews and even delete them. 
b) This data is present in our web app and Table in our PostgreSQL DB as long as we tamper with them. 
c) Our web application is powered by PostgreSQL DB.
d) The OMDb API used in such a way, to fetch the movie poster automatically based on the title(movie title / film name - as per imdb site),
given by the user through ADD movie review button.
e) The OMDb API requires API key, you can login to OMDb API and get your API key for free.
f) API key used by me, is available in index.js 


To run this project,

Clone the this repository in your local, using the below command In the terminal of your VScode, type, " git clone https://github.com/Kalaisgit/Filmy_Nanbas.git" and hit ENTER key.
The repo is now available locally,

To cd into the root directory of the project, type, cd "drag and drop the root folder" and hit ENTER.
Your are in your root folder of the project.

Type the below command, in your terminal. " npm i " and hit ENTER key.
This should probably install express, ejs, bodyparser middlware, axios and all other required npm packages and their dependencies inside the package.json file.

Open package.json and make sure that "type" : "module", is present, if not then, type it below "main" : "index.js".

Now create a database inside pgAdmin and create a table, you can just copy and paste the SQL query from the file -> queries.sql. I have added this file within the project.

To enable server locally, either follow step a or step b,

a) Now we will enable our server to listen in port number 3000, and to do that, In your terminal, type, "node index.js" and hit Enter. (Preferred)

b) If you have nodemon installed, then nodemon index.js and hit Enter.

This makes your server listen in port 3000.

Now you can open your chrome browser and type "localhost:3000" in the address URL and hit ENTER.
You can successfully use the application now.
