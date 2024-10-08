import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpense } from './DTO';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateExpense, authorId: number) {
    try {
      const expense = await this.prismaService.expense.create({
        data: {
          description: dto.description,
          amount: dto.amount,
          category: dto.category,
          date: dto.date,
          userId: authorId,
        },
      });
      return {
        message: 'created Expense successfully',
        payload: expense,
      };
    } catch (error) {}
    throw new InternalServerErrorException('Something happened');
  }
}
