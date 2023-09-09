import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [
    {
      id: 1,
      title: 'jemur baju',
      description: '',
      status: TaskStatus.OPEN,
      time: new Date(1692952811468),
    },
    {
      id: 2,
      title: 'jemur kancut',
      description: '',
      status: TaskStatus.OPEN,
      time: new Date(1692952811000),
    },
    {
      id: 3,
      title: 'jemur celana',
      description: '',
      status: TaskStatus.OPEN,
      time: new Date(1692952811400),
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTaskWithFilter(query: GetTasksFilterDto) {
    const { search, status } = query;

    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: number) {
    const indexTask = this.tasks.findIndex((task) => task.id === id);
    if (indexTask < 0) {
      return new HttpException(
        `task not found with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return { ...this.tasks[indexTask] };
  }

  createTasks(task: CreateTaskDto) {
    const newTask: ITask = {
      id: this.tasks.length + 1,
      ...task,
      time: new Date(),
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTasksById(id: number, newTask: UpdateTaskDto) {
    const indexTask = this.tasks.findIndex((task) => task.id === id);
    if (indexTask < 0)
      return new HttpException(
        `task not found with id ${id}!`,
        HttpStatus.NOT_FOUND,
      );

    this.tasks[indexTask] = { id, ...this.tasks[indexTask], ...newTask };
    return this.tasks[indexTask];
  }

  deleteTasksById(id: number) {
    const indexTask = this.tasks.findIndex((task) => task.id === id);
    if (indexTask < 0)
      return new HttpException('task not found!', HttpStatus.NOT_FOUND);

    this.tasks.splice(indexTask, 1);
  }
}
