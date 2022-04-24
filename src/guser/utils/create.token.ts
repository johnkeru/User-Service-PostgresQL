import { Guser } from '@prisma/client';
import { sign } from 'jsonwebtoken';

export function makeToken(guser:Guser, secret:string){
    return sign(
        {email: guser.email, username: guser.username, guserid: guser.id},
        secret, 
        {expiresIn: secret === at ? '30m' : '365d'})
}

export const at = process.env.AT
export const rt = process.env.RT