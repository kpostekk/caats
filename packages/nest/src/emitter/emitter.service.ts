import { Injectable } from '@nestjs/common'
import mqemitter from 'mqemitter'

@Injectable()
export class EmitterService {
  private readonly emitter = mqemitter()

  getEmitter() {
    return this.emitter
  }
}
