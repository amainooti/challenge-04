import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateExpense } from './DTO';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('expenses')
export class ExpensesController {
  private readonly logger = new Logger(ExpensesController.name);

  constructor(private readonly exenseService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() dto: CreateExpense, @Req() req: Request) {
    this.logger.log(`User Info: ${JSON.stringify(req.user)}`); // Log user info after JWT validation

    const userId = req.user['userId'];
    return this.exenseService.create(dto, userId);
  }

  @Get(':category')
  find(@Param('category') category: string, @Query('time') date: string) {}
}
