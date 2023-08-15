import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;
}
