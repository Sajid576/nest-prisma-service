import { Injectable } from '@nestjs/common';

import { CategoryCreateDto, CategorySearchDto, CategoryUpdateDto } from './dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { BaseService } from 'src/common/query/base.service';

// import { getFormattedCurrentDatetime } from '../utils/datetime';
const ORDER = [
  {
    createdAt: 'desc',
  },
];

const INCLUDE = {};

@Injectable()
export class CategoryService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma, 'category');
    //this.prisma=prisma;
  }

  private _castQuery(searchModel: CategorySearchDto) {
    const query: any = { OR: [] };
    const { key } = searchModel;

    if (key) {
      query.OR.push({
        name: { contains: key, mode: 'insensitive' },
      });
    }

    return query.OR.length === 0 ? null : query;
  }

  public async create(payload: CategoryCreateDto) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const category = await super.create(payload, tx);

        return category;
      });

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async find(searchModel: CategorySearchDto) {
    try {
      const query = this._castQuery(searchModel);

      const result = await super.read(query);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async findById(id: string) {
    try {
      const result = await super.read({ id: Number(id) }, ['id', 'name']);

      return { success: true, data: result };
    } catch (err) {
      return { success: false, data: err };
    }
  }

  public async update(id: string, payload: CategoryUpdateDto) {
    try {
      const updatedPayload: any = { ...payload };

      const result = await this.prisma.$transaction(async (tx) => {
        const category = await super.update(
          {
            id: Number(id),
          },
          updatedPayload,
          tx,
        );

        return category;
      });

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }

  public async remove(id: string) {
    try {
      const result = super.delete({ id: Number(id) });

      return { success: true, data: result };
    } catch (error) {
      return { success: false, data: error };
    }
  }
}
