
var graphql = require('graphql');
const UserType = require('../Type/UserType').UserType;
const TweetType = require('../Type/TweetType').TweetType;

module.exports.queryType = {
    users: {
        type: new graphql.GraphQLList(UserType),
        args: {
            id: {
                name: 'id',
                type: graphql.GraphQLInt
            },
            email: {
                name: 'email',
                type: graphql.GraphQLString
            },
            username: {
                name: 'username',
                type: graphql.GraphQLString
            },
            limit: {
                name: 'limit',
                type: graphql.GraphQLInt
            },
            skip: {
                name: 'skip',
                type: graphql.GraphQLInt
            }
        },
        resolve: function (parent, args, ast) {
            return new Promise(async (resolve, reject) => {
                var condition = {};

                if (args.id) {
                    condition['id'] = args.id;
                }
                if (args.email) {
                    condition['email'] = args.email;
                }
                if (args.username) {
                    condition['username'] = args.username;
                }
                if (args.limit) {
                    condition['limit'] = args.limit;
                }
                if (args.skip) {
                    condition['skip'] = args.skip;
                }

                if (args.facilitys) {
                    var userWl = await User.find(condition)
                        .populate('facilitys');
                    resolve(userWl);
                } else {
                    var userWl = await User.find(condition);
                    resolve(userWl);
                }
            })
        }
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
        }, resolve: function (parent, args, ast) {
            return new Promise(async (resolve, reject) => {
                var condition = {};
                if (args.id) {
                    condition['id'] = args.id;
                }
                if (args.limit) {
                    condition['limit'] = args.limit;
                }
                if (args.skip) {
                    condition['skip'] = args.skip;
                }
                var tweets = await Tweet.find(condition);
                resolve(tweets);
            })
        }
    }
}