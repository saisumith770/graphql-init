import {
    string,
    GraphQLFieldConfig,
    array
} from '../../graph.types'

import Playlist from './playlist.type'

export const playlists: GraphQLFieldConfig = {
    type: array(Playlist),
    args: {
        user_id: { type: string },
    },
    resolve: async function (_, { user_id }, ctx) {
        return ctx.prisma.playlists.findMany({
            where: {
                user_id
            }
        })
    }
}