// Perform CRUD operations on projects. When adding an action, make sure the project_id provided belongs to an existing project.
const express = require('express');
const router = express.Router();
const Projects = require('./projectModel.js');
const Actions = require('../actions/actionModel.js');
const mw = require('../custom/middleware.js');
const validateProjectId = mw.validateProjectId;
const validateProject = mw.validateProject;
const validateAction = mw.validateAction; 

// add an endpoint that returns all the messages for an project
router.get('/', (req, res) => {
  Projects
    .get()
    .then(projects => {
      res.status(200).json(projects); // Worked on postman
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving the projects" });
    }); 
});

// get(): resolves to an array of all the resources contained in the db. If you pass an id to this method it will return the resource with that id if one is found.
router.get('/:id', validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
    res.status(200).json(project); // worked on postman
  });
});

// insert(): calling insert passing it a resource object will add it to the db and return the newly created resource.
// "name" & "description"
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json({ success: 'A New Project was created!', project }) // worked on postman
    })
    .catch(err => {
      res.status(500).json({ error: 'Sorry, try again!', err })
    })
});

// update(): accepts two arguments, the first is the id of the resource to update, and the second is an obj with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null. "name" & "description"
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  // axios.post(/api/actions, data) <-- the data shows up as the req.//body on the server
  const { id } = req.params;
  // validate that the actionInfo is correct before saving
  Projects.update(id, req.body).then(project => {
    res.status(200).json({ success: "Info Updated!", info: req.body }); //  worked on postman
  });
});


// remove(): the remove method accepts an id as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects
    .get(id)
    .then(project => {
      project
        ? Projects
          .remove(id)
          .then(deleted => {
            deleted
              ? res.status(200).json({ success: `The Project ${id} was deleted!`, info: project }) : null
          })
        : null
    }); // worked on postman
});
// 

// Retrieve the list of actions for a project.
// Get the actions attached to the project id. If not, show 404
// The projectModel.js helper includes an extra method called getProjectActions() that takes a project id as it's only argument and returns a list of all the actions for the project. 
router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then(data => {
      data ? res.status(200).json(data) : null
    }) // 
}); // worked on postman

// If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
// Make a new action on a project's id
router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const { description, notes } = req.body;
  const project_id = req.params.id;
  Projects.get(project_id).then(action => {
    if (!action) {
      null;
    } else {
      let newAction = {
        description,
        notes,
        project_id,
      };
      Actions.insert(newAction).then(action => {
        res.status(201).json({ success: action }); // only post gets 201 - create
      }); // worked on postman
    }
  });
}); 

module.exports = router;