import {
    GraphQLFieldConfig,
    string,
} from '../../graph.types'

import PlaylistMutation from './playlist.mutations'

import { ResponseObject } from '../../custom.types/response'

export const createPlaylist: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: PlaylistMutation },
        user_id: { type: string }
    },
    resolve: async (_, args, ctx) => {
        return ctx.prisma.playlists.create({
            data: {
                ...args.info
            }
        })
            .then(() => ({
                statusCode: 200,
                message: "the settings have been updated"
            }))
            .catch(() => ({
                statusCode: 404,
                message: "we weren't able to update the settings check your authorisation"
            }))
    }
})