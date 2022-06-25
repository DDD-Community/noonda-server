import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { ReviewModule } from './review/review.module';
import { ArchiveModule } from './archive/archive.module';
import { WishModule } from './wish/wish.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? 'config/.env.prod'
          : 'config/.env.dev',
        'config/.env.all',
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UserModule,
    PerformanceModule,
    ReviewModule,
    ArchiveModule,
    WishModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
