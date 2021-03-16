import {
    array,
    boolean,
    GraphQLObjectType,
    int,
    nullable,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'
import { Platforms } from './content.graph.type'

export default new GraphQLObjectType({
    description: `
        This is a Content object that represents each content type in the vibe database.
    `,
    name: "content",
    fields: {
        user_id: { type: string },
        vod_id: { type: string },
        title: { type: string },
        thumbnail: { type: string },
        views: { type: int },
        published_at: { type: Date },
        platform: { type: Platforms },
        url: { type: string },
        tags: { type: nullable(array(string)) },
        archived: { type: nullable(boolean) }
    }
})