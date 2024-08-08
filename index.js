const express = require("express"); // What about import?
const fs = require("fs"); // for access to the file system
const cors = require("cors"); // https://expressjs.com/en/resources/middleware/cors.html

const app = express();
app.use(express.json()); // Middleware for parsing application/json payloads.
app.use(cors()); // Middleware for CORS support.

const port = 3000;
const DATABASE = "./database.json"; // Where is our data stored.

// GET http://127.0.0.1:3000/  <-- route
// This is (or will be) a CRUD app for a list of names.
app.get("/", (req, res) => {
  res.send('<html><body><p>See <a href="/api">/api</a></body></html>');
});

// --- Our API Endpoints --------
// HTTP GET => READ the list of names.
app.get("/api", (req, res) => {
  const names = JSON.parse(fs.readFileSync(DATABASE));
  //console.log(names);
  res.send(names);
});

// GET => READ a specific name (i.e. details for one entry)
app.get("/api/:id", (req, res) => {
  const id = req.params.id; // The id value that we're looking for.

  // 1. Read the "database.json" file.
  const names = JSON.parse(fs.readFileSync(DATABASE));

  // 2. We have to find the matching "id" value.
  for (const name of names) {
    if (name.id == id) {
      res.send(name);
    }
  }

  res.status(404).send({ error: "Item not found" });
});

// POST => CREATE a name
// TODO (using httpie): http POST http://127.0.0.1:3000/api/  name=Brad
app.post("/api", (req, res) => {
  // 0. How do we get the submitted data from the HTTP request?
  console.log(req.method + " body: ", req.body);
  let result = req.body; // { "name": "Brad" }

  // 1. Read all of the data from the "database" file.
  let names = JSON.parse(fs.readFileSync(DATABASE));

  // 2. Find the the MAX ID value.
  const ids = names.map((obj) => obj.id);
  const maxId = Math.max(...ids);

  // 3. Create a new name entry & create a new unique ID value.
  result["id"] = maxId + 1; // --> {"id": 4, "name": "Brad"}

  // 4. Write all the data to the database file.
  names.push(result);
  fs.writeFileSync(DATABASE, JSON.stringify(names));

  // 5. Send an HTTP response.
  res.send(result); // show the new object that was written.
});

// PUT => UPDATE a name
app.put("/api/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newName = req.body.name;

  // 1. Read all the data from the database file (it should be an array)
  // [ {id: 123, name: "Hello"}, ... ]
  const data = JSON.parse(fs.readFileSync(DATABASE));

  // 2. Find the entry we want to change.
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data[i].name = newName;
    }
  }

  // 3. Write the data back into the database.
  fs.writeFileSync(DATABASE, JSON.stringify(data));

  // 4. Send back the new, updated object.
  res.send({ id: id, name: newName });
});

// DELETE => DELETE a name
app.delete("/api/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id = ", id);

  // 1. Read all the data from the database file (it should be an array)
  // [ {id: 123, name: "Hello"}, ... ]
  const data = JSON.parse(fs.readFileSync(DATABASE));
  console.log("data = ", data);

  // 2. Filter out the the entry we want to remove.
  const results = data.filter((item) => item.id != id);
  console.log("results = ", results);

  // 3. Write the data back into the database.
  fs.writeFileSync(DATABASE, JSON.stringify(results));

  res.send({ message: "Deleted item with id:" + id });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
