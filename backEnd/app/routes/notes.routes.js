module.exports = app => {
    const notes = require("../controllers/notes.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Note
    router.post("/", notes.create);
  
    // Retrieve all Notes
    router.get("/", notes.findAll);
  
    // Retrieve all published notes
    router.get("/published", notes.findAllPublished);
  
    // Retrieve a single Note with id
    router.get("/:id/:userId", notes.findOne);
  
    // Update a Note with id
    router.put("/:id", notes.update);
  
    // Delete a Note with id
    router.delete("/:id", notes.delete);
  
    // Create a new Note
    router.delete("/:userId", notes.deleteAll);
  
    app.use('/api/notes', router);
  };