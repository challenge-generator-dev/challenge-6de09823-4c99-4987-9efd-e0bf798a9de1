import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderDto } from '../../infrastructure/controllers/dto/create-order.dto';
import { UpdateOrderDto } from '../../infrastructure/controllers/dto/update-order.dto';

@Injectable()
export class ApplicationOrderRepository implements OrderRepository {
  async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const now = new Date();
    const order: Order = {
      id: this.generateId(),
      ...orderData,
      createdAt: now,
      updatedAt: now,
    };
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    if (!id || id.trim() === '') {
      return null;
    }
    return null;
  }

  async update(
    id: string,
    orderData: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Order> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Order not found');
    }
    return {
      ...existing,
      ...orderData,
      updatedAt: new Date(),
    };
  }

  async delete(id: string): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('Order not found');
    }
  }

  private generateId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}