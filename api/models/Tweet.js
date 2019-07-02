/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'tweets',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
    },
    body: {
      type: 'string'
    },
    created_at: {
      type: 'ref',
      columnType: 'datetime'
    },
    updated_at: {
      type: 'ref', 
      columnType: 'datetime'
    },
    user_id: {
      model: 'User'
    }
  }
};
