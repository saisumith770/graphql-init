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
        disable_banner: {
            type: boolean,
            resolve: async (parent, _, __, ___) => {
                return parent.disable_banner === "true"
            }
        },
        disable_trailer: {
            type: boolean,
            resolve: async (parent, _, __, ___) => {
                return parent.disable_trailer === "true"
            }
        },
        devices: {
            type: array(Device),
            resolve: async (parent, _, ctx) => {
                return ctx.prisma.devices.findMany({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        }
    }
})

export default Settings