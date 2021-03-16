import {
    GraphQLSchema,
    GraphQLObjectType
} from 'graphql'

import {
    users,
    user
} from './query/user/graph.field'

import {
    vod,
    vods
} from './query/content/graph.field'

export default new GraphQLSchema({
    description: `
        This is a graphql api served with express and express-graphql. It implements standard
        graphql structure. This api will allow you to work with all the data that was previously
        available in the vibe restful api. Here you can see information about users, content, 
        connections and more.
    `,
    query: new GraphQLObjectType({
        name: "PrimaryQuery",
        fields: {
            user,
            users,
            vod,
            vods
        }
    }),
    mutation: new GraphQLObjectType({
        name: "query mutation",
        fields: {

        }
    })
})