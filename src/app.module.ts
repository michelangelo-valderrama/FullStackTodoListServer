import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://root:root@0.0.0.0:27017'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
