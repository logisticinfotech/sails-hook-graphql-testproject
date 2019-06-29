/**
 * graphql hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
var fs = require('fs');
var { printSchema } = require('graphql');
var { makeExecutableSchema } = require('graphql-tools');
var graphQLService  = require("./graphQLService");
module.exports = function defineGraphqlHook(sails) {
  return {
    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function() {
      var eventsToWaitFor = [];
      // if (sails.hooks.userhooks) {
      //   eventsToWaitFor.push('hook:userhooks:loaded');
      // }

      if (sails.hooks.orm) {
        eventsToWaitFor.push('hook:orm:loaded');
      }

      // if (sails.hooks.pubsub) {
      //   eventsToWaitFor.push('hook:pubsub:loaded');
      // }

      sails.after(eventsToWaitFor, () => {

        this.registerActions();
        // ----- Write To Schema File ------
        var schema = graphQLService.getGraphQLSchemaFrom(sails.models);
        // console.log(printSchema(schema));
        try{
          fs.writeFileSync('schema.graphql', printSchema(schema));
        } catch (e){
            console.log("Cannot write file ", e);
        }

        // ----- Read from Schema File -----
        // var typeDefs = fs.readFileSync('schema.graphql', 'utf-8');
        // var schema = makeExecutableSchema({ typeDefs });
        // console.log(schema);

        sails.config.graphqlschema = schema;
        sails.config.graphql = require('express-graphql')({
          schema: schema,
          // directives: [GraphQLDateDirective],
          pretty: true,
          graphiql: true
        });

        sails.log.info('🍺 Initializing custom hook (`graphql`) 🍺');

      });

    },

    registerActions: function() {

      // Register an action as `myhook/greet` that an app can bind to any route they like.
      sails.registerAction(function greet(req, res) {
        var name = req.param('name') || 'stranger';
        return res.status(200).send('Hey there, ' + name + '!');
      }, 'hellogreet');

      // return cb();

    }
  };
};
