import {
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Settings from './settings.type'

export const settings: GraphQLFieldConfig = {
    type: Settings,
    args: {
        user_id: { type: string },
    },
    resolve: async function (_, { user_id }, ctx) {
        return ctx.prisma.settings.findFirst({
            where: {
                user_id
            }
        })
    }
}