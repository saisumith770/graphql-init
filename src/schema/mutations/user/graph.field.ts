import {
    GraphQLFieldConfig
} from '../../graph.types'

import UserMutation from './user.mutation'
import { ResponseObject } from '../../custom.types/response'

export const user: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: UserMutation }
    },
    resolve: async (_, args, ctx) => {
        if (ctx.req.query.identifier !== "unknown user") {
            return ctx.prisma.users.update({
                data: {
                    ...args.info
                },
                where: {
                    user_id: ctx.req.query.identifier as string
                }
            })
                .then(() => ({
                    statusCode: 202,
                    message: "the update has been successfully made"
                }))
                .catch(() => ({
                    status: 401,
                    message: "we weren't able to make the changes. Check if you are authorized to make this request"
                }))
        } else return ({
            statusCode: 401,
            message: "UNAUTHORISED ACCESS"
        })
    }
})