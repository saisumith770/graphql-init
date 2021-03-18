import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql'

import {
    users,
    user
} from './query/user/graph.field'

import {
    vod,
    vods
} from './query/content/graph.field'

import {
    feeds
} from './query/feed/graph.field'

import {
    integration,
    integrations
} from './query/integration/graph.field'

import {
    settings
} from './query/settings/graph.field'

import {
    playlists
} from './query/playlists/graph.field'

import { user as updateUser } from './mutations/user/graph.field'

import {
    createContent,
    updateContent,
    addContentToPlaylist as addToPlaylist
} from './mutations/content/graph.field'

import { settings as updateSettings } from './mutations/settings/graph.field'

import { createPlaylist } from './mutations/playlist/graph.field'

import {
    connectPlatform,
    removePlatform
} from './mutations/integrations/graph.field'

export default new GraphQLSchema({
    description: `
        This is a graphql api served with express and express-graphql. It implements standard
        graphql structure. This api will allow you to work with all the data that was previously
        available in the vibe restful api. Here you can see information about users, content, 
        connections and more.
    `,
    query: new GraphQLObjectType({
        name: "RootQuery",
        fields: {
            user,
            users,
            vod,
            vods,
            feeds,
            integration,
            integrations,
            settings,
            playlists
        }
    }),
    mutation: new GraphQLObjectType({
        name: "mutations",
        fields: {
            updateUser,
            createContent,
            updateContent,
            updateSettings,
            createPlaylist,
            addToPlaylist,
            connectPlatform,
            removePlatform,
        }
    })
})