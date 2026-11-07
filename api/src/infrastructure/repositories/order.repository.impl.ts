import { Injectable, Logger } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { DynamodbConfigService } from '../config/dynamodb.config';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly logger = new Logger(OrderRepositoryImpl.name);

  constructor(private readonly dynamodbConfig: DynamodbConfigService) {}

  async create(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const id = this.generateId();
    const now = new Date();
    
    const order: Order = new Order({
      id,
      customerId: orderData.customerId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: orderData.status,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      createdAt: now,
      updatedAt: now,
    });

    const params = {
      TableName: this.dynamodbConfig.getTableName(),
      Item: {
        id: { S: order.id },
        customerId: { S: order.customerId },
        items: { S: JSON.stringify(order.items) },
        totalAmount: { N: order.totalAmount.toString() },
        status: { S: order.status },
        shippingAddress: { S: JSON.stringify(order.shippingAddress) },
        billingAddress: { S: JSON.stringify(order.billingAddress) },
        createdAt: { S: order.createdAt.toISOString() },
        updatedAt: { S: order.updatedAt.toISOString() },
      },
    };

    try {
      await this.dynamodbConfig.putItem(params);
      this.logger.log(`Order created successfully with id: ${id}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    const params = {
      TableName: this.dynamodbConfig.getTableName(),
      Key: { id: { S: id } },
    };

    try {
      const result = await this.dynamodbConfig.getItem(params);
      
      if (!result.Item) {
        this.logger.log(`Order not found with id: ${id}`);
        return null;
      }

      const order = this.mapToOrder(result.Item);
      this.logger.log(`Order found with id: ${id}`);
      return order;
    } catch (error) {
      this.logger.error(`Failed to find order by id ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(
    id: string,
    orderData: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Order> {
    const existingOrder = await this.findById(id);
    
    if (!existingOrder) {
      throw new Error(`Order with id ${id} not found`);
    }

    const now = new Date();
    const updatedOrder: Order = new Order({
      id,
      customerId: orderData.customerId ?? existingOrder.customerId,
      items: orderData.items ?? existingOrder.items,
      totalAmount: orderData.totalAmount ?? existingOrder.totalAmount,
      status: orderData.status ?? existingOrder.status,
      shippingAddress: orderData.shippingAddress ?? existingOrder.shippingAddress,
      billingAddress: orderData.billingAddress ?? existingOrder.billingAddress,
      createdAt: existingOrder.createdAt,
      updatedAt: now,
    });

    const params = {
      TableName: this.dynamodbConfig.getTableName(),
      Key: { id: { S: id } },
      UpdateExpression: 'SET customerId = :customerId, items = :items, totalAmount = :totalAmount, status = :status, shippingAddress = :shippingAddress, billingAddress = :billingAddress, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':customerId': { S: updatedOrder.customerId },
        ':items': { S: JSON.stringify(updatedOrder.items) },
        ':totalAmount': { N: updatedOrder.totalAmount.toString() },
        ':status': { S: updatedOrder.status },
        ':shippingAddress': { S: JSON.stringify(updatedOrder.shippingAddress) },
        ':billingAddress': { S: JSON.stringify(updatedOrder.billingAddress) },
        ':updatedAt': { S: updatedOrder.updatedAt.toISOString() },
      },
      ReturnValues: 'ALL_NEW',
    };

    try {
      await this.dynamodbConfig.updateItem(params);
      this.logger.log(`Order updated successfully with id: ${id}`);
      return updatedOrder;
    } catch (error) {
      this.logger.error(`Failed to update order ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: this.dynamodbConfig.getTableName(),
      Key: { id: { S: id } },
    };

    try {
      await this.dynamodbConfig.deleteItem(params);
      this.logger.log(`Order deleted successfully with id: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to delete order ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  private generateId(): string {
    return `ord_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private mapToOrder(item: Record<string, any>): Order {
    return new Order({
      id: item.id.S,
      customerId: item.customerId.S,
      items: JSON.parse(item.items.S),
      totalAmount: parseFloat(item.totalAmount.N),
      status: item.status.S,
      shippingAddress: JSON.parse(item.shippingAddress.S),
      billingAddress: JSON.parse(item.billingAddress.S),
      createdAt: new Date(item.createdAt.S),
      updatedAt: new Date(item.updatedAt.S),
    });
  }
}