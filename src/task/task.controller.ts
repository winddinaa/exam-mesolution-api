import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { ITask } from './task.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(@Query('filter') filter: 'today' | 'tomorrow' | 'week') {
    return this.taskService.getTasks(filter);
  }

  @Post()
  addTask(@Body() task: ITask) {
    return this.taskService.addTask(
      task.title,
      task.description,
      new Date(task.dueDate),
    );
  }
}
