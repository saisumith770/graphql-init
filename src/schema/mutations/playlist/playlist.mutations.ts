import { GraphQLInputObjectType } from 'graphql'
import {
    array,
    boolean,
    int,
    string,
} from '../../graph.types'
import Date from '../../custom.types/date'

const Playlist: GraphQLInputObjectType = new GraphQLInputObjectType({
    description: `
        This is a Playlist mutation object that would mutate user's playlists in the vibe database.
    `,
    name: "playlist_mutation",
    fields: () => ({
        name: { type: string },
        created_at: { type: Date },
        vods: { type: int }
    })
})

export default Playlist