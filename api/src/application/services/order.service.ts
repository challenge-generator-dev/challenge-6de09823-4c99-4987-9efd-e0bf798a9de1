import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderDto } from '../../infrastructure/controllers/dto/create-order.dto';
import { UpdateOrderDto } from '../../infrastructure/controllers/dto/update-order.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    this.logger.log(`Creating new order for customer: ${createOrderDto.customerId}`);

    const orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
      customerId: createOrderDto.customerId,
      items: createOrderDto.items,
      totalAmount: createOrderDto.totalAmount,
      status: OrderStatus.PENDING,
      shippingAddress: createOrderDto.shippingAddress,
      billingAddress: createOrderDto.billingAddress,
    };

    const tempOrder = new Order({
      id: '',
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!tempOrder.isValid()) {
      this.logger.error('Invalid order data: missing required fields');
      throw new BadRequestException('Invalid order data: please provide all required fields');
    }

    const createdOrder = await this.orderRepository.create(orderData);
    this.logger.log(`Order created successfully with id: ${createdOrder.id}`);
    
    return createdOrder;
  }

  async getOrder(id: string): Promise<Order> {
    this.logger.log(`Fetching order with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('Order id is required');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      this.logger.warn(`Order not found with id: ${id}`);
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    this.logger.log(`Order fetched successfully: ${id}`);
    return order;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    this.logger.log(`Updating order with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('Order id is required');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Order not found for update: ${id}`);
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (!existingOrder.canBeModified()) {
      this.logger.error(`Order ${id} cannot be modified in current status: ${existingOrder.status}`);
      throw new BadRequestException(`Order cannot be modified in status: ${existingOrder.status}`);
    }

    const updateData: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>> = {};

    if (updateOrderDto.items !== undefined) {
      updateData.items = updateOrderDto.items;
    }
    if (updateOrderDto.totalAmount !== undefined) {
      updateData.totalAmount = updateOrderDto.totalAmount;
    }
    if (updateOrderDto.status !== undefined) {
      updateData.status = updateOrderDto.status;
    }
    if (updateOrderDto.shippingAddress !== undefined) {
      updateData.shippingAddress = updateOrderDto.shippingAddress;
    }
    if (updateOrderDto.billingAddress !== undefined) {
      updateData.billingAddress = updateOrderDto.billingAddress;
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    this.logger.log(`Order updated successfully: ${id}`);

    return updatedOrder;
  }

  async deleteOrder(id: string): Promise<void> {
    this.logger.log(`Deleting order with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('Order id is required');
    }

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Order not found for deletion: ${id}`);
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (!existingOrder.canBeCancelled()) {
      this.logger.error(`Order ${id} cannot be cancelled in current status: ${existingOrder.status}`);
      throw new BadRequestException(`Order cannot be cancelled in status: ${existingOrder.status}`);
    }

    await this.orderRepository.delete(id);
    this.logger.log(`Order deleted successfully: ${id}`);
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    this.logger.log(`Fetching orders for customer: ${customerId}`);
    this.logger.warn('getOrdersByCustomer not fully implemented - requires GSI in DynamoDB');
    return [];
  }

  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    this.logger.log(`Fetching orders with status: ${status}`);
    this.logger.warn('getOrdersByStatus not fully implemented - requires GSI in DynamoDB');
    return [];
  }
}