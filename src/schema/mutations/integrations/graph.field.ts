import {
    GraphQLFieldConfig,
    string,
} from '../../graph.types'

import IntergationMutation from './integrations.mutations'

import { ResponseObject } from '../../custom.types/response'

export const connectPlatform: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: IntergationMutation },
        user_id: { type: string }
    },
    resolve: async (_, args, ctx) => {
        return ctx.prisma.integrations.create({
            data: {
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
    }
})

export const removePlatform: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        platform: { type: string },
        user_id: { type: string }
    },
    resolve: async (_, args, ctx) => {
        return ctx.prisma.integrations.deleteMany({
            where: {
                user_id: args.user_id,
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
    }
})