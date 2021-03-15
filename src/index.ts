import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './schema'

const app = express()

app.use('/graphql', graphqlHTTP((req, res, params) => ({
    schema,
    context: {
        req,
        res,
        params
    },
    graphiql: true
})))

app.listen(4000, () => console.log('server started at port 4000'))