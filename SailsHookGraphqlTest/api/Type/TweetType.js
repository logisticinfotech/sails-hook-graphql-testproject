
var graphql = require('graphql');
var TweetType = new graphql.GraphQLObjectType({
    name: 'tweets',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            body: {
                type: graphql.GraphQLString
            },
            user: {
                type: graphql.GraphQLString
            },
            createdAt: {
                type: graphql.GraphQLString
            },
            updatedAt: {
                type: graphql.GraphQLString
            }
        }
    }
});

module.exports = {
    TweetType: TweetType
}