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
    // return this.tasks;
    return this.taskModel.find().exec();
  }

  async getById(id: Types.ObjectId) {
    // const task = this.tasks.find((t) => t.id === id);
    // if (!task) return null;
    // return task;
    return this.taskModel.findById(id).exec();
  }

  async create(createTaskDto: CreateTaskDto) {
    // const task = new Task();
    // task.content = createTaskDto.content;
    // this.tasks.push(task);
    // return task;
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async delete(id: Types.ObjectId) {
    // const taskIndex = this.getIndex(id);
    // if (taskIndex === -1) return false;
    // this.tasks.splice(taskIndex, 1);
    // return true;
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async update(id: Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    // const taskIndex = this.getIndex(id);
    // if (taskIndex === -1) return false;
    // const newTask = Object.assign(this.tasks[taskIndex], updateTaskDto);
    // this.tasks[taskIndex] = newTask;
    // return newTask;
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }
}
