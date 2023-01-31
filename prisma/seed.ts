import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { generateHashedData } from '../src/utils';
const prisma = new PrismaClient();

const getBulkUsers = async () => [
  {
    name: 'Sajid',
    email: 'sajidahmed696@gmail.com',
    password: await generateHashedData('123456'),
    roles: ['admin'],
  },
  {
    name: 'Safwan',
    email: 'safwan@gmail.com',
    password: await generateHashedData('123456'),
    roles: ['admin'],
  },
  {
    name: 'Maruf',
    email: 'maruf@gmail.com',
    password: await generateHashedData('123456'),
    roles: ['admin'],
  },
];

async function main() {
  dotenv.config();
  console.log('Seeding...');
  /// --------- Users ---------------
  const total = (await getBulkUsers()).length;

  for (let i = 0; i < total; i++) {
    try {
      await prisma.user.create({ data: (await getBulkUsers())[i] });
    } catch (error) {}
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
