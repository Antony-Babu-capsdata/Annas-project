const Student = require('../models/Students');

// api/controllers/CompanyController.js
const knexModel = require('../../config/knex');
const knex = knexModel.initialize(sails.config)

module.exports = {

  // Create a new company
  create: async function (req, res) {
    try {

      let inputs = {
        name: req.body.name,
        ai_created_on: req.body.ai_created_on,
        description: req.body.description
      }

      if (!inputs.name) {
        return res.badRequest({ error: 'Students name is required' });
      }

      let companyId = await knex('project')
        .insert({
          name: inputs.name,
          description: inputs.description,
          ai_created_on:inputs.ai_created_on,
        })

      return res.ok({
        message: 'Students created successfully',
        companyId: companyId[0]
      });

    } catch (err) {
      return res.serverError(err);
    }
  },

  // List all company
  list: async function (req, res) {
    try {
      const project = await knex('project').select('*');
      return res.ok(project);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Update a company
  update: async function (req, res) {
    try {
      const { cid } = req.params;
      
      let inputs = {
        name: req.body.name,
        ai_created_on: req.body.ai_created_on,
        description: req.body.description
      }

      if (!cid) {
        return res.badRequest({ error: 'Student ID is required' });
      }

      let updatedCount = await knex('project')
        .where({ id: parseInt(cid) })
        .update({
          name: inputs.name,
          description: inputs.description,
          ai_created_on:inputs.ai_created_on,
        });

      if (updatedCount === 0) {
        return res.notFound({ error: 'Student not found' });
      }

      return res.ok({
        message: 'Student updated successfully'
      });

    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete a company
  delete: async function (req, res) {
    try {
      let {id } = req.params;

      if (!id) {
        return res.badRequest({ error: 'Student ID is required' });
      }

      let deletedCount = await knex('project')
        .where({ id:parseInt(id) })
        .del();

      if (deletedCount === 0) {
        return res.notFound({ error: 'Student not found' });
      }

      return res.ok({
        message: 'Students deleted successfully'
      });

    } catch (err) {
      return res.serverError(err);
    }
  }
};


