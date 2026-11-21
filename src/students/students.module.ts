import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Course } from './entities/course.entity';
import { Event } from './entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Student, Course, Event])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(StudentsController);
  }
}
