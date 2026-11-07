import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OrderService } from '../../application/services/order.service';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(
    @Inject(OrderService)
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden en el sistema con los datos proporcionados' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Orden creada exitosamente',
    type: Order,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error interno del servidor al crear la orden',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    this.logger.log(`Recibida solicitud para crear orden con producto: ${createOrderDto.productId}`);

    try {
      const order = await this.orderService.createOrder(createOrderDto);
      this.logger.log(`Orden creada exitosamente con ID: ${order.id}`);
      return order;
    } catch (error) {
      this.logger.error(`Error al crear orden: ${error.message}`, error.stack);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear la orden en el sistema');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Recupera los detalles de una orden específica usando su identificador único' })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la orden',
    example: 'ord_1234567890',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orden encontrada exitosamente',
    type: Order,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Orden no encontrada',
  })
  async getOrder(@Param('id') id: string): Promise<Order> {
    this.logger.log(`Recibida solicitud para obtener orden con ID: ${id}`);

    if (!id || id.trim() === '') {
      this.logger.warn('Solicitud recibida con ID de orden vacío');
      throw new BadRequestException('El identificador de la orden es requerido');
    }

    try {
      const order = await this.orderService.getOrder(id);

      if (!order) {
        this.logger.warn(`Orden no encontrada con ID: ${id}`);
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }

      this.logger.log(`Orden encontrada exitosamente: ${id}`);
      return order;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Error al obtener orden ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al recuperar la orden del sistema');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una orden existente', description: 'Actualiza los datos de una orden existente identificada por su ID' })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la orden a actualizar',
    example: 'ord_1234567890',
  })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orden actualizada exitosamente',
    type: Order,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Orden no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de actualización inválidos',
  })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    this.logger.log(`Recibida solicitud para actualizar orden con ID: ${id}`);

    if (!id || id.trim() === '') {
      this.logger.warn('Solicitud recibida con ID de orden vacío');
      throw new BadRequestException('El identificador de la orden es requerido');
    }

    const hasAtLeastOneField = Object.keys(updateOrderDto).some(
      (key) => updateOrderDto[key] !== undefined && updateOrderDto[key] !== null,
    );

    if (!hasAtLeastOneField) {
      this.logger.warn(`Solicitud de actualización sin campos para orden ${id}`);
      throw new BadRequestException('Debe proporcionar al menos un campo para actualizar');
    }

    try {
      const order = await this.orderService.updateOrder(id, updateOrderDto);

      if (!order) {
        this.logger.warn(`Orden no encontrada para actualización con ID: ${id}`);
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }

      this.logger.log(`Orden actualizada exitosamente: ${id}`);
      return order;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Error al actualizar orden ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al actualizar la orden en el sistema');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina permanentemente una orden del sistema usando su identificador único' })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la orden a eliminar',
    example: 'ord_1234567890',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Orden eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Orden no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Identificador de orden inválido',
  })
  async deleteOrder(@Param('id') id: string): Promise<void> {
    this.logger.log(`Recibida solicitud para eliminar orden con ID: ${id}`);

    if (!id || id.trim() === '') {
      this.logger.warn('Solicitud recibida con ID de orden vacío');
      throw new BadRequestException('El identificador de la orden es requerido');
    }

    try {
      const exists = await this.orderService.getOrder(id);

      if (!exists) {
        this.logger.warn(`Orden no encontrada para eliminación con ID: ${id}`);
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }

      await this.orderService.deleteOrder(id);
      this.logger.log(`Orden eliminada exitosamente: ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Error al eliminar orden ${id}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al eliminar la orden del sistema');
    }
  }
}