import {
    GraphQLObjectType,
    GraphQLString as string,
    getNullableType as nullable,
    GraphQLFieldConfig,
    GraphQLScalarType,
    GraphQLBoolean as boolean,
    GraphQLInt as int,
    GraphQLList as array
} from 'graphql'

import { Kind } from 'graphql/language';

const CustomDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(value); // value from the client
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    },
})

export default new GraphQLObjectType({
    description: `
        This is a User object that represents each user in the vibe database.
    `,
    name: "user",
    fields: {
        user_id: { type: string },
        username: { type: string },
        domain: { type: string },
        created_at: { type: CustomDate },
        confirmed: { type: boolean },
        viewers: { type: int },
        subscription: { type: int },
        vods: { type: int },
        twofactor: { type: boolean },
        email: { type: string },
        phone: { type: nullable(int) },
        photo: { type: nullable(string) },
        description: { type: nullable(string) },
        channel_trailer: { type: nullable(string) },
        banner: { type: nullable(string) },
        tags: { type: nullable(array(string)) }
    }
})