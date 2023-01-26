import { Injectable } from '@nestjs/common';

import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from './dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { BaseService } from 'src/common/query/base.service';

// import { getFormattedCurrentDatetime } from '../utils/datetime';
const ORDER = [
  {
    createdAt: 'desc',
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
      const product = await super.create({
        data: payload,
      });

      const result = await this.prisma.$transaction([product]);

      console.log(result);

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async find(searchModel: ProductSearchDto) {
    try {
      const query = this._castQuery(searchModel);

      const result = super.read(query);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(id: string) {
    try {
      const result = super.read({ id });

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(id: string, payload: ProductUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      const product = await super.update(
        {
          id: id,
        },
        updatedPayload,
      );

      const result = await this.prisma.$transaction([product]);

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
