import { PartialType } from '@nestjs/mapped-types';
import { TaskStatus } from '../task.model';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  status?: TaskStatus;
}
