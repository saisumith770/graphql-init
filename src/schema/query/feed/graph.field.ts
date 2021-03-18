import {
    array,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Feed from './feed.type'

export const feeds: GraphQLFieldConfig = {
    type: array(Feed),
    args: {
        user_id: { type: string }
    },
    resolve: async function (_, { user_id }, ctx) {
        return ctx.prisma.feed.findMany({
            where: {
                user_id
            }
        })
    }
}