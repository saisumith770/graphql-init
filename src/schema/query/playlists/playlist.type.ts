import {
    array,
    GraphQLObjectType,
    int,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'
import Content from '../content/content.type'

const Playlist: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a Playlist object that represents each user's playlist's in the vibe database.
    `,
    name: "playlist",
    fields: {
        user_id: { type: string },
        name: { type: string },
        created_at: { type: Date },
        vods: { type: int },
        content: {
            type: array(Content),
            resolve: async (parent, _, ctx) => {
                const mapping = await ctx.prisma.playlist_vods.findMany({
                    where: {
                        name: parent.name,
                        user_id: parent.user_id
                    },
                    select: {
                        vod_id: true
                    }
                })
                return Promise.all(mapping.map(item => {
                    return ctx.prisma.vods.findFirst({
                        where: {
                            user_id: parent.user_id,
                            vod_id: item.vod_id
                        }
                    })
                }))
            }
        }
    }
})

export default Playlist