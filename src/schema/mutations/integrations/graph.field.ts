import {
    GraphQLFieldConfig,
} from '../../graph.types'

import IntergationMutation from './integrations.mutations'

import Integration from '../../query/integration/integration.type'

export const integrations: GraphQLFieldConfig<any, any> = ({
    type: Integration,
    args: {
        info: {
            type: IntergationMutation
        }
    },
    resolve: () => {
        return {}
    }
})