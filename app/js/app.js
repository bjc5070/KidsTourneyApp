// // Create database instance and start server
// const adapter = new FileSync("db.json");
// low(adapter).then(db => {
//   // Routes
//   // GET /posts/:id
//   app.get("/posts/:id", (req, res) => {
//     const post = db
//       .get("posts")
//       .find({ id: req.params.id })
//       .value();

//     res.send(post);
//   });
//   // POST /posts
//   app.post("/posts", (req, res) => {
//     db
//       .get("posts")
//       .push(req.body)
//       .last()
//       .assign({ id: Date.now().toString() })
//       .write()
//       .then(post => res.send(post));
//   });

//   // Set db default values
//   return db.defaults({ contestants: [] }).write();
// });

function render() {
  const state = db.getState();
  console.log(state);
}
window.onload = function() {
  document.getElementById("Everyone").addEventListener("click", render, false);
};
