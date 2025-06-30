import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponseDto,
} from '../dto/product.dto';
import { CreateVoteDto } from '../dto/vote.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProductCategory } from '../entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ): Promise<ProductResponseDto> {
    return this.productService.createProduct(createProductDto, req.user.id);
  }

  @Get()
  async getAllProducts(): Promise<ProductResponseDto[]> {
    return this.productService.getAllProducts();
  }

  @Get('category/:category')
  async getProductsByCategory(
    @Param('category') category: ProductCategory,
  ): Promise<ProductResponseDto[]> {
    return this.productService.getProductsByCategory(category);
  }

  @Get('recommended')
  @UseGuards(JwtAuthGuard)
  async getRecommendedProducts(@Request() req): Promise<ProductResponseDto[]> {
    return this.productService.getRecommendedProducts(req.user.id);
  }

  @Post(':id/vote')
  @UseGuards(JwtAuthGuard)
  async voteProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() createVoteDto: CreateVoteDto,
    @Request() req,
  ): Promise<void> {
    return this.productService.voteProduct(
      productId,
      createVoteDto,
      req.user.id,
    );
  }

  @Post(':id/close-voting')
  @UseGuards(JwtAuthGuard)
  async closeVoting(
    @Param('id', ParseIntPipe) productId: number,
    @Request() req,
  ): Promise<ProductResponseDto> {
    return this.productService.closeVoting(productId, req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<any> {
    return this.productService.getProductById(id, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ): Promise<ProductResponseDto> {
    return this.productService.updateProduct(id, updateProductDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.productService.deleteProduct(id, req.user.id);
  }
}
