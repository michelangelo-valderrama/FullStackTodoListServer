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
import { Types } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAll() {
    return this.tasksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: Types.ObjectId) {
    const task = await this.tasksService.getById(id);
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
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
  async delete(@Param('id') id: Types.ObjectId) {
    const deletedTask = await this.tasksService.delete(id);
    if (!deletedTask) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return { message: `Task ${id} deleted` };
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    if (!updatedTask) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return updatedTask;
  }
}
