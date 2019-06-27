/**
 * GraphQLController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var { printSchema } = require('graphql');
module.exports = {
  friendlyName: 'Graphql',

  description: 'All Graphql',

  inputs: {},

  exits: {
    success: {
      description: 'All Graphql'
    }
  },

  fn: async function(inputs, exits) {

    sails.config.graphql(this.req, this.res);
  }
};
