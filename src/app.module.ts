import { Module } from '@nestjs/common';
import { GuserModule } from './guser/guser.module';

@Module({
  imports: [
    GuserModule
  ],
})
export class AppModule {}
