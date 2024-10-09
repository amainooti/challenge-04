import { Categories } from '../types/index';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpense {
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Categories)
  category: Categories;

  @IsOptional()
  date: Date;
}

export class UpdateExpense {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  date?: Date;
}
