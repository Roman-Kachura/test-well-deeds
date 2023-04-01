import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeedsModule } from './deeds/deeds.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    DeedsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://Roman:IZ4aa21UKc4hzbjf@atlascluster.ltbd7xe.mongodb.net/test-well-deeds',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
