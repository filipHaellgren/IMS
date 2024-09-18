import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/resolvers";

const app = express();
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
