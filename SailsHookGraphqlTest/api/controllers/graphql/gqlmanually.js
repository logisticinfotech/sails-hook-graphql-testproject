/**
 * GraphQLController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: "GraphqlManually",

    description: "All Graphql Manually",

    inputs: {},

    exits: {
        success: {
            description: "All Graphql Manually"
        }
    },

    fn: async function (inputs, exits) {
        const { GraphQLSchema, graphql, GraphQLObjectType } = require('graphql');
        const queryType = require('../../Query/RootQuery').queryType;

        const graphQLObjectType = new GraphQLObjectType({
            name: 'Query',
            fields: queryType
        });
        const schema = new GraphQLSchema({
            query: graphQLObjectType
        });

        // query UserNameAdnTweetBody {users{name,tweets{body}}}
        const result = await graphql(
            schema, // generated schema
            this.req.body.query, // graphql query string
            null, // default rootValue
            { // context
                request: sails.request, // default request method - required
                reqData: { // object of any data you want to forward to server's internal request
                    headers: { /*your headers to forward */ }
                }
            }
        );

        return exits.success(result);
    }
};