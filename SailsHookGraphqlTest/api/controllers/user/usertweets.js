/**
 * user tweets
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: "TweetList",

    description: "All User's Tweet List",

    inputs: {},

    exits: {
        success: {
            description: "All User's Tweet List"
        }
    },

    fn: async function (inputs, exits) {
        var records = await User.find({
            skip: 2,
            limit: 10
        }).populate('tweets', {
            select: ['id', 'body'],
            skip: 2,
            limit: 2,
        });
        return exits.success(records);
    }
};

