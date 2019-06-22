/**
 * tweet list
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    friendlyName: "TweetList",

    description: "All Tweet List",

    inputs: {},

    exits: {
        success: {
            description: "All Tweet List"
        }
    },

    fn: async function (inputs, exits) {
        var records = await Tweet.find();
        return exits.success(records);
    }
};