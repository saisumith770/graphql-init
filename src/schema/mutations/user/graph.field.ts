import {
    GraphQLFieldConfig,
} from '../../graph.types'

import UserMutation from './user.mutation'

import User from '../../query/user/user.type'


export const user: GraphQLFieldConfig<any, any> = ({
    type: User,
    args: {
        info: {
            type: UserMutation
        }
    },
    resolve: () => {
        return {}
    }
})