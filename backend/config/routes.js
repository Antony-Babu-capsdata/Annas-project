/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 */

module.exports.routes = {

  // Homepage route

  '/': 'HomeController.home',

  // Students routes
  'POST /Students': 'CompanyController.create',
  'GET /Students': 'CompanyController.list',
  'PATCH /Students/:cid': 'CompanyController.update',
  'DELETE /Students/:id': 'CompanyController.delete',
  'PUT /Suggestion': 'AiController.list1',
  'POST /gptai': 'AiController.chatWithGPT',
  'POST /create': 'HomeController.create',
  'POST /update': 'HomeController.update',
  'GET /delete/:id': 'HomeController.delete',
  'POST /createmyfruits': 'AiController.createmyfruits',
};
