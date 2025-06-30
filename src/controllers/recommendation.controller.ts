import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { RecommendationService } from '../services/recommendation.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('personalized')
  @UseGuards(JwtAuthGuard)
  async getPersonalizedRecommendations(@Request() req) {
    return this.recommendationService.getPersonalizedRecommendations(
      req.user.id,
    );
  }

  @Get('alternatives/:productId')
  async getAlternativeProducts(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.recommendationService.getAlternativeProducts(productId);
  }

  @Get('trending')
  async getTrendingProducts() {
    return this.recommendationService.getTrendingProducts();
  }
}
