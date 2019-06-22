/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'users',
    attributes: {
        name: {
            type: 'string'
        },
        username: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        cover: {
            type: 'string'
        },
        tweets: {
            collection: "Tweet",
            via: "user"
        }
    }
};
