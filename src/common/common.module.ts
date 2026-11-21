import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

// we need this since we are using dependency injection outside of a module
@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //   consumer.apply(LoggingMiddleware).forRoutes('students');

    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'students', method: RequestMethod.GET });

    // consumer.apply(LoggingMiddleware).exclude().forRoutes('*');
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
