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
import Settings from '../settings/settings.type'
import Feed from '../feed/feed.type'
import Playlist from '../playlists/playlist.type'

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
        tags: { type: nullable(string) },
        content: { // get all the user content
            type: array(Content),
            resolve: async (parent, __, ctx) => {
                return ctx.prisma.vods.findMany({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        },
        playlists: { // get all user playlists
            type: array(Playlist),
            resolve: async (parent, __, ctx) => {
                return ctx.prisma.playlists.findMany({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        },
        subscriptions: { // get all the creators subscribed to
            type: array(User),
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.subscription_manager.findMany({
                    where: {
                        viewer_id: parent.user_id
                    }
                })
            }
        },
        subscribers: { // get all the viewers
            type: array(User),
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.subscription_manager.findMany({
                    where: {
                        creator_id: parent.user_id
                    }
                })
            }
        },
        integrations: { // get all the connected platforms
            type: Integration,
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.integrations.findMany({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        },
        settings: { // get all the user settings
            type: Settings,
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.settings.findFirst({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        },
        feed: {
            type: array(Feed),
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.feed.findMany({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        }
    })
})

export default User