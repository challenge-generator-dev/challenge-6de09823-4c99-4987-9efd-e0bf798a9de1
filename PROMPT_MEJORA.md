# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `cd api && npm install && npm run build` — componente `api` (practice).
4. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/entities/order.entity.ts` — `OrderItem.reduce`: Se invoca `reduce` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/application/entities/order.entity.ts` — `OrderItem.some`: Se invoca `some` sobre `OrderItem`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/features/orders/services/order.service.ts` — `UpdateOrderDto.trim`: Se invoca `trim` sobre `UpdateOrderDto`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz (corrida e2e 20261106194239047), Implementa operaciones CRUD de ordenes en DynamoDB desde la interfaz y versiona la infraestructura

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Crear y leer órdenes — objetivo: Implementar la funcionalidad para crear y leer órdenes en DynamoDB. — entregable (NO resolver): Interfaz de usuario que permite crear y leer órdenes en DynamoDB.
- Fase 2: Actualizar y eliminar órdenes — objetivo: Implementar la funcionalidad para actualizar y eliminar órdenes en DynamoDB. — entregable (NO resolver): Interfaz de usuario que permite actualizar y eliminar órdenes en DynamoDB.
- Fase 3: Versionar la infraestructura — objetivo: Versionar la infraestructura de DynamoDB usando Terraform. — entregable (NO resolver): Configuración de Terraform para versionar la infraestructura de DynamoDB y documentación del proceso de despliegue.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "order-management-api",
  "version": "1.0.0",
  "description": "API para gestión de órdenes con persistencia en DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"src/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.3.1",
    "@nestjs/config": "^3.1.1",
    "aws-sdk": "^2.1666.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.2.1"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.4",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes para validación
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Order Management API')
    .setDescription('API para gestión de órdenes con persistencia en DynamoDB')
    .setVersion('1.0')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto desde variables de entorno
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI available at: ${await app.getUrl()}/api`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
import { IsString, IsNumber, IsEnum, IsUUID, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class Order {
    @ApiProperty({
        description: 'Identificador único de la orden',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'Estado actual de la orden',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @ApiProperty({
        description: 'Detalles del producto asociado a la orden',
        example: 'Laptop XYZ'
    })
    @IsString()
    productDetails: string;

    @ApiProperty({
        description: 'Cantidad del producto',
        example: 2
    })
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 999.99
    })
    @IsNumber()
    unitPrice: number;

    @ApiProperty({
        description: 'Fecha de creación de la orden',
        example: '2023-10-15T12:00:00.000Z'
    })
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización de la orden',
        example: '2023-10-15T12:00:00.000Z'
    })
    @IsDate()
    updatedAt: Date;

    constructor(
        id: string,
        status: OrderStatus,
        productDetails: string,
        quantity: number,
        unitPrice: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.status = status;
        this.productDetails = productDetails;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// === ARCHIVO: api/src/domain/repositories/order.repository.ts ===
import { Order } from '../entities/order.entity';

export interface OrderRepository {
    create(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Order>;
    delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/controllers/dto/create-order.dto.ts ===
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/order.entity';

export class CreateOrderDto {
    @ApiProperty({
        description: 'Estado inicial de la orden',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;

    @ApiProperty({
        description: 'Detalles del producto asociado a la orden',
        example: 'Laptop XYZ'
    })
    @IsString()
    @IsNotEmpty()
    productDetails: string;

    @ApiProperty({
        description: 'Cantidad del producto',
        example: 2
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({
        description: 'Precio unitario del producto',
        example: 999.99
    })
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;
}

// === ARCHIVO: api/src/infrastructure/controllers/dto/update-order.dto.ts ===
import { IsString, IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../../domain/entities/order.entity';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Estado actual de la orden',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: 'El estado debe ser uno de: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED',
  })
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Identificador del producto ordenado',
    example: 'prod_12345',
  })
  @IsOptional()
  @IsString({ message: 'El identificador del producto debe ser texto' })
  productId?: string;

  @ApiPropertyOptional({
    description: 'Nombre del producto ordenado',
    example: 'Laptop Pro 15"',
  })
  @IsOptional()
  @IsString({ message: 'El nombre del producto debe ser texto' })
  productName?: string;

  @ApiPropertyOptional({
    description: 'Cantidad de unidades del producto',
    example: 2,
    minimum: 1,
    maximum: 9999,
  })
  @IsOptional()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @Max(9999, { message: 'La cantidad máxima es 9999' })
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Precio unitario del producto',
    example: 1299.99,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  unitPrice?: number;

  @ApiPropertyOptional({
    description: 'Identificador del cliente que realiza la orden',
    example: 'cust_67890',
  })
  @IsOptional()
  @IsString({ message: 'El identificador del cliente debe ser texto' })
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Dirección de envío del pedido',
    example: 'Av. Principal 123, Ciudad, País',
  })
  @IsOptional()
  @IsString({ message: 'La dirección de envío debe ser texto' })
  shippingAddress?: string;

  @ApiPropertyOptional({
    description: 'Notas adicionales para la orden',
    example: 'Por favor entregar en horario matutino',
  })
  @IsOptional()
  @IsString({ message: 'Las notas deben ser texto' })
  notes?: string;
}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/order.repository.impl.ts ===
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

// === ARCHIVO: api/src/infrastructure/config/aws.config.ts ===
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class AwsConfigService implements OnModuleInit {
  private credentials: AWS.Credentials;
  private region: string;
  private endpoint: string | undefined;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    this.endpoint = this.configService.get<string>('AWS_ENDPOINT');

    if (accessKeyId && secretAccessKey) {
      this.credentials = new AWS.Credentials({
        accessKeyId,
        secretAccessKey,
      });
    }
  }

  getRegion(): string {
    return this.region;
  }

  getCredentials(): AWS.Credentials | undefined {
    return this.credentials;
  }

  getEndpoint(): string | undefined {
    return this.endpoint;
  }

  getDynamoDBConfig(): AWS.DynamoDB.ClientConfiguration {
    const config: AWS.DynamoDB.ClientConfiguration = {
      region: this.region,
    };

    if (this.credentials) {
      config.credentials = this.credentials;
    }

    if (this.endpoint) {
      config.endpoint = this.endpoint;
    }

    return config;
  }

  getDocumentClientConfig(): AWS.DynamoDB.DocumentClient.ClientConfiguration {
    const config: AWS.DynamoDB.DocumentClient.ClientConfiguration = {
      region: this.region,
    };

    if (this.credentials) {
      config.credentials = this.credentials;
    }

    if (this.endpoint) {
      config.endpoint = this.endpoint;
    }

    return config;
  }
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.config.ts ===
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import { AwsConfigService } from './aws.config';

@Injectable()
export class DynamodbConfigService implements OnModuleInit {
  private documentClient: AWS.DynamoDB.DocumentClient;
  private dynamoDB: AWS.DynamoDB;
  private tableName: string;

  constructor(
    private readonly awsConfigService: AwsConfigService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): void {
    const documentClientConfig = this.awsConfigService.getDocumentClientConfig();
    this.documentClient = new AWS.DynamoDB.DocumentClient(documentClientConfig);

    const dynamoDBConfig = this.awsConfigService.getDynamoDBConfig();
    this.dynamoDB = new AWS.DynamoDB(dynamoDBConfig);

    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'orders');
  }

  getDocumentClient(): AWS.DynamoDB.DocumentClient {
    return this.documentClient;
  }

  getDynamoDB(): AWS.DynamoDB {
    return this.dynamoDB;
  }

  getTableName(): string {
    return this.tableName;
  }

  async createTableIfNotExists(): Promise<void> {
    try {
      await this.dynamoDB
        .describeTable({ TableName: this.tableName })
        .promise();
    } catch (error: unknown) {
      const awsError = error as AWS.AWSError;
      if (awsError.code === 'ResourceNotFoundException') {
        await this.dynamoDB
          .createTable({
            TableName: this.tableName,
            KeySchema: [
              { AttributeName: 'id', KeyType: 'HASH' },
            ],
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'S' },
            ],
            BillingMode: 'PAY_PER_REQUEST',
          })
          .promise();
      } else {
        throw error;
      }
    }
  }

  async putItem(params: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    return this.documentClient.put(params).promise();
  }

  async getItem(params: AWS.DynamoDB.DocumentClient.GetItemInput): Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> {
    return this.documentClient.get(params).promise();
  }

  async updateItem(params: AWS.DynamoDB.DocumentClient.UpdateItemInput): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    return this.documentClient.update(params).promise();
  }

  async deleteItem(params: AWS.DynamoDB.DocumentClient.DeleteItemInput): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
    return this.documentClient.delete(params).promise();
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderService } from './application/services/order.service';
import { OrderRepositoryImpl } from './infrastructure/repositories/order.repository.impl';
import { OrderRepository } from './domain/repositories/order.repository';
import { AwsConfigService } from './infrastructure/config/aws.config';
import { DynamodbConfigService } from './infrastructure/config/dynamodb.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrderController],
  providers: [
    AwsConfigService,
    DynamodbConfigService,
    OrderService,
    {
      provide: OrderRepository,
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: [OrderRepository, AwsConfigService, DynamodbConfigService],
})
export class AppModule {}

// === ARCHIVO: api/src/application/services/order.service.ts ===
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

// === ARCHIVO: api/src/application/entities/order.entity.ts ===
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    customerId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.items = data.items;
    this.totalAmount = data.totalAmount;
    this.status = data.status;
    this.shippingAddress = data.shippingAddress;
    this.billingAddress = data.billingAddress;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  canBeModified(): boolean {
    return this.status === OrderStatus.PENDING || this.status === OrderStatus.CONFIRMED;
  }

  canBeCancelled(): boolean {
    return this.status !== OrderStatus.DELIVERED && this.status !== OrderStatus.CANCELLED;
  }

  isValid(): boolean {
    if (!this.customerId || this.customerId.trim() === '') {
      return false;
    }
    if (!this.items || this.items.length === 0) {
      return false;
    }
    if (this.items.some(item => item.quantity <= 0 || item.unitPrice < 0)) {
      return false;
    }
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      items: this.items,
      totalAmount: this.totalAmount,
      status: this.status,
      shippingAddress: this.shippingAddress,
      billingAddress: this.billingAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// === ARCHIVO: api/src/application/repositories/order.repository.ts ===
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

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "..",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  "setupFilesAfterEnv": ["<rootDir>/test/setup.ts"],
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/main.ts"
  ],
  "coverageDirectory": "../coverage",
  "testTimeout": 30000,
  "verbose": true
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.22.3",
    "axios": "^1.6.8"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.7.0",
    "vite": "^5.2.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "@types/node": "^20.11.30",
    "prettier": "^3.2.5",
    "vitest": "^1.4.0",
    "@testing-library/react": "^14.2.2",
    "@testing-library/jest-dom": "^6.4.2",
    "jsdom": "^24.0.0"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "@typescript-eslint",
      "react-hooks"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100
  }
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "@features/*": [
        "src/features/*"
      ],
      "@shared/*": [
        "src/shared/*"
      ]
    }
  },
  "include": [
    "src"
  ]
}


// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept();
}

// === ARCHIVO: client/src/App.tsx ===
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from '@/features/orders/components/OrderList';
import { OrderForm } from '@/features/orders/components/OrderForm';
import '@/index.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOrderCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestión de Órdenes</h1>
          <nav className="app-nav">
            <a href="/orders">Órdenes</a>
            <a href="/orders/new">Nueva Orden</a>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route
              path="/orders"
              element={<OrderList key={refreshKey} />}
            />
            <Route
              path="/orders/new"
              element={<OrderForm onSuccess={handleOrderCreated} />}
            />
            <Route
              path="/orders/:id/edit"
              element={<OrderForm onSuccess={handleOrderCreated} />}
            />
            <Route path="/" element={<Navigate to="/orders" replace />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Sistema de Gestión de Órdenes - DynamoDB</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema de gestión de órdenes con persistencia en DynamoDB" />
    <meta name="theme-color" content="#2563eb" />
    <meta name="color-scheme" content="light dark" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Gestión de Órdenes - DynamoDB</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html, body {
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #root {
        width: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      @media (prefers-color-scheme: dark) {
        html {
          color-scheme: dark;
        }
        body {
          background-color: #1a1a2e;
          color: #e4e4e7;
        }
      }
      @media (prefers-color-scheme: light) {
        body {
          background-color: #f8fafc;
          color: #1e293b;
        }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/orders/hooks/useOrders.ts ===
import { useState, useCallback } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';
import { orderService } from '../services/order.service';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: (data: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.getAll();
      setOrders(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener las órdenes';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (data: CreateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await orderService.create(data);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.update(id, data);
      setOrders(prev => prev.map(order => order.id === id ? updatedOrder : order));
      return updatedOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la orden';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrder = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await orderService.delete(id);
      setOrders(prev => prev.filter(order => order.id !== id));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
  };
}

// === ARCHIVO: client/src/features/orders/components/OrderForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto, OrderStatus } from '../types/order';

interface OrderFormProps {
  order?: Order | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const INITIAL_FORM_STATE: CreateOrderDto = {
  customerName: '',
  customerEmail: '',
  productName: '',
  quantity: 1,
  price: 0,
  status: OrderStatus.PENDING,
};

export function OrderForm({ order, onSubmit, onCancel, isLoading = false }: OrderFormProps) {
  const [formData, setFormData] = useState<CreateOrderDto>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        productName: order.productName,
        quantity: order.quantity,
        price: order.price,
        status: order.status,
      });
    } else {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre del cliente es obligatorio';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'El correo del cliente es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'El correo electrónico no es válido';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = 'El nombre del producto es obligatorio';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser al menos 1';
    }

    if (formData.price < 0) {
      newErrors.price = 'El precio no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.PROCESSING]: 'Procesando',
      [OrderStatus.COMPLETED]: 'Completado',
      [OrderStatus.CANCELLED]: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <form onSubmit={handleSubmit} className="order-form" noValidate>
      <div className="form-group">
        <label htmlFor="customerName">Nombre del Cliente</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.customerName ? 'input-error' : ''}
        />
        {errors.customerName && <span className="error-message">{errors.customerName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Correo del Cliente</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.customerEmail ? 'input-error' : ''}
        />
        {errors.customerEmail && <span className="error-message">{errors.customerEmail}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="productName">Producto</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.productName ? 'input-error' : ''}
        />
        {errors.productName && <span className="error-message">{errors.productName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            disabled={isLoading}
            className={errors.quantity ? 'input-error' : ''}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            disabled={isLoading}
            className={errors.price ? 'input-error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isLoading}
        >
          {Object.values(OrderStatus).map(status => (
            <option key={status} value={status}>
              {getStatusLabel(status)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? 'Guardando...' : order ? 'Actualizar Orden' : 'Crear Orden'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={isLoading} className="btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

// === ARCHIVO: client/src/features/orders/components/OrderList.tsx ===
import { useEffect, useState } from 'react';
import { Order } from '../types/order';
import { useOrders } from '../hooks/useOrders';
import { OrderForm } from './OrderForm';
import { CreateOrderDto, UpdateOrderDto, OrderStatus } from '../types/order';

interface OrderListProps {
  refreshTrigger?: number;
}

export function OrderList({ refreshTrigger }: OrderListProps) {
  const {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
  } = useOrders();

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refreshTrigger]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleCreate = async (data: CreateOrderDto | UpdateOrderDto) => {
    const result = await createOrder(data as CreateOrderDto);
    if (result) {
      setShowForm(false);
    }
  };

  const handleUpdate = async (data: CreateOrderDto | UpdateOrderDto) => {
    if (!editingOrder) return;
    const result = await updateOrder(editingOrder.id, data as UpdateOrderDto);
    if (result) {
      setEditingOrder(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    setDeleteConfirm(null);
  };

  const getStatusClass = (status: OrderStatus): string => {
    const classes: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'status-pending',
      [OrderStatus.PROCESSING]: 'status-processing',
      [OrderStatus.COMPLETED]: 'status-completed',
      [OrderStatus.CANCELLED]: 'status-cancelled',
    };
    return classes[status] || '';
  };

  const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      [OrderStatus.PENDING]: 'Pendiente',
      [OrderStatus.PROCESSING]: 'Procesando',
      [OrderStatus.COMPLETED]: 'Completado',
      [OrderStatus.CANCELLED]: 'Cancelado',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="order-list-loading">
        <div className="spinner" />
        <p>Cargando órdenes...</p>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={clearError} className="alert-close">×</button>
        </div>
      )}

      <div className="order-list-header">
        <h2>Gestión de Órdenes</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingOrder(null);
          }}
          className="btn-primary"
          disabled={showForm}
        >
          + Nueva Orden
        </button>
      </div>

      {showForm && (
        <div className="order-form-modal">
          <div className="modal-content">
            <h3>Nueva Orden</h3>
            <OrderForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              isLoading={loading}
            />
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="order-form-modal">
          <div className="modal-content">
            <h3>Editar Orden</h3>
            <OrderForm
              order={editingOrder}
              onSubmit={handleUpdate}
              onCancel={() => setEditingOrder(null)}
              isLoading={loading}
            />
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="order-list-empty">
          <p>No hay órdenes registradas</p>
          <p>Crea tu primera orden haciendo clic en el botón superior</p>
        </div>
      ) : (
        <div className="order-table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id.substring(0, 8)}...</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customerName}</span>
                      <span className="customer-email">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td>{order.productName}</td>
                  <td className="text-center">{order.quantity}</td>
                  <td className="text-right">{formatCurrency(order.price * order.quantity)}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="text-right">{formatDate(order.createdAt)}</td>
                  <td className="actions-cell">
                    <button
                      onClick={() => setEditingOrder(order)}
                      className="btn-icon btn-edit"
                      title="Editar orden"
                      disabled={showForm}
                    >
                      ✏️
                    </button>
                    {deleteConfirm === order.id ? (
                      <div className="delete-confirm">
                        <span>¿Confirmar?</span>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="btn-icon btn-danger"
                          disabled={loading}
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="btn-icon"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(order.id)}
                        className="btn-icon btn-delete"
                        title="Eliminar orden"
                        disabled={showForm}
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading && orders.length > 0 && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/orders/types/order.ts ===
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  customerId: string;
  customerName: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  items?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export function calculateOrderTotal(items: CreateOrderDto['items']): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function createOrderItem(
  productId: string,
  productName: string,
  quantity: number,
  unitPrice: number
): OrderItem {
  return {
    productId,
    productName,
    quantity,
    unitPrice,
    subtotal: quantity * unitPrice,
  };
}

export function validateOrderData(data: CreateOrderDto): string[] {
  const errors: string[] = [];
  
  if (!data.customerId || data.customerId.trim() === '') {
    errors.push('El ID del cliente es requerido');
  }
  
  if (!data.customerName || data.customerName.trim() === '') {
    errors.push('El nombre del cliente es requerido');
  }
  
  if (!data.items || data.items.length === 0) {
    errors.push('La orden debe tener al menos un producto');
  }
  
  data.items.forEach((item, index) => {
    if (!item.productId) {
      errors.push(`Producto ${index + 1}: ID requerido`);
    }
    if (!item.productName) {
      errors.push(`Producto ${index + 1}: nombre requerido`);
    }
    if (item.quantity <= 0) {
      errors.push(`Producto ${index + 1}: cantidad debe ser mayor a 0`);
    }
    if (item.unitPrice <= 0) {
      errors.push(`Producto ${index + 1}: precio debe ser mayor a 0`);
    }
  });
  
  return errors;
}

export function isValidOrderStatus(status: string): status is OrderStatus {
  return ['pending', 'processing', 'completed', 'cancelled'].includes(status);
}

export function formatOrderDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };
  return labels[status];
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: '#FFA500',
    processing: '#4169E1',
    completed: '#228B22',
    cancelled: '#DC143C',
  };
  return colors[status];
}

// === ARCHIVO: client/src/shared/services/api.ts ===
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    try {
      return localStorage.getItem('auth_token');
    } catch {
      return null;
    }
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 401:
          console.error('No autorizado - Redirigiendo al login');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Acceso denegado');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error(`Error HTTP: ${status}`);
      }
    } else if (error.request) {
      console.error('No se pudo conectar con el servidor');
    } else {
      console.error('Error al configurar la solicitud');
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Error al guardar el token:', error);
    }
  }

  clearAuthToken(): void {
    try {
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error al eliminar el token:', error);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;

// === ARCHIVO: client/src/features/orders/services/order.service.ts ===
import { apiClient } from '@shared/services/api';
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderListResponse,
  ApiError,
} from '../types/order';
import { validateOrderData } from '../types/order';

class OrderService {
  private readonly endpoint = '/orders';

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const validationErrors = validateOrderData(data);
    
    if (validationErrors.length > 0) {
      const error = new Error(validationErrors.join(', ')) as Error & { code: string };
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    try {
      const response = await apiClient.post<Order>(this.endpoint, data);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al crear la orden';
      throw new Error(message);
    }
  }

  async getOrder(id: string): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    try {
      const response = await apiClient.get<Order>(`${this.endpoint}/${id}`);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener la orden';
      throw new Error(message);
    }
  }

  async getAllOrders(page: number = 1, pageSize: number = 10): Promise<OrderListResponse> {
    if (page < 1) {
      throw new Error('El número de página debe ser mayor a 0');
    }
    if (pageSize < 1 || pageSize > 100) {
      throw new Error('El tamaño de página debe estar entre 1 y 100');
    }

    try {
      const response = await apiClient.get<OrderListResponse>(
        `${this.endpoint}?page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener las órdenes';
      throw new Error(message);
    }
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    if (!data || (data.status === undefined && (!data.items || data.items.length === 0))) {
      throw new Error('Debe proporcionar al menos un campo para actualizar');
    }

    try {
      const response = await apiClient.put<Order>(`${this.endpoint}/${id}`, data);
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al actualizar la orden';
      throw new Error(message);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('El ID de la orden es requerido');
    }

    try {
      await apiClient.delete<void>(`${this.endpoint}/${id}`);
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al eliminar la orden';
      throw new Error(message);
    }
  }

  async updateOrderStatus(id: string, status: UpdateOrderDto['status']): Promise<Order> {
    if (!status) {
      throw new Error('El estado de la orden es requerido');
    }
    return this.updateOrder(id, { status });
  }

  async getOrdersByCustomer(customerId: string): Promise<Order[]> {
    if (!customerId || customerId.trim() === '') {
      throw new Error('El ID del cliente es requerido');
    }

    try {
      const response = await apiClient.get<Order[]>(
        `${this.endpoint}/customer/${customerId}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al obtener las órdenes del cliente';
      throw new Error(message);
    }
  }

  async getOrdersByStatus(
    status: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<OrderListResponse> {
    if (!status || status.trim() === '') {
      throw new Error('El estado de la orden es requerido');
    }

    try {
      const response = await apiClient.get<OrderListResponse>(
        `${this.endpoint}/status/${status}?page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      const axiosError = error as { response?: { data?: ApiError } };
      const message = axiosError?.response?.data?.message || 'Error al filtrar las órdenes por estado';
      throw new Error(message);
    }
  }
}

export const orderService = new OrderService();
export default orderService;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/setupTests.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: infra/providers.tf ===
# Configuración de providers para Terraform
# Este archivo declara los proveedores necesarios para desplegar la infraestructura
# en AWS, asegurando que las versiones sean compatibles y estables.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
  
  # Configuración de backend remoto para estado compartido
  # Se recomienda usar Terraform Cloud o S3 + DynamoDB para bloqueo
  backend "s3" {
    bucket         = "tf-state-bucket-orders-app"
    key            = "orders-app/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "tf-state-lock-orders-app"
  }
}

# Configuración del provider AWS
# Las credenciales se obtienen del entorno o de AWS credentials file
provider "aws" {
  region = var.aws_region
  
  # Configuración para evitar throttling en operaciones de DynamoDB
  default_tags {
    tags = {
      Environment = var.environment
      Application = "OrdersApp"
      Terraform   = "true"
    }
  }
}

# Configuración adicional para servicios específicos
# Optimización para DynamoDB
provider "aws" {
  alias = "dynamodb"
  region = var.aws_region
  
  default_tags {
    tags = {
      Service = "DynamoDB"
    }
  }
}

// === ARCHIVO: infra/variables.tf ===
# Variables globales para la configuración de la infraestructura
# Estas variables permiten parametrizar el despliegue para diferentes entornos

variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
  default     = "us-east-1"
  
  validation {
    condition     = contains(["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"], var.aws_region)
    error_message = "La región debe ser una de las siguientes: us-east-1, us-west-2, eu-west-1, ap-southeast-1."
  }
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de los siguientes: dev, staging, prod."
  }
}

variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders-table"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.dynamodb_read_capacity >= 1 && var.dynamodb_read_capacity <= 10000
    error_message = "La capacidad de lectura debe estar entre 1 y 10000."
  }
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada para DynamoDB (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.dynamodb_write_capacity >= 1 && var.dynamodb_write_capacity <= 10000
    error_message = "La capacidad de escritura debe estar entre 1 y 10000."
  }
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "orderId"
}

variable "dynamodb_range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "dynamodb_ttl_attribute" {
  description = "Atributo para Time To Live en DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "dynamodb_enable_streams" {
  description = "Habilitar streams en DynamoDB para capturar cambios"
  type        = bool
  default     = false
}

variable "dynamodb_stream_view_type" {
  description = "Tipo de vista para el stream de DynamoDB (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
  
  validation {
    condition     = var.dynamodb_stream_view_type == null || contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.dynamodb_stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "dynamodb_global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    read_capacity   = optional(number)
    write_capacity  = optional(number)
  }))
  default = []
}

variable "dynamodb_tags" {
  description = "Etiquetas adicionales para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables para el módulo DynamoDB
# Este archivo define los parámetros configurables para crear una tabla DynamoDB
# con características específicas para el manejo de órdenes

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
  
  validation {
    condition     = length(var.table_name) > 3 && length(var.table_name) <= 255
    error_message = "El nombre de la tabla debe tener entre 4 y 255 caracteres."
  }
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB"
  type        = string
  default     = "PAY_PER_REQUEST"
  
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.read_capacity >= 1 && var.read_capacity <= 10000
    error_message = "La capacidad de lectura debe estar entre 1 y 10000."
  }
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
  
  validation {
    condition     = var.write_capacity >= 1 && var.write_capacity <= 10000
    error_message = "La capacidad de escritura debe estar entre 1 y 10000."
  }
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "orderId"
      type = "S"
    }
  ]
  
  validation {
    condition     = alltrue([for attr in var.attributes : contains(["S", "N", "B"], attr.type)])
    error_message = "El tipo de atributo debe ser S (String), N (Number) o B (Binary)."
  }
}

variable "ttl_attribute" {
  description = "Atributo para Time To Live (opcional)"
  type        = string
  default     = null
}

variable "enable_streams" {
  description = "Habilitar streams para capturar cambios en la tabla"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista para el stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
  
  validation {
    condition     = var.stream_view_type == null || contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista del stream debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = optional(string)
    projection_type = string
    read_capacity   = optional(number)
    write_capacity  = optional(number)
  }))
  default = []
  
  validation {
    condition = alltrue([
      for gsi in var.global_secondary_indexes : contains(["KEYS_ONLY", "INCLUDE", "ALL"], gsi.projection_type)
    ])
    error_message = "El projection_type debe ser KEYS_ONLY, INCLUDE o ALL."
  }
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de los siguientes: dev, staging, prod."
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación de punto en el tiempo para la tabla"
  type        = bool
  default     = true
}

variable "server_side_encryption" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "deletion_protection_enabled" {
  description = "Habilitar protección contra eliminación accidental"
  type        = bool
  default     = true
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

# Configuracion del provider AWS
# Se utiliza el provider de HashiCorp para provisionar recursos en AWS
# La version 5.31.0 es estable y compatible con los recursos de DynamoDB utilizados
provider "aws" {
  region = var.aws_region

  # Configuracion de credenciales mediante variables de entorno
  # Terraform automaticamente lee AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY
  # Tambien soporta AWS_PROFILE y AWS_CONFIG_FILE para perfiles nombrados
  skip_credentials_validation = false
  skip_requesting_account_id  = false
  skip_metadata_api_check     = true
}

# Configuracion de backend para persistir el estado de Terraform
# El estado se almacena en S3 para permitir colaboracion entre equipos
# y mantener el estado entre ejecuciones
terraform {
  backend "s3" {
    bucket         = "terraform-state-${var.project_name}"
    key            = "infra/dynamodb/terraform.tfstate"
    region         = var.aws_region
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

// === ARCHIVO: infra/README.md ===
# Modulo de Infraestructura DynamoDB

## Descripcion

Este modulo provisiona los recursos de AWS DynamoDB necesarios para gestionar ordenes en el sistema. Proporciona una tabla de DynamoDB optimizada para operaciones CRUD sobre ordenes, con soporte para indices secundarios que facilitan consultas por diferentes atributos.

## Recursos Provisionados

- **Tabla de Ordenes**: Almacena las ordenes con los siguientes atributos:
  - `order_id` (partition key): Identificador unico de la orden
  - `user_id`: Identificador del usuario que creo la orden
  - `status`: Estado actual de la orden (PENDING, PROCESSING, COMPLETED, CANCELLED)
  - `total_amount`: Monto total de la orden
  - `items`: Lista de productos incluidos en la orden
  - `created_at`: Timestamp de creacion
  - `updated_at`: Timestamp de ultima actualizacion

- **Indice secundario global**: Permite consultas por `user_id` y `status`
- **Tabla de bloqueos**: Gestiona el estado de Terraform para despliegues concurrentes

## Uso del Modulo

```hcl
module "dynamodb" {
  source = "./modules/dynamodb"

  project_name = "mi-proyecto"
  environment  = "dev"
  aws_region    = "us-east-1"

  table_name         = "orders"
  billing_mode       = "PAY_PER_REQUEST"
  hash_key           = "order_id"
  range_key          = "created_at"

  attributes = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "user_id"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "created_at"
      type = "N"
    }
  ]

  tags = {
    Environment = "dev"
    ManagedBy   = "terraform"
    Project     = "mi-proyecto"
  }
}
```

## Parametros Requeridos

| Variable            | Tipo       | Descripcion                                      |
|---------------------|------------|--------------------------------------------------|
| project_name        | string     | Nombre del proyecto para nomenclatura de recursos|
| environment         | string     | Entorno de despliegue (dev, staging, prod)      |
| aws_region          | string     | Region de AWS donde se aprovisionan recursos    |
| table_name          | string     | Nombre de la tabla DynamoDB                     |
| billing_mode        | string     | Modo de facturacion (PAY_PER_REQUEST o PROVISIONED)|
| hash_key            | string     | Clave de particion de la tabla                  |

## Parametros Opcionales

| Variable            | Tipo       | Valor por defecto | Descripcion                    |
|---------------------|------------|-------------------|--------------------------------|
| range_key           | string     | null              | Clave de ordenamiento          |
| read_capacity       | number     | 5                 | Capacidad de lectura (PROVISIONED)|
| write_capacity      | number     | 5                 | Capacidad de escritura (PROVISIONED)|
| ttl_enabled         | bool       | true              | Habilitar tiempo de vida       |
| ttl_attribute       | string     | "expires_at"     | Atributo para TTL              |
| enable_deletion_protection | bool | false         | Proteger contra eliminacion    |

## Validacion Local

Para validar la configuracion localmente:

```bash
# Inicializar Terraform
terraform init

# Validar sintaxis y configuracion
terraform validate

# Planificar cambios
terraform plan

# Aplicar cambios (solo en desarrollo)
terraform apply
```

## Consideraciones de Seguridad

- La tabla DynamoDB tiene encryption at-rest habilitado por defecto con AWS managed keys
- Para produccion se recomienda usar customer managed keys (CMK) de KMS
- Habilitar deletion_protection en entornos de produccion
- Los logs de CloudTrail deben estar habilitados para auditoria

## Outputs Exportados

- `table_name`: Nombre de la tabla creada
- `table_arn`: ARN de la tabla para permisos IAM
- `table_id`: ID unico de la tabla
- `table_stream_arn`: ARN del stream de DynamoDB (si esta habilitado)

// === ARCHIVO: infra/main.tf ===
# Configuracion principal de infraestructura para el sistema de ordenes
# Este archivo coordina los modulos y recursos necesarios para la capa de persistencia

# Modulo de DynamoDB para almacenamiento de ordenes
# Encapsula la creacion de la tabla y sus recursos asociados
module "dynamodb_orders" {
  source = "./modules/dynamodb"

  project_name = var.project_name
  environment  = var.environment
  aws_region    = var.aws_region

  # Configuracion de la tabla
  table_name         = "orders"
  billing_mode       = var.billing_mode
  hash_key           = "order_id"
  range_key          = "created_at"
  read_capacity      = var.dynamodb_read_capacity
  write_capacity     = var.dynamodb_write_capacity

  # Definicion de atributos para la tabla
  # DynamoDB requiere que los atributos se declaren explicitamente
  attributes = [
    {
      name = "order_id"
      type = "S"
    },
    {
      name = "user_id"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "created_at"
      type = "N"
    }
  ]

  # Indices secundarios globales para consultas eficientes
  global_secondary_indexes = [
    {
      name            = "user_status_index"
      hash_key        = "user_id"
      range_key       = "status"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "status_created_index"
      hash_key        = "status"
      range_key       = "created_at"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]

  # Configuracion de Time-To-Live para limpieza automatica
  ttl_enabled    = true
  ttl_attribute  = "expires_at"

  # Habilitar streams para captura de cambios
  stream_enabled = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  # Proteccion contra eliminacion en produccion
  enable_deletion_protection = var.environment == "prod"

  tags = var.common_tags
}

# Recurso adicionales para tabla de locks de Terraform
# Esta tabla se usa para bloquear el estado de Terraform
# y prevenir ejecuciones concurrentes que podrian corromper el estado
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = merge(
    var.common_tags,
    {
      Description = "Tabla de bloqueos para estado de Terraform"
    }
  )
}

# Configuracion de SSM Parameter Store para parametros de la aplicacion
# Almacena configuracion sensible de forma segura
resource "aws_ssm_parameter" "dynamodb_endpoint" {
  name  = "/${var.project_name}/${var.environment}/dynamodb/endpoint"
  type  = "String"
  value = "https://dynamodb.${var.aws_region}.amazonaws.com"

  tags = var.common_tags
}

resource "aws_ssm_parameter" "table_names" {
  name  = "/${var.project_name}/${var.environment}/dynamodb/table_names"
  type  = "String"
  value = jsonencode({
    orders = module.dynamodb_orders.table_name
  })

  tags = var.common_tags
}

# Configuracion de IAM para acceso a DynamoDB
# El rol de la aplicacion necesitara permisos para operar sobre la tabla
resource "aws_iam_role" "app_dynamodb_access" {
  name = "${var.project_name}-${var.environment}-dynamodb-access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = var.common_tags
}

resource "aws_iam_role_policy" "dynamodb_full_access" {
  name = "${var.project_name}-${var.environment}-dynamodb-policy"
  role = aws_iam_role.app_dynamodb_access.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = [
          module.dynamodb_orders.table_arn,
          "${module.dynamodb_orders.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.terraform_locks.arn
      }
    ]
  })
}

# Output que expone los valores necesarios para otras partes de la infraestructura
output "dynamodb_config" {
  description = "Configuracion de DynamoDB para la aplicacion"
  value = {
    table_name       = module.dynamodb_orders.table_name
    table_arn        = module.dynamodb_orders.table_arn
    table_endpoint   = "https://dynamodb.${var.aws_region}.amazonaws.com"
    region           = var.aws_region
    iam_role_arn     = aws_iam_role.app_dynamodb_access.arn
  }
}

output "ssm_parameters" {
  description = "Parametros de SSM para la aplicacion"
  value = {
    dynamodb_endpoint = aws_ssm_parameter.dynamodb_endpoint.name
    table_names       = aws_ssm_parameter.table_names.name
  }
}

// === ARCHIVO: infra/outputs.tf ===
# Outputs de la infraestructura de DynamoDB para gestión de órdenes
# Expone los atributos necesarios para que las aplicaciones consuman la tabla

output "dynamodb_table_name" {
  description = "Nombre de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_arn
}

output "dynamodb_table_id" {
  description = "ID de la tabla de DynamoDB para órdenes"
  value       = module.dynamodb.orders_table_id
}

output "dynamodb_table_status" {
  description = "Estado actual de la tabla de DynamoDB"
  value       = module.dynamodb.orders_table_status
}

output "dynamodb_table_stream_arn" {
  description = "ARN del stream de DynamoDB para captura de cambios"
  value       = module.dynamodb.orders_table_stream_arn
}

output "dynamodb_table_stream_label" {
  description = "Etiqueta del stream de DynamoDB"
  value       = module.dynamodb.orders_table_stream_label
}

output "dynamodb_region" {
  description = "Región donde está desplegada la tabla de DynamoDB"
  value       = var.aws_region
}

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para conexiones directas"
  value       = "dynamodb.${var.aws_region}.amazonaws.com"
}

output "dynamodb_indexes" {
  description = "Índices secundarios de la tabla de órdenes"
  value       = module.dynamodb.orders_table_indexes
}

output "dynamodb_tags" {
  description = "Tags aplicados a la tabla de DynamoDB"
  value       = module.dynamodb.orders_table_tags
}

output "dynamodb_server_side_encryption" {
  description = "Configuración de cifrado del lado del servidor"
  value       = module.dynamodb.orders_table_server_side_encryption
}

output "dynamodb_point_in_time_recovery" {
  description = "Configuración de recuperación a punto en el tiempo"
  value       = module.dynamodb.orders_table_point_in_time_recovery
}

output "dynamodb_ttl_enabled" {
  description = "Indicador de si TTL está habilitado para la tabla"
  value       = module.dynamodb.orders_table_ttl_enabled
}

output "dynamodb_billing_mode" {
  description = "Modo de facturación de la tabla (PROVISIONED o PAY_PER_REQUEST)"
  value       = module.dynamodb.orders_table_billing_mode
}

output "dynamodb_read_capacity" {
  description = "Capacidad de lectura aprovisionada"
  value       = module.dynamodb.orders_table_read_capacity
}

output "dynamodb_write_capacity" {
  description = "Capacidad de escritura aprovisionada"
  value       = module.dynamodb.orders_table_write_capacity
}

output "environment" {
  description = "Nombre del entorno donde está desplegada la infraestructura"
  value       = var.environment
}

output "dynamodb_table_stream_enabled" {
  description = "Indica si el stream de DynamoDB está habilitado"
  value       = var.enable_dynamodb_streams
}

output "dynamodb_kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrado"
  value       = var.enable_server_side_encryption ? module.dynamodb.orders_table_kms_key_arn : null
}

output "dynamodb_fully_qualified_table_name" {
  description = "Nombre completo de la tabla incluyendo prefijo de entorno"
  value       = "${var.environment}-${var.table_name}"
}

output "dynamodb_table_items_count" {
  description = "Número de elementos en la tabla (solo disponible si hay datos)"
  value       = module.dynamodb.orders_table_items_count
  sensitive   = false
}

output "dynamodb_table_size_bytes" {
  description = "Tamaño de la tabla en bytes (solo disponible si hay datos)"
  value       = module.dynamodb.orders_table_size_bytes
  sensitive   = false
}

output "dynamodb_table_creation_date" {
  description = "Fecha de creación de la tabla"
  value       = module.dynamodb.orders_table_creation_date
}

output "dynamodb_table_restore_summary" {
  description = "Resumen de restauración si la tabla fue restaurada"
  value       = module.dynamodb.orders_table_restore_summary
}

output "dynamodb_table_latest_stream_arn" {
  description = "ARN del stream más reciente"
  value       = module.dynamodb.orders_table_latest_stream_arn
}

output "dynamodb_table_replica_summaries" {
  description = "Resumen de réplicas para tablas globales"
  value       = module.dynamodb.orders_table_replica_summaries
}

output "dynamodb_connected_applications" {
  description = "Lista de aplicaciones que consumen esta tabla"
  value       = var.connected_applications
}

output "dynamodb_access_policy" {
  description = "Política de acceso a la tabla"
  value       = var.table_policy
}

output "dynamodb_backup_enabled" {
  description = "Indica si los backups automáticos están habilitados"
  value       = var.enable_point_in_time_recovery
}

output "dynamodb_disaster_recovery_type" {
  description = "Tipo de recuperación ante desastres configurado"
  value       = var.enable_point_in_time_recovery ? "PITR" : "NONE"
}

output "dynamodb_table_class" {
  description = "Clase de almacenamiento de la tabla"
  value       = var.table_class
}

output "dynamodb_table_deletion_protection" {
  description = "Indica si la protección contra eliminación está habilitada"
  value       = var.enable_deletion_protection
}

output "dynamodb_replication_enabled" {
  description = "Indica si la replicación entre regiones está habilitada"
  value       = var.enable_replication
}

output "dynamodb_replica_regions" {
  description = "Regiones configuradas para replicación"
  value       = var.replica_regions
}

output "dynamodb_audit_logging" {
  description = "Indica si el logging de auditoría está habilitado"
  value       = var.enable_audit_logging
}

output "dynamodb_cost_allocation_tag" {
  description = "Tag de asignación de costos"
  value       = var.cost_allocation_tag
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Configuración de variables de entorno para desarrollo
# Este archivo define los valores específicos del entorno de desarrollo
# IMPORTANTE: No incluir valores sensibles ni secretos en este archivo
# Las credenciales deben gestionarse a través de variables de entorno o AWS Vault

environment = "dev"

aws_region = "us-east-1"

# Configuración de la tabla de DynamoDB
table_name                 = "orders"
table_class                = "STANDARD"
enable_deletion_protection = false

# Capacidad de lectura y escritura (entorno de desarrollo - costos reducidos)
read_capacity  = 5
write_capacity = 5

# Habilitar características avanzadas
enable_dynamodb_streams         = true
enable_server_side_encryption   = true
enable_point_in_time_recovery   = false
enable_replication              = false
enable_audit_logging            = false

# Configuración de réplicas (vacío en desarrollo)
replica_regions = []

# Configuración de red y acceso
vpc_id             = "vpc-dev-default"
subnet_ids         = ["subnet-dev-1a", "subnet-dev-1b"]
allowed_cidr_blocks = ["10.0.0.0/16"]

# Etiquetas para identificación y costeo
cost_allocation_tag = "environment:dev"

# Aplicaciones conectadas a esta tabla
connected_applications = ["orders-api-dev", "orders-frontend-dev"]

# Política de acceso a la tabla
table_policy = "read-write"

# Configuración de logs
log_level               = "INFO"
log_retention_days      = 7
enable_access_logging   = true

# Configuración de backup
backup_schedule    = "cron(0 12 ? * * *)"
backup_retention_days = 30

# Configuración de alertas
enable_alerts           = true
alert_email             = "devops-dev@empresa.com"
alert_threshold_read    = 80
alert_threshold_write   = 80
alert_threshold_throttle = 10

# Configuración de escalado automático
enable_autoscaling     = true
min_read_capacity      = 5
max_read_capacity      = 100
target_utilization_read = 70
min_write_capacity     = 5
max_write_capacity     = 100
target_utilization_write = 70

# Configuración de TTL
enable_ttl                    = false
ttl_attribute_name            = "expiresAt"
ttl_delete_after_days         = 90

# Configuración de índices secundarios
secondary_indexes = {
  "by-customer" = {
    partition_key = "customerId"
    sort_key      = "createdAt"
    projection_type = "ALL"
  },
  "by-status" = {
    partition_key = "status"
    sort_key      = "updatedAt"
    projection_type = "KEYS_ONLY"
  }
}

# Configuración de import/export
import_enabled  = false
export_enabled  = true
export_s3_bucket = "exports-dev-empresa"
export_s3_prefix = "orders/"

# Configuración de caching
enable_dax                      = false
dax_node_type                   = "dax.t2.small"
dax_node_count                  = 2

# Configuración de características avanzadas
gsi_on_demand_billing      = true
lsi_on_demand_billing       = true
enable_orphaned_file_cleanup = false

# Configuración de recuperación ante desastres
dr_region                 = "us-west-2"
dr_replication_factor     = 1
dr_failover_enabled       = false

# Configuración de retención de datos
data_retention_days       = 365
archive_enabled           = false
archive_s3_bucket         = "archive-dev-empresa"
archive_after_days        = 90

# Configuración de notificaciones
enable_notifications      = true
notification_topic_arn    = "arn:aws:sns:us-east-1:123456789012:orders-dev-topic"
notification_event_types  = ["INSERT", "MODIFY", "REMOVE"]

# Configuración de etiquetas personalizadas
custom_tags = {
  Environment     = "development"
  ManagedBy       = "terraform"
  Project         = "orders-system"
  CostCenter      = "engineering"
  DataClassification = "internal"
  Compliance      = "SOC2"
  Owner           = "platform-team"
  SupportContact  = "devops@empresa.com"
}

# Configuración de monitoreo
enable_detailed_monitoring = true
metrics_collection_interval = 60
enable_contributor_insights = true
contributor_insights_view_name = "orders-dev-insights"

# Configuración de pruebas y desarrollo
enable_test_mode             = false
test_data_seed_enabled       = true
test_data_sample_count       = 100

# Configuración de rendimiento
performance_mode            = "AUTO"
enable_enhanced_diagnostics  = false
diagnostics_retention_days   = 7

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "this" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.hash_key_attribute_name
  range_key      = var.range_key_attribute_name != null ? var.range_key_attribute_name : null
  stream_enabled = var.enable_streams
  stream_view_type = var.enable_streams ? var.stream_view_type : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key != null ? global_secondary_index.value.range_key : null
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = global_secondary_index.value.read_capacity
      write_capacity  = global_secondary_index.value.write_capacity
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.local_secondary_indexes
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = local_secondary_index.value.projection_type
    }
  }

  point_in_time_recovery {
    enabled = var.enable_pit_recovery
  }

  server_side_encryption {
    enabled     = var.enable_encryption
    kms_key_arn = var.kms_key_arn
  }

  ttl {
    enabled        = var.enable_ttl
    attribute_name = var.ttl_attribute_name
  }

  tags = merge(
    var.tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "Project"     = var.project
      "ManagedBy"   = "terraform"
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_item" "seed_data" {
  for_each = var.seed_items != null ? { for item in var.seed_items : item[var.hash_key_attribute_name] => item } : {}

  table_name = aws_dynamodb_table.this.name
  hash_key   = each.value[var.hash_key_attribute_name]

  dynamic "range_key" {
    for_each = var.range_key_attribute_name != null ? [each.value[var.range_key_attribute_name]] : []
    content {
      S = range_key.value
    }
  }

  item = jsonencode(each.value)
}

resource "aws_appautoscaling_target" "table_read_target" {
  count = var.enable_autoscaling && var.read_autoscaling_enabled ? 1 : 0

  service_namespace  = "dynamodb"
  resource_id        = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  min_capacity       = var.read_min_capacity
  max_capacity       = var.read_max_capacity
}

resource "aws_appautoscaling_policy" "table_read_policy" {
  count = var.enable_autoscaling && var.read_autoscaling_enabled ? 1 : 0

  name                   = "${var.table_name}-read-scaling"
  service_namespace      = "dynamodb"
  resource_id            = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension     = "dynamodb:table:ReadCapacityUnits"
  policy_type            = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value       = var.read_target_value
    scale_in_cooldown  = var.scale_in_cooldown
    scale_out_cooldown = var.scale_out_cooldown
  }
}

resource "aws_appautoscaling_target" "table_write_target" {
  count = var.enable_autoscaling && var.write_autoscaling_enabled ? 1 : 0

  service_namespace  = "dynamodb"
  resource_id        = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  min_capacity       = var.write_min_capacity
  max_capacity       = var.write_max_capacity
}

resource "aws_appautoscaling_policy" "table_write_policy" {
  count = var.enable_autoscaling && var.write_autoscaling_enabled ? 1 : 0

  name                   = "${var.table_name}-write-scaling"
  service_namespace      = "dynamodb"
  resource_id            = "table/${aws_dynamodb_table.this.name}"
  scalable_dimension     = "dynamodb:table:WriteCapacityUnits"
  policy_type            = "TargetTrackingScaling"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value       = var.write_target_value
    scale_in_cooldown  = var.scale_in_cooldown
    scale_out_cooldown = var.scale_out_cooldown
  }
}

resource "aws_dynamodb_resource_policy" "this" {
  count = var.resource_policy != null ? 1 : 0

  table_name = aws_dynamodb_table.this.name
  policy     = var.resource_policy
}

resource "aws_kms_grant" "table_grant" {
  count = var.kms_key_arn != null ? 1 : 0

  name             = "dynamodb-table-${var.table_name}-grant"
  key_arn          = var.kms_key_arn
  grantee_principal = var.kms_grantee_principal
  operations       = ["Encrypt", "Decrypt", "ReEncryptFrom", "GenerateDataKey"]
}

resource "aws_cloudwatch_metric_alarm" "read_throttle" {
  count = var.enable_monitoring && var.read_throttle_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-read-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "ReadThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.read_throttle_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB read throttle events for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "write_throttle" {
  count = var.enable_monitoring && var.write_throttle_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-write-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.write_throttle_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB write throttle events for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

resource "aws_cloudwatch_metric_alarm" "user_errors" {
  count = var.enable_monitoring && var.user_errors_alarm_threshold > 0 ? 1 : 0

  alarm_name          = "${var.table_name}-user-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = var.alarm_evaluation_periods
  metric_name         = "UserErrors"
  namespace           = "AWS/DynamoDB"
  period              = var.alarm_period
  statistic           = "Sum"
  threshold           = var.user_errors_alarm_threshold
  alarm_description   = "This metric monitors DynamoDB user errors for ${var.table_name}"
  treat_missing_data  = "notBreaching"

  dimensions = {
    TableName = aws_dynamodb_table.this.name
  }
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.name
}

output "table_arn" {
  description = "ARN completo de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.arn
}

output "table_id" {
  description = "ID único de la tabla DynamoDB"
  value       = aws_dynamodb_table.this.id
}

output "table_status" {
  description = "Estado actual de la tabla (ACTIVE, CREATING, DELETING, etc.)"
  value       = aws_dynamodb_table.this.status
}

output "table_stream_arn" {
  description = "ARN del stream de DynamoDB Streams si está habilitado"
  value       = aws_dynamodb_table.this.stream_arn
  depends_on = [aws_dynamodb_table.this]
}

output "table_stream_label" {
  description = "Etiqueta del stream más reciente"
  value       = aws_dynamodb_table.this.stream_label
  depends_on = [aws_dynamodb_table.this]
}

output "table_size_bytes" {
  description = "Tamaño de la tabla en bytes"
  value       = aws_dynamodb_table.this.table_size_bytes
}

output "item_count" {
  description = "Número de elementos en la tabla"
  value       = aws_dynamodb_table.this.item_count
}

output "billing_mode" {
  description = "Modo de facturación de la tabla (PROVISIONED o PAY_PER_REQUEST)"
  value       = aws_dynamodb_table.this.billing_mode
}

output "hash_key_attribute_name" {
  description = "Nombre del atributo de clave de partición"
  value       = aws_dynamodb_table.this.hash_key
}

output "range_key_attribute_name" {
  description = "Nombre del atributo de clave de ordenamiento"
  value       = aws_dynamodb_table.this.range_key
}

output "global_secondary_indexes" {
  description = "Mapa de índices secundarios globales con sus configuraciones"
  value       = { for gsi in aws_dynamodb_table.this.global_secondary_indexes : gsi.name => gsi }
}

output "local_secondary_indexes" {
  description = "Mapa de índices secundarios locales con sus configuraciones"
  value       = { for lsi in aws_dynamodb_table.this.local_secondary_indexes : lsi.name => lsi }
}

output "read_capacity" {
  description = "Capacidad de lectura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = try(aws_dynamodb_table.this.read_capacity, null)
}

output "write_capacity" {
  description = "Capacidad de escritura aprovisionada (solo si billing_mode es PROVISIONED)"
  value       = try(aws_dynamodb_table.this.write_capacity, null)
}

output "point_in_time_recovery_enabled" {
  description = "Indica si la recuperación point-in-time está habilitada"
  value       = aws_dynamodb_table.this.point_in_time_recovery.0.enabled
}

output "server_side_encryption_enabled" {
  description = "Indica si el cifrado del lado del servidor está habilitado"
  value       = aws_dynamodb_table.this.server_side_encryption.0.enabled
}

output "server_side_encryption_kms_key_arn" {
  description = "ARN de la clave KMS utilizada para el cifrado"
  value       = try(aws_dynamodb_table.this.server_side_encryption.0.kms_key_arn, null)
}

output "ttl_enabled" {
  description = "Indica si TTL está habilitado"
  value       = aws_dynamodb_table.this.ttl.0.enabled
}

output "ttl_attribute_name" {
  description = "Nombre del atributo TTL"
  value       = try(aws_dynamodb_table.this.ttl.0.attribute_name, null)
}

output "autoscaling_read_target_arn" {
  description = "ARN del target de autoescalado de lectura"
  value       = try(aws_appautoscaling_target.table_read_target[0].arn, null)
}

output "autoscaling_write_target_arn" {
  description = "ARN del target de autoescalado de escritura"
  value       = try(aws_appautoscaling_target.table_write_target[0].arn, null)
}

output "read_throttle_alarm_arn" {
  description = "ARN de la alarma de throttling de lectura"
  value       = try(aws_cloudwatch_metric_alarm.read_throttle[0].arn, null)
}

output "write_throttle_alarm_arn" {
  description = "ARN de la alarma de throttling de escritura"
  value       = try(aws_cloudwatch_metric_alarm.write_throttle[0].arn, null)
}

output "user_errors_alarm_arn" {
  description = "ARN de la alarma de errores de usuario"
  value       = try(aws_cloudwatch_metric_alarm.user_errors[0].arn, null)
}

output "resource_policy" {
  description = "Política de recursos aplicada a la tabla"
  value       = try(aws_dynamodb_resource_policy.this[0].policy, null)
}

output "kms_grant_arn" {
  description = "ARN del grant de KMS"
  value       = try(aws_kms_grant.table_grant[0].id, null)
}

output "tags" {
  description = "Etiquetas aplicadas a la tabla"
  value       = aws_dynamodb_table.this.tags
}

output "tags_all" {
  description = "Todas las etiquetas aplicadas a la tabla incluyendo las gestionadas por Terraform"
  value       = aws_dynamodb_table.this.tags_all
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
