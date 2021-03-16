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

export default new GraphQLObjectType({
    description: `
        This is a User object that represents each user in the vibe database.
    `,
    name: "user",
    fields: {
        user_id: { type: string },
        username: { type: string },
        domain: { type: string },
        created_at: { type: Date },
        confirmed: { type: boolean },
        viewers: { type: int },
        subscription: { type: int },
        vods: { type: int },
        twofactor: { type: boolean },
        email: { type: string },
        phone: { type: nullable(int) },
        photo: { type: nullable(string) },
        description: { type: nullable(string) },
        channel_trailer: { type: nullable(string) },
        banner: { type: nullable(string) },
        tags: { type: nullable(array(string)) },
        content: {
            type: Content,
            args: {
                vod_id: { type: string },
                platform: { type: Platforms }
            },
            resolve: (_, { vod_id, platform }, ctx) => {
                return {}
            }
        }
    }
})