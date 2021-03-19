import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Integration from './integration.type'

export const integration: GraphQLFieldConfig = {
    type: nullable(Integration),
    args: {
        platform: { type: string }
    },
    resolve: async function (_, { platform }, ctx) {
        if (ctx.req.query.identifier === "unknown user") {
            return ctx.prisma.integrations.findFirst({
                where: {
                    user_id: ctx.req.query.identifier as string,
                    platform
                }
            })
        } else return null
    }
}

export const integrations: GraphQLFieldConfig = {
    type: nullable(array(Integration)),
    resolve: async function (_, __, ctx) {
        if (ctx.req.query.identifier === "unknown user") {
            return ctx.prisma.integrations.findMany({
                where: {
                    user_id: ctx.req.query.identifier as string
                }
            })
        } else return null
    }
}