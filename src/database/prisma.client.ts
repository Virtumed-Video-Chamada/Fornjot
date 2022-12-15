import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService extends PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks() {
        this.$on('beforeExit', async () => {
            await this.$disconnect();
        });
    }
}

export default { prisma };
