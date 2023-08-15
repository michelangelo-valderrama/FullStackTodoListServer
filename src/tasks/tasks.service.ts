import { Injectable } from '@nestjs/common';
import { Task, Id } from './entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  async getAll() {
    return this.tasks;
  }

  async getById(id: Id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.content = createTaskDto.content;
    this.tasks.push(task);
    return this.getAll();
  }

  async delete(id: Id) {
    const taskIndex = this.getIndex(id);
    if (taskIndex === -1) return false;
    this.tasks.splice(taskIndex, 1);
    return this.getAll();
  }

  async update(id: Id, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.getIndex(id);
    if (taskIndex === -1) return false;
    const newTask = Object.assign(this.tasks[taskIndex], updateTaskDto);
    this.tasks[taskIndex] = newTask;
    return this.getAll();
  }

  private getIndex(id: Id) {
    const index = this.tasks.findIndex((t) => t.id === id);
    return index;
  }
}
