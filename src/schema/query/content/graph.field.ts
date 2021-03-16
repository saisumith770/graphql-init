import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Content from './content.type'
import { Platforms } from './content.graph.type'

import { users as fakeUsers } from '../../../fakedata/user'

export const vod: GraphQLFieldConfig<any, any> = {
    type: Content,
    args: {
        user_id: { type: nullable(string) },
        vod_id: { type: nullable(string) },
        title: { type: nullable(string) },
        platform: { type: nullable(Platforms) },
        tags: { type: nullable(array(string)) }
    },
    resolve: function (_, { user_id, vod_id, title, platform, tags }, ctx) {
        return fakeUsers
    }
}

export const vods: GraphQLFieldConfig<any, any> = {
    type: array(Content),
    args: {
        user_id: { type: nullable(string) },
        vod_id: { type: nullable(string) },
        title: { type: nullable(string) },
        platform: { type: nullable(Platforms) },
        tags: { type: nullable(array(string)) }
    },
    resolve: function () {
        return fakeUsers
    }
}