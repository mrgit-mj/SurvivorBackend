import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorModule } from './survivor/survivor.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ItemModule } from './item/item.module';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SurvivorModule,
    ItemModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
