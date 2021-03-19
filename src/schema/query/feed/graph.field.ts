import {
    array,
    string,
    GraphQLFieldConfig,
    nullable
} from '../../graph.types'

import Feed from './feed.type'

export const feeds: GraphQLFieldConfig = {
    type: nullable(array(Feed)),
    resolve: async function (_, __, ctx) {
        if (ctx.req.query.identifier === "unknown user") {
            return ctx.prisma.feed.findMany({
                where: {
                    user_id: ctx.req.query.identifier as string
                }
            })
        } else return null
    }
}