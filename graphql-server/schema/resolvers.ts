import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { Product } from "../models";
import { EmailScalar } from "../utils/emailScalar";
import { ManufacturerType, ProductType } from "./typedefs";

// Input Types --------------------------------------------
const ContactInputType = new GraphQLInputObjectType({
  name: "ContactInput",
  fields: {
    name: { type: GraphQLString },
    email: { type: EmailScalar },
    phone: { type: GraphQLString },
  },
});

const ManufacturerInputType = new GraphQLInputObjectType({
  name: "ManufacturerInput",
  fields: {
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    website: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    contactInfo: { type: ContactInputType },
  },
});

// Queries --------------------------------------------
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({});
      },
    },
    totalStockValue: {
      type: GraphQLInt,
      async resolve() {
        const res = await Product.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ["$price", "$amountInStock"] } },
            },
          },
        ]);
        return res[0].total;
      },
    },
    totalStockValueByManufacturer: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "TotalStockValueByManufacturer",
          fields: {
            manufacturer: { type: GraphQLString },
            total: { type: GraphQLInt },
          },
        })
      ),
      async resolve() {
        const res = await Product.aggregate([
          {
            $group: {
              _id: "$manufacturer.name",
              total: { $sum: { $multiply: ["$price", "$amountInStock"] } },
            },
          },
        ]);
        return res.map((r) => ({ manufacturer: r._id, total: r.total }));
      },
    },
    lowStockProducts: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({ amountInStock: { $lt: 10 } });
      },
    },
    criticalStockProducts: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({ amountInStock: { $lt: 5 } });
      },
    },
    manufacturers: {
      type: new GraphQLList(ManufacturerType),
      resolve() {
        return Product.distinct("manufacturer");
      },
    },
  },
});

// Mutations -----------------------------
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
        manufacturer: { type: ManufacturerInputType },
      },
      resolve(parent, args) {
        const product = new Product({
          name: args.name,
          sku: args.sku,
          description: args.description,
          price: args.price,
          category: args.category,
          amountInStock: args.amountInStock,
          manufacturer: args.manufacturer,
          contactInfo: args.contactInfo,
        });
        return product.save();
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        category: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
        manufacturer: { type: ManufacturerInputType },
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            sku: args.sku,
            description: args.description,
            price: args.price,
            category: args.category,
            amountInStock: args.amountInStock,
            manufacturer: args.manufacturer,
            contactInfo: args.contactInfo,
          },
          { new: true }
        );
      },
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
