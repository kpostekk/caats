import { Injectable } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class PubsubService extends PubSub {
  public asyncData(triggers: string | string[], onClose: () => void) {
    const asyncIterator = this.asyncIterator(triggers)

    const returnCopy = asyncIterator.return.bind(asyncIterator)
    asyncIterator.return = () => {
      onClose()
      return returnCopy()
    }

    return asyncIterator
  }
}
