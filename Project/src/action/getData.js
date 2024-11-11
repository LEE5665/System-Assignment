'use server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function getName() {
  const prisma = new PrismaClient();
  const Number = jwt.verify(cookies().get('accessToken').value, process.env.JWT_SECRET)?.userId;
  const data = await prisma.User.findMany({
    where: { Number },
    include: {},
  });
  return data[0];
}
