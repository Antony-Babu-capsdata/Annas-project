/**
 * AicontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/CompanyController.js
const knexModel = require('../../config/knex');
// const knex = require('../../config/knex');
const knex = knexModel.initialize(sails.config)
const axios = require('axios');
const async = require('async');
// const Myfruits = sails.models.myfruits;



module.exports = {

  chatWithGPT: async function (req, res) {
    try {
      let { prompt } = req.body;
      if (!prompt) {
        return res.badRequest({ error: 'Prompt is required' });
      }
      const apiKey = '***************';//enter your api key
      const knex = require('../../config/knex').initialize(sails.config);

      async.parallel({

        // 🗃️ Task 1: Database Query
        databaseResults(callback) {
          knex('project')
            .select('id', 'name', 'description')
            .where('name', 'like', `%${prompt}%`)
            .then(results => {
              if (results.length === 0) {
                callback(null, []);
              } else {
                callback(null, results);
              }
            })
            .catch(err => {
              console.error('Database error:', err.message);
              callback(null, []); // fallback empty instead of failing
            });
        },

        // 🤖 Task 2: ChatGPT API Call
        gptSuggestions(callback) {
          axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4',
              messages: [
                {
                  role: 'system',
                  content: `You are an assistant that responds in JSON format. When the user gives a topic like "juice", "jewellery", etc., respond with 10 detailed and diverse suggestions in this format:

                  [
                    {
                      "name": "Item Name",
                      "description": "A short informative description",
                      "category": "Given category"
                    }
                  ]`
                },
                {
                  role: 'user',
                  content: `Give suggestions for the topic: ${prompt}`
                }
              ],
              temperature: 0.7,
              max_tokens: 1000
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              }
            }
          ).then(response => {
            const gptRaw = response.data.choices[0].message.content;
            try {
              const parsed = JSON.parse(gptRaw);
              callback(null, parsed);
            } catch (err) {
              console.warn('GPT response not valid JSON, fallback empty');
              callback(null, []); // fallback
            }
          }).catch(err => {
            console.error('GPT error:', err.response?.data || err.message);
            callback(null, []); // fallback
          });
        }

      }, function (err, results) {
        if (err) {
          console.error('Unexpected parallel error:', err.message);
          return res.serverError({
            error: 'Unexpected server error',
            details: err.message
          });
        }
        return res.ok({
          prompt,
          databaseResults: results.databaseResults,
          gptSuggestions: results.gptSuggestions
        });
      });

    } catch (err) {
      console.error('Unexpected error:', err.message);
      return res.serverError({
        error: 'Unexpected server error',
        details: err.message
      });
    }
  },

  createmyfruits: async function (req, res) {
    try {

      let inputs = {
        data: req.body
      };

      let dbData = [];

      for (i = 0; i < inputs.data.length; i++) {
        if (inputs.data[i].value.id != null) {
          console.log(inputs.data[i].value.id)
          dbData.push(inputs.data[i].value.id);
          // dbData
        } else {

          let projectId = await knex('project')
            .insert({
              name: inputs.data[i].value.name,
              ai_created_on: 1,
              description: inputs.data[i].value.description
            })

          console.log('projectid', projectId[0]);
          dbData.push(projectId[0]);
        }
      }
      let pid = await knex('myfruits')
       .insert({pid: JSON.stringify(dbData), ai_created_on: 1});
      console.log(`Created new Project and inserted into Myfruits with id=${pid[0]}`);
    return res.status(200).json({ message: 'Suggestion saved successfully' });
    } catch (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ message: 'Failed to save Suggestion', error: err.message });
    }
  }
};
