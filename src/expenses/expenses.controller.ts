import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateExpense, UpdateExpense } from './DTO';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { Categories } from './types';

@Controller('expenses')
export class ExpensesController {
  private readonly logger = new Logger(ExpensesController.name);

  constructor(private readonly expenseService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() dto: CreateExpense, @Req() req: Request) {
    const userId = req.user['userId'];
    return this.expenseService.create(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':category')
  find(@Param('category') category: Categories) {
    return this.expenseService.find(category);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  FindAll(@Query('timeframe') timeframe: string) {
    return this.expenseService.findAll(timeframe);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() dto: UpdateExpense, @Param('id', ParseIntPipe) id: number) {
    return this.expenseService.update(dto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.delete(id);
  }
}
