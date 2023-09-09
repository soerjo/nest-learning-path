import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() taskFilterDto: GetTasksFilterDto) {
    if (Object.keys(taskFilterDto).length)
      return this.taskService.getTaskWithFilter(taskFilterDto);

    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getSomeTask(@Param('id') id: string) {
    return this.taskService.getTaskById(+id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto) {
    return this.taskService.createTasks(body);
  }

  @Patch(':id')
  patchSomeTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.updateTasksById(+id, body);
  }

  @Delete(':id')
  deleteSomeTask(@Param('id') id: string) {
    return this.taskService.deleteTasksById(+id);
  }
}
