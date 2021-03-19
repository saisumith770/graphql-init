import {
    GraphQLFieldConfig,
    string,
} from '../../graph.types'

import PlaylistMutation from './playlist.mutations'

import { ResponseObject } from '../../custom.types/response'

export const createPlaylist: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: PlaylistMutation }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.playlists.create({
                data: {
                    user_id: ctx.req.query.identifier as string,
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
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})