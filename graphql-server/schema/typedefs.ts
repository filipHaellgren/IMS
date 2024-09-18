import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
});

export const ManufacturerType = new GraphQLObjectType({
  name: "Manufacturer",
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    Contact: { type: ContactType },
  },
});

export const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    category: { type: GraphQLString },
    amountInStock: { type: GraphQLInt },
    Manufacturer: { type: ManufacturerType },
  },
});
