/**
 * CustomerFacility.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  tableName: 'CustomerFacility',
  // primaryKey: 'id',
  attributes: {
    id: {
      // primaryKey: true,
      type: 'number',
      autoIncrement: true,
    },
    // FacilityID: {
    //   type: 'number'
    // },
    // CustomerID: {
    //   type: 'number'
    //   // model: "customer"
    // },
    // facility: {
    //     collection: 'Facility',
    //     via: 'FacilityID',
    //     dominant: true
    // },
    customer: {
      model: 'Customer',
      columnName: 'CustomerID'
    },
    facility: {
      model: 'Facility',
      columnName: 'FacilityID'
    }
  }
};
