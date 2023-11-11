import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async getAll() {
    return this.taskModel.find().exec();
  }

  async getById(id: Types.ObjectId) {
    return this.taskModel.findById(id).exec();
  }

  async create(createTaskDto: CreateTaskDto) {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async delete(id: Types.ObjectId) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async update(id: Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }
}
