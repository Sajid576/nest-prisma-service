import { Injectable } from '@nestjs/common';

import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from './dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { BaseService } from 'src/common/query/base.service';

// import { getFormattedCurrentDatetime } from '../utils/datetime';
const ORDER = [
  {
    createdAt: 'asc',
  },
];

const INCLUDE = {
  category: {
    orderBy: {
      name: 'desc',
    },
    select: {
      name: true,
    },
  },
};

@Injectable()
export class ProductService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
    //this.prisma=prisma;
  }

  private _castQuery(searchModel: ProductSearchDto) {
    const query: any = { OR: [] };
    const { key, categoryId } = searchModel;

    if (key) {
      const keywords = key.split(' ');
      query.OR.push({
        name: { contains: key, mode: 'insensitive' },
      });
      query.OR.push({
        tags: { has: key },
      });
      if (keywords.length > 1) {
        keywords.map((keyword) => {
          query.OR.push({
            tags: { has: keyword },
          });
        });
      }
    }
    if (categoryId) {
      query.categoryId = categoryId;
    }

    return query.OR.length === 0 && !query.categoryId ? null : query;
  }

  public async create(payload: ProductCreateDto) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const product = await super.create(payload, tx);

        return product;
      });

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async find(searchModel: ProductSearchDto) {
    try {
      const query = this._castQuery(searchModel);

      const result = await super.read(
        query,
        ['id', 'name'],
        null,
        ORDER,
        Number(searchModel.limit),
        Number(searchModel.page),
      );

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(id: string) {
    try {
      const result = await super.read({ id });

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(id: string, payload: ProductUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      const result = await this.prisma.$transaction(async (tx) => {
        const product = await super.update(
          {
            id: Number(id),
          },
          updatedPayload,
          tx,
        );

        return product;
      });

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = super.delete({ id });
      console.log('product delete', result);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
