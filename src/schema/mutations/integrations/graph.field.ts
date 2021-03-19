import {
    GraphQLFieldConfig,
    string,
} from '../../graph.types'

import IntergationMutation from './integrations.mutations'

import { ResponseObject } from '../../custom.types/response'

export const connectPlatform: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: IntergationMutation }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.integrations.create({
                data: {
                    users: {
                        connect: {
                            user_id: ctx.req.query.identifier as string
                        }
                    },
                    created_at: new Date(),
                    ...args.info
                }
            })
                .then(() => ({
                    statusCode: 200,
                    message: "the settings have been updated"
                }))
                .catch(() => ({
                    statusCode: 404,
                    message: "we weren't able to update the settings check your authorisation"
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})

export const removePlatform: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        platform: { type: string }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.integrations.deleteMany({
                where: {
                    user_id: ctx.req.query.identifier as string,
                    platform: args.platform
                }
            })
                .then(() => ({
                    statusCode: 200,
                    message: "the settings have been updated"
                }))
                .catch(() => ({
                    statusCode: 404,
                    message: "we weren't able to update the settings check your authorisation"
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})