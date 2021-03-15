import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString as string,
    getNullableType as nullable,
    GraphQLList as array
} from 'graphql'

import User from './user'

import { users } from '../fakedata/user'

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
            user: {
                type: User,
                args: {
                    username: { type: nullable(string) },
                    user_id: { type: nullable(string) },
                    email: { type: nullable(string) },
                    domain: { type: nullable(string) }
                },
                resolve: function (_, { username, user_id, email }, ctx) {
                    return users.filter(item => {
                        const usernameCondition = username ? item.username === username : true
                        const user_idCondition = user_id ? item.user_id === user_id : true
                        const emailCondition = email ? item.email === email : true
                        return (usernameCondition && user_idCondition && emailCondition)
                    })[0]
                }
            },
            users: {
                type: array(User),
                args: {
                    username: { type: nullable(string) },
                    user_id: { type: nullable(string) },
                    email: { type: nullable(string) },
                    domain: { type: nullable(string) }
                },
                resolve: function () {
                    return users
                }
            }
        }
    })
})