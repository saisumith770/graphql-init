import {
    array,
    boolean,
    GraphQLObjectType,
    string
} from '../../graph.types'
import User from '../user/user.type'

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
            resolve: (parent, _, __, ___) => {
                return parent.disable_banner === "true"
            }
        },
        disable_trailer: {
            type: boolean,
            resolve: (parent, _, __, ___) => {
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
        },
        user: {
            type: string,
            resolve: (parent, _, ctx) => {
                return ctx.prisma.users.findFirst({
                    where: {
                        user_id: parent.user_id
                    }
                })
            }
        }
    }
})

export default Settings