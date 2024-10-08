import { Categories } from '@prisma/client';
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

  @IsString()
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
