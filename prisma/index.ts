import { PrismaClient } from "@prisma/client";

let primsa: PrismaClient;
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  primsa = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  primsa = global.prisma;
}

export default primsa;
