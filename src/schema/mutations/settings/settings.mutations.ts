import { GraphQLInputObjectType } from 'graphql'
import {
    array,
    boolean,
    int,
    string,
} from '../../graph.types'

const Settings: GraphQLInputObjectType = new GraphQLInputObjectType({
    description: `
        This is a Settings mutation object that would mutate user settings in the vibe database.
    `,
    name: "settings_mutation",
    fields: () => ({
        theme: { type: string },
        disable_banner: { type: boolean },
        disable_trailer: { type: boolean },
        device: {
            type: string,
            resolve: () => {
                return {}
            }
        }
    })
})

export default Settings