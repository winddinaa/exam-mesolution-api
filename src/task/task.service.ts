import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/parisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTasks(filter: 'today' | 'tomorrow' | 'week'): Promise<Task[]> {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    if (filter === 'today') {
      const endOfToday = new Date(startOfToday);
      endOfToday.setDate(startOfToday.getDate() + 1);
      return this.prisma.task.findMany({
        where: { dueDate: { gte: startOfToday, lt: endOfToday } },
      });
    } else if (filter === 'tomorrow') {
      const startOfTomorrow = new Date(startOfToday);
      startOfTomorrow.setDate(startOfToday.getDate() + 1);
      const endOfTomorrow = new Date(startOfTomorrow);
      endOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
      return this.prisma.task.findMany({
        where: { dueDate: { gte: startOfTomorrow, lt: endOfTomorrow } },
      });
    } else if (filter === 'week') {
      const endOfWeek = new Date(startOfToday);
      endOfWeek.setDate(startOfToday.getDate() + 7);
      return this.prisma.task.findMany({
        where: { dueDate: { gte: startOfToday, lt: endOfWeek } },
      });
    }

    return [];
  }

  async addTask(
    title: string,
    description: string,
    dueDate: Date,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: { title, description, dueDate, status: 'pending' },
    });
  }
}
