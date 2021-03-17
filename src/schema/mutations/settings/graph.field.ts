import {
    GraphQLFieldConfig,
} from '../../graph.types'

import SettingsMutation from './settings.mutations'

import Settings from '../../query/settings/settings.type'

export const settings: GraphQLFieldConfig<any, any> = ({
    type: Settings,
    args: {
        info: {
            type: SettingsMutation
        }
    },
    resolve: () => {
        return {}
    }
})