import {
    array,
    nullable,
    string,
    GraphQLFieldConfig
} from '../../graph.types'

import Feed from './feed.type'

import { users as fakeUsers } from '../../../fakedata/user'

export const feeds: GraphQLFieldConfig<any, any> = {
    type: array(Feed),
    args: {
        user_id: { type: string }
    },
    resolve: function () {
        return fakeUsers
    }
}