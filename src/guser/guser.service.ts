import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RegiserResponse } from './Types/response.dto';
import { at, makeToken } from './utils/create.token';
import {verify, hash} from 'argon2'
import { LoginInput, RegiserInput } from './Types/inputs.ts';
import { Guser } from '@prisma/client';
import { register_validation } from './utils/register_validation';

@Injectable()
export class GuserService {
    constructor(private prisma: PrismaService){}
    
    async findByEmail(email:string){
        try{
            await this.prisma.guser.update({where: {email}, data: {active: true}})
        }catch{
            return null
        }
        const user = await this.prisma.guser.findUnique({where: {email}})
        if(!user) return null
        const {password, ...guser} = user
        return guser
    }

    async findAllGuser():Promise<Guser[]>{
        const gusers = await this.prisma.guser.findMany() 
        gusers.map(g => delete g.password)
        return gusers
    }
    async findGuserById(id:string){
        const guser = await this.prisma.guser.findUnique({where: {id}})
        if(!guser) return null
        const {password, ...guser_} = guser
        return guser_
    }
    async register({username, email, password, mnemonic}:RegiserInput):Promise<RegiserResponse> {
        const error = register_validation(username, email, password)
        if(error.field) return {error}
        const hashed_password = await hash(password)
        try{
            const guser:Guser = await this.prisma.guser.create({data: {
                username,
                email,
                password: hashed_password,
                mnemonic
            }}) as any
            const token = makeToken(guser, at);
            return {access_token: "Bearer " + token}
        }catch{return {error: {field: 'email',msg: 'invalid email!',}}}
    }
    async login({email,password}:LoginInput):Promise<RegiserResponse>{
        const error = {field: 'email',msg: 'invalid email!'}
        const password_error = {field: 'password',msg: 'wrong password!'}
        if(!email || email.length < 3) return {error}
        let guser:Guser = await this.prisma.guser.findUnique({where: {email}})
        if(!guser)return {error}
        if(!await verify(guser.password, password))return {error: password_error}
        const token = makeToken(guser, at)
        return {access_token: `Bearer ${token}`}
    }

    async changeImage(img:string, guserid: string){
        try{
            img = (img && img.includes('http://')) ? img.replace('http://', 'https://') : img
            await this.prisma.guser.update({where: {id: guserid}, data: {image: img}})
            return img
        }catch{
            return null
        }   
    }

    async logout(email:string) {
        if(!email)return null
        await this.prisma.guser.update({where: {email}, data: {active: false}})
        return 'logout success'
    }
}
