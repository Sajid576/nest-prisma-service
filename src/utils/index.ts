import * as bcrypt from 'bcrypt';

export async function generateHashedData(data: any) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}
