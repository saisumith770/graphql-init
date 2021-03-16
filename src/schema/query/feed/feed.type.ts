import {
    array,
    boolean,
    GraphQLObjectType,
    int,
    nullable,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'

import Content from '../content/content.type'
import { Platforms } from '../content/content.graph.type'
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
            resove: () => {
                return {}
            }
        }
    })
})

export default Feed