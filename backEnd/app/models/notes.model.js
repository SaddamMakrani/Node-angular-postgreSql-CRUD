module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      userId: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Note;
  };