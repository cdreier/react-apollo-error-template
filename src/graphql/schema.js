import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
  { id: 4, name: 'John Smith' },
  { id: 5, name: 'Sara Smith' },
  { id: 6, name: 'Budd Deey' },
  { id: 7, name: 'Budd Deey' },
];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      args: {
        page: {
          type: GraphQLInt,
        }
      },
      resolve: (root, {page}) => {
        return [
          peopleData[page]
        ]
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
