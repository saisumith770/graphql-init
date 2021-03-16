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
import Integration from '../integration/integration.type'

const User: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a User object that represents each user in the vibe database.
    `,
    name: "user",
    fields: () => ({
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
        content: { // get all the user content
            type: Content,
            resolve: (parent, __, ctx) => {
                return {}
            }
        },
        playlists: { // get all user playlists
            type: array(string),
            resolve: () => {
                return {}
            }
        },
        subscriptions: { // get all the creators subscribed to
            type: array(User),
            resolve: () => {
                return {}
            }
        },
        subscribers: { // get all the viewers
            type: array(User),
            resolve: () => {
                return {}
            }
        },
        integrations: { // get all the connected platforms
            type: Integration,
            resolve: () => {
                return {}
            }
        }
    })
})

export default User