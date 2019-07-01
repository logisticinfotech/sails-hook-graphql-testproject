/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Customer',
  primaryKey: 'CustomerID',
  graphql: {
    query: true,
    mutation: false
  },
  attributes: {
    CustomerID: {
      type: 'number',
      autoIncrement: true,
      // primaryKey: true
    },
    Description: {
      type: 'string'
    },
    PrimaryFacilityID: {
      type: 'number'
    },
    // customerfacilitys: {
    //     collection: 'CustomerFacility',
    //     via: 'CustomerID',
    //     dominant: true
    // },
    // customersetting: {
    //     collection: 'CustomerSetting',
    //     via: 'CustomerID',
    //     dominant: true
    // }
    // ,
    // facilities: {
    //     collection: 'Facility',
    //     via: 'customer',
    //     dominant: true
    // }
    facilitys: {
      type: 'json',
      // ctype: 'json',
      collection: 'Facility',
      via: 'customer',
      through: 'CustomerFacility'
      // columnName: "CustomerID",
      // dominant: true,
      // foreignKey:true
    }
  }
};
