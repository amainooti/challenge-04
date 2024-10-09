import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpense, UpdateExpense } from './DTO';
import { Categories } from './types';
import { subWeeks, subMonths, startOfDay } from 'date-fns';

@Injectable()
export class ExpensesService {
  private readonly logger = new Logger(ExpensesService.name);
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

  async findAll(timeframe: string) {
    try {
      let startDate: Date;
      let now = new Date();

      switch (timeframe) {
        case 'past-week':
          startDate = subWeeks(now, 1);
          break;
        case 'past-month':
          startDate = subMonths(now, 1);
          break;
        case 'last-3-months':
          startDate = subMonths(now, 3);
          break;
        default:
          startDate = null;
      }

      const whereClause = startDate
        ? {
            date: {
              gte: startOfDay(startDate), // Ensure date is greater than or equal to the start of the day
            },
          }
        : {};

      const expenses = await this.prismaService.expense.findMany({
        where: whereClause,
      });
      if (!expenses) throw new NotFoundException('Tasks could not be found');
      return expenses;
    } catch (error) {
      throw new InternalServerErrorException('Something happened ');
    }
  }

  async find(category: Categories) {
    try {
      const expense = await this.prismaService.expense.findMany({
        where: {
          category: category,
        },
      });

      this.logger.debug(expense);
      if (!expense)
        throw new NotFoundException(
          'No Expenses could be found at this moment',
        );
      return expense;
    } catch (error) {
      throw new InternalServerErrorException('Something happened.');
    }
  }

  async update(dto: UpdateExpense, id: number) {
    const expenseExist = await this.prismaService.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expenseExist)
      throw new NotFoundException(`Expense of id:${id} not found`);

    const expense = await this.prismaService.expense.update({
      where: {
        id: expenseExist.id,
      },
      data: {
        ...dto,
      },
    });
    return {
      message: 'Expense Updated successfully',
      expense,
    };
  }

  async delete(id: number) {
    this.prismaService.expense.delete({ where: { id } });
    // For safe measures this is usually where the frontend gives warning about deleting and request users full awareness of choice
    return { message: `ID: ${id} deleted successfully` };
  }
}
