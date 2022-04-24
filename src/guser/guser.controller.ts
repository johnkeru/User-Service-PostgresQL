import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GuserService } from './guser.service';
import { LoginInput, RegiserInput } from './Types/inputs.ts';
import { makeToken, rt } from './utils/create.token';

@Controller()
export class GuserController {
  constructor(private readonly guserService: GuserService) {}

  @MessagePattern('gusers')
    async gusers(){
      const gusers = await this.guserService.findAllGuser()
      return !gusers ? null : gusers
    }

  @MessagePattern('register')
    async register(input:RegiserInput){
        return await this.guserService.register(input)
    }

  @MessagePattern('login')
    async login(input:LoginInput){
        return await this.guserService.login(input)
    }

  @MessagePattern('me')
    async me(email:string){
      if(!email) return null
      const me = await this.guserService.findByEmail(email)
      if(!me) return null
      return me
    }
  @MessagePattern("guserid")
    async findGuserById(id:string){
      if(!id) return null
      const guser = await this.guserService.findGuserById(id)
      if(!guser) return null
      return guser
    }
  @MessagePattern('refresh')
    async refresh_token(email:string){
      const guser = await this.me(email) as any
      return !guser ? null : "Bearer " + makeToken(guser, rt)
    }

  @MessagePattern('changeImage')
  async changeImage(data:{img:string, guserid:string}){
    let {img, guserid} = data
    return await this.guserService.changeImage(img, guserid)
  }
  
  @MessagePattern('logout')
    async logout(email:string){
      return await this.guserService.logout(email)
    }
}
