/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'tweets',
    attributes: {
        body: {
            type: 'string'
        },
        created_at: {
            type: 'string'
        },
        updated_at: {
            type: 'string'
        },
        user: {
            model: 'User'
        }
    }
};
