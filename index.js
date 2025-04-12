const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine" ,"ejs");
app.set("views", path.join(__dirname, "/views"));

let getRandomUser = () => {
  return [
     faker.string.uuid(),
    faker.internet.username(), 
    faker.internet.email(),
    faker.internet.password(),
 ];
};

let q = "INSERT INTO user (id, name, email, password) VALUES ?";

// Generate the random user data
let data = [];
for( let i = 1; i <= 100; i++ ){
  data.push(getRandomUser());
}

console.log(getRandomUser());

// Create the connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Tejas@1306'
});

// Insert the data into the database
conn.query(q, [data], (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Inserted ${result.affectedRows} rows into the database.`);
    }
});

// Route to get the user count
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;

  try {
      conn.query(q, (err, result) => {
          if (err) throw err;
          let count = result[0]["count(*)"];
          res.render("home.ejs", { count });
      });
  } catch (err) {
      console.log(err);
      res.send("Some error occurred");
  }
});

app.get("/user" , (req, res) => {
  let q = `SELECT * FROM user`;

  try {
    conn.query(q, (err, users) => {
        if (err) throw err;
      //  console.log(result);
        // res.send(result);
        res.render("show.ejs", { users });
    });
} catch (err) {
    console.log(err);
    res.send("Some error occurred");
}
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
 
   

   try {
    conn.query(q, (err, result) => {
        if (err) throw err;
       let user = result[0];
        res.render("edit.ejs", { user });
    });
} catch (err) {
    console.log(err);
    res.send("Some error occurred");
}
})


 // Update route for Database 
 app.patch("/user/:id", (req, res) => {


   let {id} = req.params;
   let {password : formPass, username : newUsername} = req.body;
   let q = `SELECT * FROM user WHERE id = '${id}'`;
  
    
 
    try {
     conn.query(q, (err, result) => {
         if (err) throw err;
        let user = result[0];
        if(formPass != user.password) {
          res.send("WORNG Password");
        } else {
          let q2 = `UPDATE user SET name ='${newUsername}' WHERE id='${id}' `;
          conn.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect("/user")
          });
          }
     });
 } catch (err) {
     console.log(err);
     res.send("Some error occurred");
 }
 })


app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});



