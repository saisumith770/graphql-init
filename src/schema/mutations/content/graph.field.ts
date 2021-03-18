import {
    GraphQLFieldConfig,
    enumerate,
    string,
} from '../../graph.types'

import ContentMutation from './content.mutation'

import { ResponseObject } from '../../custom.types/response'

const Methods = new enumerate({
    name: "Content Mutation Methods",
    values: {
        CREATE: { value: "create" },
        UPDATE: { value: "update" }
    }
})

export const content: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: ContentMutation },
        method: { type: Methods },
        user_id: { type: string },
        vod: { type: string }
    },
    resolve: async (_, args, ctx) => {
        if (args.method === Methods.getValue('CREATE')) return ctx.prisma.vods.create({
            data: {
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
        else if (args.method === Methods.getValue('UPDATE')) return ctx.prisma.vods.update({
            data: {
                ...args.info
            },
            where: {
                user_id_vod_id: {
                    user_id: args.user_id,
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
    }
})