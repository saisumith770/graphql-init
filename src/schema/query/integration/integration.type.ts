import {
    boolean,
    GraphQLObjectType,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'

import { Platforms } from '../content/content.graph.type'
import User from '../user/user.type'

const Integration: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a Integration object that represents each platform integration in the vibe database.
    `,
    name: "integration",
    fields: () => ({
        user_id: { type: string },
        platform: { type: Platforms },
        accountName: { type: string },
        accountURL: { type: string },
        showOnProfile: { type: boolean },
        access_token: { type: string },
        refresh_token: { type: string },
        platform_user_id: { type: string },
        created_at: { type: Date },
        user: {
            type: string,
            resolve: () => {
                return {}
            }
        }
    })
})

export default Integration