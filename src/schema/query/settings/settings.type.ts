import {
    array,
    boolean,
    GraphQLObjectType,
    string
} from '../../graph.types'

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