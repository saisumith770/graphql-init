import {
    GraphQLFieldConfig,
} from '../../graph.types'

import ContentMutation from './content.mutation'

import Content from '../../query/content/content.type'

export const content: GraphQLFieldConfig<any, any> = ({
    type: Content,
    args: {
        info: {
            type: ContentMutation
        }
    },
    resolve: () => {
        return {}
    }
})