import {
    GraphQLObjectType,
    int,
    string
} from "../graph.types";

export const ResponseObject: GraphQLObjectType = new GraphQLObjectType({
    name: "Response",
    fields: {
        statusCode: { type: int },
        message: { type: string }
    }
})