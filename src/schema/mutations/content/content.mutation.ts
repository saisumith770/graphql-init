import { GraphQLInputObjectType } from 'graphql'
import {
    array,
    string,
    boolean
} from '../../graph.types'

const Content: GraphQLInputObjectType = new GraphQLInputObjectType({
    description: `
        This is a Content mutation object that would mutate user's content in the vibe database.
    `,
    name: "content_mutation",
    fields: () => ({
        title: { type: string },
        thumbnail: { type: string },
        platform: { type: string },
        url: { type: string },
        tags: { type: array(string) },
        archived: { type: boolean },
        playlists: { type: array(string) }
    })
})

export default Content