import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Content from './content.type'
import { Platforms } from './content.graph.type'

type whereClause = {
    user_id: string,
    vod_id: string,
    title: string,
    platform: string,
    tags: {
        equals: string
    }
}

export const vod: GraphQLFieldConfig = {
    type: Content,
    args: {
        user_id: { type: nullable(string) },
        vod_id: { type: string },
        title: { type: nullable(string) },
        platform: { type: nullable(Platforms) },
        tags: { type: nullable(array(string)) }
    },
    resolve: function (_, { user_id, vod_id, title, platform, tags }, ctx) {
        const where: Partial<whereClause> = {}
        if (user_id) where.user_id = user_id
        if (vod_id) where.vod_id = vod_id
        if (title) where.title = title
        if (platform) where.platform = platform
        if (tags) where.tags!.equals = JSON.stringify(tags)
        return ctx.prisma.vods.findFirst({
            where
        })
    }
}

export const vods: GraphQLFieldConfig = {
    type: array(Content),
    args: {
        user_id: { type: nullable(string) },
        vod_id: { type: nullable(string) },
        title: { type: nullable(string) },
        platform: { type: nullable(Platforms) },
        tags: { type: nullable(array(string)) }
    },
    resolve: function (_, { user_id, vod_id, title, platform, tags }, ctx) {
        const where: Partial<whereClause> = {}
        if (user_id) where.user_id = user_id
        if (vod_id) where.vod_id = vod_id
        if (title) where.title = title
        if (platform) where.platform = platform
        if (tags) where.tags!.equals = JSON.stringify(tags)
        return ctx.prisma.vods.findMany({
            where
        })
    }
}