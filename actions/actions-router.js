// Perform CRUD operations on projects and actions. When adding an action, make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
// Retrieve the list of actions for a project.

const express = require('express');
const router = express.Router();
const Actions = require('./actionModel.js');
const mw = require('../custom/middleware.js');
const validateActionId = mw.validateActionId;
const validateAction = mw.validateAction;

// These are related to actions - resource
// the router handles endpoints that begin with /api/actions
// router only cares about what comes after 

// add an endpoint that returns all the messages for an action
router.get("/", (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action); // worked on postman
    })
    .catch(err => {
      res.status(500).json({ error: "Sorry, try again!", err });
    });
});

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params
  Actions.get(id).then(action => {
    res.status(200).json(action); // worked on postman
  });
});

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
router.put("/:id", validateActionId, validateAction, (req, res) => {
  // axios.post(/api/actions, data) <-- the data shows up as the req.//body on the server
  const { id } = req.params;
  // validate that the actionInfo is correct before saving
  Actions.update(id, req.body).then(action => {
    res.status(200).json({ success: 'Info Updated!', info: req.body }); // worked on postman
  }); 
});

// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;

  Actions.get(id).then(action => {
    action
      ? Actions.remove(id).then(deleted => {
        deleted ? res.status(200).json({ success: `Project ${id} was deleted!`, info: action }) : null
      })
      : null
  }); // Else if - 2 nulls
}); // worked on postman


module.exports = router;