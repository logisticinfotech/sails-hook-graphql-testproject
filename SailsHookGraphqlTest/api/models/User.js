/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
    },
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
    created_at: {
      type: 'string'
    },
    updated_at: {
      type: 'string'
    },
    tweets: {
      type: 'json',
      collection: 'Tweet',
      via: 'user_id'
    }
  }
};
