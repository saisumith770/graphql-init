import {
    GraphQLFieldConfig,
    string,
} from '../../graph.types'
import { v4 } from 'uuid'

import ContentMutation from './content.mutation'

import { ResponseObject } from '../../custom.types/response'

export const createContent: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: ContentMutation }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.vods.create({
                data: {
                    user_id: ctx.req.query.identifier as string,
                    vod_id: v4(),
                    published_at: new Date(),
                    ...args.info
                }
            })
                .then(() => ({
                    statusCode: 200,
                    message: "new content has been created"
                }))
                .catch(() => ({
                    statusCode: 400,
                    message: "we weren't able to create the content"
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})

export const updateContent: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: ContentMutation },
        vod_id: { type: string }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.vods.update({
                data: {
                    ...args.info
                },
                where: {
                    user_id_vod_id: {
                        user_id: ctx.req.query.identifier as string,
                        vod_id: args.vod_id
                    }
                }
            })
                .then(() => ({
                    statusCode: 200,
                    message: "the content data has been successfully updated"
                }))
                .catch(() => ({
                    statusCode: 401,
                    message: "we weren't able to update the content"
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})

export const addContentToPlaylist: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        vod_id: { type: string },
        playlist: { type: string }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.playlist_vods.create({
                data: {
                    name: args.playlist,
                    user_id: ctx.req.query.identifier as string,
                    vod_id: args.vod_id,
                    created_at: new Date()
                }
            })
                .then(() => ({
                    statusCode: 200,
                    message: "added the content to playlist"
                }))
                .catch(() => ({
                    statusCode: 401,
                    message: "we weren't able to add to playlist. check your authorization."
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})