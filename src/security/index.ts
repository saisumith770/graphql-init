import express, { Express } from 'express'

import helmet from 'helmet'
import rateLimiter from 'express-rate-limit'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

import { access_token_secret } from '../config/environment_variables'

import { Revoke } from './revoke'

export function generateSecurity(app: Express) {
    //security related middlewares
    app.disable("x-powered-by")
    app.use(helmet())   //the helmet library comes along with special middlewares for security
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
        optionsSuccessStatus: 200
    }))
    app.use(rateLimiter({   //prevent multiple requests from being sent to api from a single ip
        windowMs: 10,
        max: 10,
        message: {
            status: 429,
            message: "you have exceeded the request limit"
        }
    }))

    //data mutation middlewares
    // app.use(cookieParser())
    app.use(express.json()) //convert incoming req into JSON type
    app.use(express.urlencoded({ extended: false })) //remove utf-8 enconding
    app.use(cookieParser())

    app.use((req, res, next) => {
        const { access_token, refresh_token } = req.cookies
        jwt.verify(access_token, access_token_secret, (err: any, data: any) => {
            if (!err) {
                req.query.identifier = data.user_id || "unknown user"
                next()
            }
            else {
                try { Revoke(req, res, refresh_token) }
                catch { res.redirect('http://localhost:3000/auth/login') }
            }
        })
    })
}