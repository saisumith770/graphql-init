import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import User from './user.type'

type whereClause = { user_id: string, username: string, email: string }

export const user: GraphQLFieldConfig<any, any> = {
    type: User,
    args: {
        username: { type: nullable(string) },
        user_id: { type: nullable(string) },
        email: { type: nullable(string) },
        domain: { type: nullable(string) }
    },
    resolve: async function (_, { username, user_id, email }, ctx) {
        const where: Partial<whereClause> = await {}
        if (user_id) where.user_id = await user_id
        if (username) where.username = await username
        if (email) where.email = await email
        return ctx.prisma.users.findFirst({
            where
        })
    }
}

export const users: GraphQLFieldConfig<any, any> = {
    type: array(User),
    args: {
        username: { type: nullable(string) },
        user_id: { type: nullable(string) },
        email: { type: nullable(string) },
        domain: { type: nullable(string) }
    },
    resolve: async function (_, { username, user_id, email }, ctx) {
        const where: Partial<whereClause> = await {}
        if (user_id) where.user_id = await user_id
        if (username) where.username = await username
        if (email) where.email = await email
        return ctx.prisma.users.findMany({
            where
        })
    }
}