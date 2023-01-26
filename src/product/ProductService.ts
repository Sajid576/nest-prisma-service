import { Injectable } from '@nestjs/common';
import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from './dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { BaseService } from 'src/common/prisma/base.service';

// import { getFormattedCurrentDatetime } from '../utils/datetime';

@Injectable()
export class ProductService extends BaseService {
  constructor(private prisma: PrismaService) {
    super(prisma, 'product');
  }

  public _castQuery(searchModel: ProductSearchDto) {
    const query: any = {};
    const { key, categoryId, fromDate, toDate } = searchModel;

    if (fromDate) {
      query.createdAt = {
        gte: new Date(fromDate),
      };
    }

    if (toDate) {
      query.createdAt = {
        lte: new Date(toDate),
      };
    }

    return query;
  }

  public async create(payload: ProductCreateDto) {
    try {
      const product = await this.prisma.product.create({
        data: payload,
      });

      // const result = await this.prisma.$transaction([
      //   product
      // ]);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async find(searchModel: ProductSearchDto) {
    try {
      const query = this._castQuery(searchModel);

      const result = await this.prisma.product.groupBy({
        by: ['userId'],
        _count: {
          mealId: true,
        },
        where: query,
      });

      return { success: true, data: users };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(id: string) {
    try {
      const result = await this.prisma.product.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(id: string, payload: ProductUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      const result = await this.prisma.product.update({
        data: updatedPayload,
        where: {
          id: parseInt(id),
        },
      });

      console.log('product update', result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = await this.prisma.meal.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log('product delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
