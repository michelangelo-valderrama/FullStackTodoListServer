import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop({ default: false })
  done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
