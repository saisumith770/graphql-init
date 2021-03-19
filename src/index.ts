import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { PrismaClient } from '@prisma/client'

import { generateSecurity } from './security'
import schema from './schema/schema'

const app = express()

const prisma = new PrismaClient()

generateSecurity(app)

app.use('/graphql', graphqlHTTP((req, res, params) => ({
    schema,
    context: {
        req,
        res,
        params,
        prisma
    },
    graphiql: true
})))

app.listen(4000, () => console.log('server started at port 4000'))