import {
    array,
    boolean,
    GraphQLObjectType,
    int,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'
import { Platforms } from './content.graph.type'

export default new GraphQLObjectType({
    description: `
        This is a Content object that represents each content type in the vibe database.
    `,
    name: "content",
    fields: {
        user_id: { type: string },
        vod_id: { type: string },
        title: { type: string },
        thumbnail: { type: string },
        views: { type: int },
        published_at: { type: Date },
        platform: { type: Platforms },
        url: { type: string },
        tags: {
            type: array(string),
            resolve: async (parent) => {
                return JSON.parse(parent.tags)
            }
        },
        archived: { type: boolean },
        playlists: { // playlists that the vod belongs to
            type: array(string),
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.playlist_vods.findMany({
                    where: {
                        user_id: parent.user_id,
                        vod_id: parent.vod_id
                    },
                    select: {
                        name: true
                    }
                })
            }
        }
    }
})