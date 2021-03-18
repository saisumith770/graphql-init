import {
    GraphQLObjectType,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'

import User from '../user/user.type'

const Feed: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a Feed object that represents each user's feed in the vibe database.
    `,
    name: "feed",
    fields: () => ({
        user_id: { type: string },
        creator_id: { type: string },
        feed_id: { type: string },
        message: { type: string },
        timestamp: { type: Date },
        deep_link: { type: string },
        preview: { type: string },
        creator: {
            type: User,
            resolve: (parent, _, ctx) => {
                return ctx.prisma.users.findFirst({
                    where: {
                        user_id: parent.creator_id
                    }
                })
            }
        },
        viewer: {
            type: User,
            resolve: (parent, _, ctx) => {
                return ctx.prisma.users.findFirst({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        }
    })
})

export default Feed