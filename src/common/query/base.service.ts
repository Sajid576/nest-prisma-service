import { PrismaService } from '../prisma/prisma.service';

export class BaseService {
  model: string;
  prisma: PrismaService;

  constructor(prisma: PrismaService, model: string) {
    this.prisma = prisma;
    this.model = model;
  }

  public async create(payload: any) {
    return await (this.prisma as Record<string, any>)[this.model].create({
      data: payload,
    });
  }

  public async update(where: any, payload: any) {
    return await (this.prisma as Record<string, any>)[this.model].update({
      data: payload,
      where: where,
    });
  }

  public async read(
    where?: any,
    attributes?: string[],
    include?: any,
    order?: any[],
    limit?: number,
    page?: number,
  ) {
    return await (this.prisma as Record<string, any>)[this.model].findMany({
      where: where ? where : undefined,
      select: attributes
        ? attributes.reduce((result: any, item: string) => {
            result[item] = true;
            return result;
          }, {} as Record<string, boolean>)
        : undefined,

      include: include ? include : undefined,
      orderBy: order ? order : undefined,
      take: limit ? limit : undefined,
      skip: page && limit ? limit * page : undefined,
    });
  }

  public async delete(where: any) {
    return await (this.prisma as Record<string, any>)[this.model].delete({
      where: where,
    });
  }
}
