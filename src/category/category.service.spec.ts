import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.create.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let category: CategoryCreateDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    category = {
      name: 'Test Category',
    };
  });

  describe('create', () => {
    it('should create a category', async () => {
      const result = await service.create(category);

      expect(result.data).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        ...category,
      });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const created = await service.create(category);

      const updatedPayload = {
        name: 'TEST Category-1',
      };
      const result = await service.update(
        created.data.id.toString(),
        updatedPayload,
      );
      expect(result.data).toEqual({
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        ...updatedPayload,
      });
    });
  });

  describe('findAll', () => {
    it('should return all categoies', async () => {
      const result = await service.find({});
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should return success response', async () => {
      const result = await service.find({ key: 'test' });
      expect(result.success).toEqual(true);
    });
  });

  describe('delete', () => {
    it('should delete a row', async () => {
      const created = await service.create(category);
      const result = await service.remove(created.data.id.toString());
      expect(result.success).toEqual(true);
    });
  });
});
