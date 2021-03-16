import {
    array,
    boolean,
    GraphQLObjectType,
    int,
    nullable,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'

import Content from '../content/content.type'
import Integration from '../integration/integration.type'
import Device from './device.type'

const Settings: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a Settings object that represents each user's settings in the vibe database.
    `,
    name: "settings",
    fields: {
        user_id: { type: string },
        theme: { type: string },
        disable_banner: { type: boolean },
        disable_trailer: { type: boolean },
        devices: {
            type: array(Device),
            resolve: () => {
                return {}
            }
        }
    }
})

export default Settings