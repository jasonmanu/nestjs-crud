import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// The enableShutdownHooks definition is needed to ensure your application shuts down gracefully.
// More information is available in the NestJS docs.

// The Prisma module will be responsible for creating a singleton instance of the PrismaService
// and allow sharing of the service throughout your application.

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
