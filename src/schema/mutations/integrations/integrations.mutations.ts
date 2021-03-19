import { GraphQLInputObjectType } from 'graphql'
import {
    boolean,
    string,
} from '../../graph.types'

const Integration: GraphQLInputObjectType = new GraphQLInputObjectType({
    description: `
        This is a Integration mutation object that would mutate user's integration in the vibe database.
    `,
    name: "integration_mutation",
    fields: () => ({
        platform: { type: string },
        accountName: { type: string },
        accountURL: { type: string },
        showOnProfile: { type: boolean },
        access_token: { type: string },
        refresh_token: { type: string },
        platform_user_id: { type: string }
    })
})

export default Integration