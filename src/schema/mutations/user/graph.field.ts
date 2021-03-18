import {
    GraphQLFieldConfig,
    string,
    GraphQLObjectType,
    int
} from '../../graph.types'

import UserMutation from './user.mutation'
import { ResponseObject } from '../../custom.types/response'

export const user: GraphQLFieldConfig = ({
    type: ResponseObject,
    args: {
        info: { type: UserMutation },
        user_id: { type: string }
    },
    resolve: async (_, args, ctx) => {
        return ctx.prisma.users.update({
            data: {
                ...args.info
            },
            where: {
                user_id: args.user_id
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
    }
})