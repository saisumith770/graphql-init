import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import User from './user.type'

import { users as fakeUsers } from '../../../fakedata/user'

export const user: GraphQLFieldConfig<any, any> = {
    type: User,
    args: {
        username: { type: nullable(string) },
        user_id: { type: nullable(string) },
        email: { type: nullable(string) },
        domain: { type: nullable(string) }
    },
    resolve: function (_, { username, user_id, email }, ctx) {
        return fakeUsers.filter(item => {
            const usernameCondition = username ? item.username === username : true
            const user_idCondition = user_id ? item.user_id === user_id : true
            const emailCondition = email ? item.email === email : true
            return (usernameCondition && user_idCondition && emailCondition)
        })[0]
    }
}

export const users: GraphQLFieldConfig<any, any> = {
    type: array(User),
    args: {
        username: { type: nullable(string) },
        user_id: { type: nullable(string) },
        email: { type: nullable(string) },
        domain: { type: nullable(string) }
    },
    resolve: function () {
        return fakeUsers
    }
}