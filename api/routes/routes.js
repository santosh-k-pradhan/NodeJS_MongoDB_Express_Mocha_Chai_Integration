'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks').get(todoList.list_all_tasks)
  app.route('/tasks').post(todoList.create_a_task);
  app.route('/tasks/:taskId').get(todoList.read_a_task);
  app.route('/tasks/:taskId').put(todoList.update_a_task);
  app.route('/tasks/:taskId').delete(todoList.delete_a_task);
};