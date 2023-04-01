import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import { Deed, DeedSchema } from './schemas/deeds.schema';

@Module({
  providers: [DeedsService],
  controllers: [DeedsController],
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
})
export class DeedsModule {}
