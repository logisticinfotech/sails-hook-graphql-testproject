/**
 * Facility.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Facility',
  primaryKey: 'FacilityID',
  attributes: {
    FacilityID: {
      // primaryKey: true,
      type: 'number',
      autoIncrement: true
    },
    Description: {
      type: 'string'
    },
    ContactID: {
      type: 'number'
    },
    // FacilityID:{
    //     model:"CustomerFacility"
    // },
    // customer: {
    //     collection: 'CustomerFacility',
    //     via: 'facility',
    //     columnName:"FacilityID",
    //     dominant: true
    // }
    customers: {
      collection: 'Customer',
      via: 'facility',
      through: 'CustomerFacility'
      // columnName: "FacilityID",
      // dominant: true,
      // foreignKey:true
    }
  }
};
