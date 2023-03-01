const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Note
  const note = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };

  // Save Note in the database
  Note.create(note)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const userId = req.query.userId;
  if (!req.query.userId) {
    res.status(400).send({
      message: "Parameter missing!",
    });
    return;
  }
  var condition = title
    ? { title: { [Op.iLike]: `%${title}%` }, userId: userId }
    : { userId: userId };
  Note.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Find a single Note with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  Note.findOne({
    where: {
      id: id,
      userId: userId, 
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Note with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Note with id=" + id,
      });
    });
};

// Update a Note by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Note with id=" + id,
      });
    });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}. Maybe Note was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id,
      });
    });
};

// Delete all Notes from the database.
exports.deleteAll = (req, res) => {
  console.log("in the user ID")
  const id = req.params.userId;
  Note.destroy({
    where: {userId: id},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Notes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all notes.",
      });
    });
};

// Find all published Notes
exports.findAllPublished = (req, res) => {
  Note.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};
