const _ = require('lodash');
const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLScalarType
} = require('graphql');

module.exports = {
  CustomJson: new GraphQLScalarType({
    name: 'CustomJson',
    description: 'CustomJson scalar type',
    // parseValue(value) {
    //     return new Date(value); // value from the client
    // },
    serialize(value) {
      return value; // value sent to the client
    }
    // parseLiteral(ast) {
    //     if (ast.kind === Kind.INT) {
    //         return parseInt(ast.value, 10); // ast value is always in string format
    //     }
    //     return null;
    // },
  }),
  /*Aggregate: new GraphQLScalarType({
        name: 'Aggregate',
        description: 'Aggregate scalar type',
        serialize(value) {
            return value; // value sent to the client
        }
    }),*/
  waterlineTypesToGraphQLType: function(attribute) {
    switch (attribute.type) {
      case 'string':
        return GraphQLString;
      case 'integer':
        return GraphQLInt;
      case 'boolean':
        return GraphQLBoolean;
      case 'float':
        return GraphQLFloat;
      default:
        return graphQLService.CustomJson;
    }
  },

  getFindArgsForWaterlineModel: function(modelID, GraphQLSchemaManager) {
    return {
      where: {
        name: 'criteria',
        type: graphQLService.CustomJson //GraphQLSchemaManager.findArgsTypes[modelID]
      },
      sort: {
        name: 'sort',
        type: GraphQLString
      },
      skip: {
        name: 'skip',
        type: GraphQLInt
      },
      limit: {
        name: 'limit',
        type: GraphQLInt
      },
      populate: {
        name: 'populate',
        type: graphQLService.CustomJson
      },
      aggregate: {
        name: 'aggregate',
        type: graphQLService.CustomJson
      }
    };
  },

  createGraphQLTypeForWaterlineModel: function(
    model,
    modelID,
    Node,
    GraphQLSchemaManager
  ) {
    var attributes = model.attributes;
    return new GraphQLObjectType({
      name: modelID,
      description: model.description,
      interfaces: [Node],
      fields: () => {
        var convertedFields = {};
        // console.log("graphQLServices createGraphQLTypeForWaterlineModel attributes ", attributes)
        _.mapKeys(attributes, (attribute, key) => {
          if (attribute.type) {
            var field = {
              type: graphQLService.waterlineTypesToGraphQLType(attribute),
              description: attribute.description
            };
            convertedFields[key] = field;
          }
        });
        var idField = {
          type: new GraphQLNonNull(GraphQLString)
        };
        var typeField = {
          type: new GraphQLNonNull(GraphQLString)
        };
        var countField = {
          type: new GraphQLNonNull(GraphQLString)
        };
        var averageField = {
          type: new GraphQLNonNull(GraphQLFloat)
        };
        convertedFields.id = idField;
        convertedFields.type = typeField;
        convertedFields.count = countField;
        convertedFields.average = averageField;
        convertedFields.average = averageField;

        var associations = model.associations;
        associations.forEach(association => {
          if (association.model) {
            convertedFields[association.alias] = {
              type: GraphQLSchemaManager.types[association.model],
              description: association.description,
              resolve: (obj /*, args */) => {
                return GraphQLSchemaManager.queries[association.model][
                  association.model
                ].resolve(obj, {
                  where: {
                    id: obj[association.alias].id || obj[association.alias]
                  }
                });
              }
            };
          }
          /*else if (association.collection) {
                                           console.log("graphQLServices createGraphQLTypeForWaterlineModel association ", association);
                                           convertedFields[association.collection + 's'] = {
                                               type: new GraphQLList(GraphQLSchemaManager.types[association.collection]),
                                               description: association.description,
                                               args: graphQLService.getFindArgsForWaterlineModel(association.collection, GraphQLSchemaManager),
                                               resolve: (obj, args) => {
                                                   var associationCriteria = {};
                                                   associationCriteria[association.via] = obj.id;
                                                   // override association's value in where criterial
                                                   var criteria = Object.assign({}, args, {
                                                       where: Object.assign({}, args.where, associationCriteria)
                                                   });
                                                   return GraphQLSchemaManager.queries[association.collection][association.collection + 's'].resolve(obj, criteria);
                                               }
                                           };
                                       }*/
        });
        return convertedFields;
      }
    });
  },

  createFindArgsTypeForWaterlineModel: function(
    model,
    modelID,
    Node,
    GraphQLSchemaManager
  ) {
    var attributes = model.attributes;
    return new GraphQLInputObjectType({
      name: `${modelID}Args`,
      description: model.description,
      interfaces: [Node],
      fields: () => {
        var convertedFields = {};
        _.mapKeys(attributes, (attribute, key) => {
          if (attribute.type) {
            var field = {
              type: graphQLService.waterlineTypesToGraphQLType(attribute),
              description: attribute.description
            };
            convertedFields[key] = field;
          }
        });
        var idField = {
          type: GraphQLString
        };
        var typeField = {
          type: GraphQLString
        };
        convertedFields.id = idField;
        convertedFields.type = typeField;

        var associations = model.associations;
        // TODO: how to search that records contains someof collection matched
        associations.forEach(association => {
          var field = {
            type: GraphQLString,
            description: association.description
          };
          convertedFields[association.alias] = field;
        });
        // associations.forEach((association) => {
        //   if(association.model) {
        //     convertedFields[association.alias] = {
        //       type: GraphQLSchemaManager.types[association.model],
        //       description: association.description,
        //       resolve: (obj, /* args */ ) => {
        //         return GraphQLSchemaManager.queries[association.model][association.model].resolve(obj, {
        //           where: {
        //             id: obj[association.alias].id || obj[association.alias]
        //           }
        //         });
        //       }
        //     };
        //   } else if(association.collection) {
        //     convertedFields[association.collection + 's'] = {
        //       type: new GraphQLList(GraphQLSchemaManager.types[association.collection]),
        //       description: association.description,
        //       args: getFindArgsForWaterlineModel(association.collection, GraphQLSchemaManager),
        //       resolve: (obj, /* args */ ) => {
        //         var associationCriteria = {};
        //         associationCriteria[association.via] = obj.id;
        //         // override association's value in where criterial
        //         var criteria = Object.assign({}, args, {
        //           where: Object.assign({}, args.where, associationCriteria)
        //         });
        //         return GraphQLSchemaManager.queries[association.collection][association.collection + 's'].resolve(obj, criteria);
        //       }
        //     };
        //   }
        // });
        return convertedFields;
      }
    });
  },

  createGraphQLQueries: function(
    waterlineModel,
    graphqlType,
    modelID,
    GraphQLSchemaManager
  ) {
    var queries = {};
    // query to get by id
    queries[modelID] = {
      type: graphqlType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (obj, { where, id }) => {
        return waterlineModel
          .findOne({
            id: id || (where && where.id)
          })
          .then((result) => {
            return result;
          });
      }
    };
    // query to find based on search criteria
    queries[modelID + 's'] = {
      type: new GraphQLList(graphqlType),
      args: graphQLService.getFindArgsForWaterlineModel(
        modelID,
        GraphQLSchemaManager
      ),
      resolve: (obj, criteria) => {
        // console.log("graphQLServices createGraphQLQueries criteria : ", criteria);
        var populate = criteria.populate;
        delete criteria.populate;
        var aggregate = criteria.aggregate;
        delete criteria.aggregate;

        var criteria = JSON.stringify(criteria)
          .replace(/gte/g, '>=')
          .replace(/gt/g, '>')
          .replace(/lte/g, '<=')
          .replace(/lt/g, '<')
          .replace(/neq/g, '!=');
        var whereClause = JSON.parse(criteria);
        for (var field in whereClause.where) {
          if (whereClause.where[field] === '') {
            delete whereClause['where'][field];
          }
        }
        var wlm = waterlineModel.find(whereClause);
        if (populate) {
          if (populate[0].criteria) {
            wlm.populate(populate[0].type, populate[0].criteria);
          } else {
            wlm.populate(populate[0].type);
          }
          return wlm.then((results) => {
            return results;
          });
        } else if (aggregate) {
          if (aggregate[0] == 'count') {
            wlm = waterlineModel.count(whereClause);
            return wlm.then((results) => {
              var res = [{ count: results }];
              return res;
            });
          } else if (aggregate[0] == 'sum') {
            return waterlineModel
              .find(whereClause)
              .sum(aggregate[1])
              .then((results) => {
                return results;
              });
          } else if (aggregate[0] == 'average') {
            return waterlineModel
              .findOne(whereClause)
              .average(aggregate[1])
              .then((results) => {
                var res = [{ average: results[aggregate[1]] }];
                return res;
              });
          }
        } else {
          return wlm.then((results) => {
            return results;
          });
        }
      }
    };
    return queries;
  },

  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  createGraphQLMutations: function(
    waterlineModel,
    graphqlType,
    modelID,
    GraphQLSchemaManager
  ) {
    var mutations = {};
    var attributes = waterlineModel.attributes;
    var convertedFields = {};
    _.mapKeys(attributes, (attribute, key) => {
      if (attribute.type) {
        var field = {
          type: graphQLService.waterlineTypesToGraphQLType(attribute),
          description: attribute.description
        };
        convertedFields[key] = field;
      }
    });
    const wrapResolve = resolve => (obj, args) => resolve(args);

    mutations['create' + graphQLService.capitalizeFirstLetter(modelID)] = {
      type: graphqlType,
      args: convertedFields,
      resolve: wrapResolve(waterlineModel.create),
      name: 'create' + modelID
    };

    mutations['update' + graphQLService.capitalizeFirstLetter(modelID)] = {
      type: graphqlType,
      args: convertedFields,
      resolve: wrapResolve(waterlineModel.update),
      name: 'update' + modelID
    };

    mutations['delete' + graphQLService.capitalizeFirstLetter(modelID)] = {
      type: graphqlType,
      args: convertedFields,
      resolve: wrapResolve(waterlineModel.delete),
      name: 'delete' + modelID
    };

    return mutations;
  },

  getGraphQLSchemaFrom: function(models) {
    if (!models) {
      throw new Error('Invalid input args models is' + models);
    }

    var GraphQLSchemaManager = {
      types: {},
      findArgsTypes: {},
      queries: {},
      connectionTypes: {},
      mutations: {},
      waterlineModels: models
    };

    const Node = new GraphQLInterfaceType({
      name: 'Node',
      description: 'An object with an ID',
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The global unique ID of an object'
        },
        type: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The type of the object'
        }
      }),
      resolveType: obj => {
        return obj.type;
      }
    });

    let nodeField = {
      name: 'Node',
      type: Node,
      description: 'A node interface field',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Id of node interface'
        }
      },
      resolve: (obj, { id }) => {
        var keys = _.keys(GraphQLSchemaManager);
        var allFinds = keys.map((key) => {
          var obj = GraphQLSchemaManager[key];
          return obj.model.find({
            id: id
          });
        });
        return Promise.all(allFinds).then((values) => {
          var foundIndex = -1;
          var foundObjs = values.find((value, index) => {
            if (value.length == 1) {
              foundIndex = index;
              return true;
            }
          });
          foundObjs[0].type = GraphQLSchemaManager[keys[foundIndex]].type;
          return foundObjs[0];
        });
      }
    };

    _.each(models, function eachInstantiatedModel(thisModel, modelID) {
      GraphQLSchemaManager.types[
        modelID
      ] = graphQLService.createGraphQLTypeForWaterlineModel(
        thisModel,
        modelID,
        Node,
        GraphQLSchemaManager
      );
      GraphQLSchemaManager.findArgsTypes[
        modelID
      ] = graphQLService.createFindArgsTypeForWaterlineModel(
        thisModel,
        modelID,
        Node,
        GraphQLSchemaManager
      );
      GraphQLSchemaManager.queries[
        modelID
      ] = graphQLService.createGraphQLQueries(
        thisModel,
        GraphQLSchemaManager.types[modelID],
        modelID,
        GraphQLSchemaManager
      );
    });

    _.each(models, function eachInstantiatedModel(thisModel, modelID) {
      GraphQLSchemaManager.mutations[
        modelID
      ] = graphQLService.createGraphQLMutations(
        thisModel,
        GraphQLSchemaManager.types[modelID],
        modelID,
        GraphQLSchemaManager
      );
    });

    var queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => {
        return _.reduce(
          GraphQLSchemaManager.queries,
          (total, obj, key) => {
            return _.merge(total, obj);
          },
          {
            node: nodeField
          }
        );
      }
    });

    var mutationFields = _.reduce(GraphQLSchemaManager.mutations, (
      total,
      obj,
      key
    ) => {
      return _.merge(total, obj);
    });

    var mutationType = new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields
    });

    var schema = new GraphQLSchema({
      query: queryType,
      mutation: mutationType
    });

    return schema;
  }
};
