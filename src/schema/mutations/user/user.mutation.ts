import { GraphQLInputObjectType } from 'graphql'
import {
    array,
    int,
    string,
} from '../../graph.types'

const User: GraphQLInputObjectType = new GraphQLInputObjectType({
    description: `
        This is a User mutation object that would mutate user info in the vibe database.
    `,
    name: "user_mutation",
    fields: () => ({
        username: { type: string },
        domain: { type: string },
        viewers: { type: int },
        subscription: { type: int },
        vods: { type: int },
        email: { type: string },
        phone: { type: int },
        photo: { type: string },
        description: { type: string },
        channel_trailer: { type: string },
        banner: { type: string },
        tags: { type: array(string) }
    })
})

export default User