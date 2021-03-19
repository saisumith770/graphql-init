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
        twofactor: {
            type: nullable(boolean),
            resolve: (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) return parent.twofactor
                return null
            }
        },
        email: {
            type: nullable(string),
            resolve: (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) return parent.email
                return null
            }
        },
        phone: {
            type: nullable(int),
            resolve: (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) return parent.phone
                return null
            }
        },
        photo: { type: nullable(string) },
        description: { type: nullable(string) },
        channel_trailer: { type: nullable(string) },
        banner: { type: nullable(string) },
        tags: {
            type: nullable(array(string)),
            resolve: async (parent) => {
                return JSON.parse(parent.tags)
            }
        },
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
            type: nullable(array(User)),
            resolve: async (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) {
                    return ctx.prisma.subscription_manager.findMany({
                        where: {
                            viewer_id: parent.user_id
                        }
                    })
                } else return null
            }
        },
        subscribers: { // get all the viewers
            type: nullable(array(User)),
            resolve: async (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) {
                    return ctx.prisma.subscription_manager.findMany({
                        where: {
                            creator_id: parent.user_id
                        }
                    })
                } else return null
            }
        },
        integrations: { // get all the connected platforms
            type: nullable(Integration),
            resolve: async (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) {
                    return ctx.prisma.integrations.findMany({
                        where: {
                            user_id: parent.user_id
                        }
                    })
                } else return null
            }
        },
        settings: { // get all the user settings
            type: nullable(Settings),
            resolve: async (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) {
                    return ctx.prisma.settings.findFirst({
                        where: {
                            user_id: parent.user_id
                        }
                    })
                } else return null
            }
        },
        feed: {
            type: nullable(array(Feed)),
            resolve: async (parent, _, ctx) => {
                if (ctx.req.query.identifier === parent.user_id) {
                    return ctx.prisma.feed.findMany({
                        where: {
                            user_id: parent.user_id
                        }
                    })
                } else return null
            }
        }
    })
})

export default User