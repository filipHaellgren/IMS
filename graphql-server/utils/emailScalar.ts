import { GraphQLScalarType, Kind } from "graphql";

export const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "A custom scalar for validating emails",
  serialize(value) {
    return value; // value sent to the client
  },
  parseValue(value) {
    // value from the client
    if (typeof value !== "string") {
      throw new TypeError(`Value is not a string: ${value}`);
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value as string)) {
      throw new Error("Invalid email format");
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(ast.value)) {
        throw new Error("Invalid email format");
      }
      return ast.value;
    }
    return null;
  },
});
