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
    // console.log(sails.models);
    var schema = graphQLService.getGraphQLSchemaFrom(sails.models);
    console.log(printSchema(schema));
    require('express-graphql')({
      schema: schema,
      // directives: [GraphQLDateDirective],
      pretty: true,
      graphiql: true
    })(this.req, this.res);
  }
};
