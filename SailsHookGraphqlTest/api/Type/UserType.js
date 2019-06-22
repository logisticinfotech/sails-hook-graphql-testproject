
var graphql = require('graphql');
var TweetType = require('./TweetType').TweetType;
var queryType = require('../Query/RootQuery');

var UserType = new graphql.GraphQLObjectType({
    name: 'users',
    fields: function () {
        return {
            id: {
                type: graphql.GraphQLInt
            },
            name: {
                type: graphql.GraphQLString
            },
            username: {
                type: graphql.GraphQLString
            },
            email: {
                type: graphql.GraphQLString
            },
            avatar: {
                type: graphql.GraphQLString
            },
            cover: {
                type: graphql.GraphQLString
            },
            createdAt: {
                type: graphql.GraphQLString
            },
            updatedAt: {
                type: graphql.GraphQLString
            },
            tweets: {
                type: new graphql.GraphQLList(TweetType),
                args: {
                    id: {
                        name: 'id',
                        type: graphql.GraphQLInt
                    },
                    limit: {
                        name: 'limit',
                        type: graphql.GraphQLInt
                    }
                },
                resolve: function (obj, args, ast, schema) {
                    var associationCriteria = {};
                    associationCriteria['user'] = obj.id;
                    // override association's value in where criterial
                    var criteria = Object.assign({}, args, {
                        where: Object.assign({}, args.where, associationCriteria)
                    });
                    return queryType['queryType'].tweets.resolve(obj, criteria);
                }
            }
        }
    }
});

module.exports = {
    UserType: UserType
}