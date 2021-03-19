import {
    GraphQLFieldConfig,
    string
} from '../../graph.types'

import SettingsMutation from './settings.mutations'

import { ResponseObject } from '../../custom.types/response'

export const settings: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: SettingsMutation }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.settings.update({
                data: {
                    ...args.info
                },
                where: {
                    user_id: ctx.req.query.identifier as string
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