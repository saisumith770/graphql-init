import { Request, Response } from 'express'

import { refresh_token_secret, build_type } from '../config/environment_variables'
import { access_token_secret } from '../config/environment_variables'

import jwt from 'jsonwebtoken'

interface Payload {
    user_id: string
}

function App_Token(payload: Payload): string {  //access token that will expire in 10 days
    const access_token = jwt.sign(payload, access_token_secret, {
        algorithm: "HS256",
        expiresIn: 864000
    })
    return access_token
}

function Refresh_Token(payload: Payload): string {  //access token that will expire in 11 days
    const refresh_token = jwt.sign(payload, refresh_token_secret, {
        algorithm: "HS512",
        expiresIn: 950400
    })
    return refresh_token
}

export function Revoke(_: Request, res: Response, refresh_token: string) {
    jwt.verify(refresh_token, refresh_token_secret, (err: any, data: any) => {    //validate the refresh token
        if (!err) {
            var access_token = App_Token(data)
            var refresh_token = Refresh_Token(data)
            res.statusCode = 200
            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: build_type === "production",
                maxAge: 1000 * 60 * 60 * 24 * 10
            })
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: build_type === "production",
                maxAge: 1000 * 60 * 60 * 24 * 11
            })
            res.json({
                type: "bearer",
                status: "token has been set"
            })
        } else {    //fires when you provide an invalid refresh token
            res.statusCode = 403
            res.json({
                exception: "invalid refresh token",
                status: "provide a valid refresh token otherwise hit the /auth/login endpoint to get the access token"
            })
        }
    })
}