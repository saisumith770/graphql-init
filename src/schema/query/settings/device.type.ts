import {
    GraphQLObjectType,
    string
} from '../../graph.types'

import Date from '../../custom.types/date'

const Device: GraphQLObjectType = new GraphQLObjectType({
    description: `
        This is a Device object that represents each user's connected devices in the vibe database.
    `,
    name: "devices",
    fields: {
        user_id: { type: string },
        device_name: { type: string },
        created_at: { type: Date }
    }
})

export default Device