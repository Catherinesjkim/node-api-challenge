// Perform CRUD operations on projects. When adding an action, make sure the project_id provided belongs to an existing project.
// If you try to add an action with an id of 3 and there is no project with that id the database will return an error.
// Retrieve the list of actions for a project.
const exporess = require('express');
const router = express.Router();
const Projects = require('./projectModel.js');
const Actions = require('../actions/actionModel.js');
const mw = require('../custom/middleware.js');


module.exports = router;