import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Integration from './integration.type'

export const integration: GraphQLFieldConfig = {
    type: Integration,
    args: {
        user_id: { type: string },
        platform: { type: string }
    },
    resolve: function (_, { user_id, platform }, ctx) {
        return ctx.prisma.integrations.findFirst({
            where: {
                user_id,
                platform
            }
        })
    }
}

export const integrations: GraphQLFieldConfig = {
    type: array(Integration),
    args: {
        user_id: { type: string }
    },
    resolve: function (_, { user_id }, ctx) {
        return ctx.prisma.integrations.findMany({
            where: {
                user_id
            }
        })
    }
}