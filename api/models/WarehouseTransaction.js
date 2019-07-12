/**
 * WarehouseTransaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {
  tableName: 'WarehouseTransaction',
  primaryKey: 'WarehouseTransactionID',
  attributes: {
    WarehouseTransactionID: {
      type: 'number',
      autoIncrement: true,
      // primaryKey: true,
    },
    CustomerID: {
      type: 'number'
    },
    FacilityID: {
      type: 'number'
    },
    Status: {
      type: 'number'
    },
    UnderAllocated: {
      type: 'number'
    },
    CreationDate: {
      // type: 'datetime'
      type: 'string',
      // columnType: 'datetime'
    },
    ProcessDate: {
      // type: 'datetime'
      type: 'string',
      // columnType: 'datetime'
    }
  }
};
