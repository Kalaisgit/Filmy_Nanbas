import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const OMDB_API_KEY = "940a9bb6";

app.use(express.static("public")); // to access static files in public
app.use(bodyParser.urlencoded({ extended: true })); // enables our body parser middleware

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Movie_Project",
  password: "Kalai1611",
  port: 5432,
});
db.connect();

// Route for the homepage
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/reviews", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM movies");
    const reviews = result.rows; // This fetches the reviews from the database

    // Fetch movie posters
    for (let i = 0; i < reviews.length; i++) {
      const movie = reviews[i].film;
      const year = reviews[i].yor;

      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?t=${encodeURIComponent(
            movie
          )}&y=${encodeURIComponent(year)}&apikey=${OMDB_API_KEY}`
        );

        if (response.data.Response === "True" && response.data.Poster) {
          reviews[i].poster = response.data.Poster;
        } else {
          console.log(`No poster found for ${movie}`);
          reviews[i].poster = ""; // Set to empty string if no poster found
        }
      } catch (error) {
        console.log(
          `Error fetching poster for ${movie}:`,
          error.response ? error.response.data : error.message
        );
        reviews[i].poster = ""; // Set to empty string if there's an error
      }
    }

    res.render("reviews.ejs", { reviews }); // This sends the reviews to the EJS template
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving reviews from the database.");
  }
});

// Route to display form for adding a new review
app.get("/add-review", (req, res) => {
  res.render("add-review.ejs");
});

// Route to handle form submission and add a new review
app.post("/add-review", async (req, res) => {
  const { film, yor, genre, rating, review } = req.body;
  try {
    await db.query(
      "INSERT INTO movies (film, yor, genre, rating, review) VALUES ($1, $2, $3, $4, $5)",
      [film, yor, genre, rating, review]
    );
    res.redirect("/reviews");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding review to the database.");
  }
});

// Route to display form for editing a review
app.get("/edit-review/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM movies WHERE id = $1", [id]);
    const review = result.rows[0];
    res.render("edit-review.ejs", { review });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving review from the database.");
  }
});

// Route to handle form submission and update a review
app.post("/edit-review/:id", async (req, res) => {
  const { id } = req.params;
  const { film, yor, genre, rating, review } = req.body;
  try {
    await db.query(
      "UPDATE movies SET film = $1, yor = $2, genre = $3, rating = $4, review = $5 WHERE id = $6",
      [film, yor, genre, rating, review, id]
    );
    res.redirect("/reviews");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating review in the database.");
  }
});

// Route to handle deleting a review
app.post("/delete-review/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM movies WHERE id = $1", [id]);
    res.redirect("/reviews");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting review from the database.");
  }
});

app.listen(port, () => {
  console.log(`Server runs successfully on port number ${port}`);
});
