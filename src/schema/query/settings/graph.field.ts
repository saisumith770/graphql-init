import {
    string,
    GraphQLFieldConfig,
    nullable
} from '../../graph.types'

import Settings from './settings.type'

export const settings: GraphQLFieldConfig = {
    type: nullable(Settings),
    resolve: async function (_, __, ctx) {
        if (ctx.req.query.identifier === "unknown user") {
            return ctx.prisma.settings.findFirst({
                where: {
                    user_id: ctx.req.query.identifier as string
                }
            })
        } else return null
    }
}