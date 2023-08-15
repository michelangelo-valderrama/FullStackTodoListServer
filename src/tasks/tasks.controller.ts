import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Id } from './entity/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: Id) {
    const task = await this.tasksService.getById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTaskDto: CreateTaskDto) {
    const tasks = this.tasksService.create(createTaskDto);
    return tasks;
  }

  @Delete(':id')
  async delete(@Param('id') id: Id) {
    const tasks = await this.tasksService.delete(id);
    if (!tasks) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return tasks;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: Id, @Body() updateTaskDto: UpdateTaskDto) {
    const tasks = await this.tasksService.update(id, updateTaskDto);
    if (!tasks) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return tasks;
  }
}
