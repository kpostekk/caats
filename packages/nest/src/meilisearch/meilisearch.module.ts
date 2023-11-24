import { Module } from '@nestjs/common'
import { MeilisearchService } from './meilisearch.service'

@Module({
  providers: [MeilisearchService],
  exports: [MeilisearchService],
})
export class MeilisearchModule {}
