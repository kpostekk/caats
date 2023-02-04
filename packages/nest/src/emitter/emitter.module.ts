import { Module } from '@nestjs/common'
import { EmitterService } from './emitter.service'

@Module({
  providers: [EmitterService],
  exports: [EmitterService],
})
export class EmitterModule {}
