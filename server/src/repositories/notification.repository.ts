import { Prisma, PrismaClient, Notification } from "@prisma/client";


const context = new PrismaClient();

export type NotificationWithContent = Prisma.NotificationGetPayload<{
    include: { content: true },
}>;


const findAll = async (userId: string): Promise<NotificationWithContent[]> => {

    return await context.notification.findMany({
        where: { userId },
        include: { content: true },
    });
};

const findById = async (id: string): Promise<NotificationWithContent | null> => {

    return await context.notification.findFirst({ 
        where: { id },
        include: { content: true },
    });
};

const create = async (data: Prisma.NotificationCreateInput): Promise<NotificationWithContent> => {

    return await context.notification.create({ 
        data,
        include: { content: true },
    });
};

const update = async (id: string, data: Prisma.NotificationUpdateInput): Promise<NotificationWithContent> => {

    return await context.notification.update({ 
        where: { id },
        data,
        include: { content: true },
    });
};

const remove = async (id: string): Promise<NotificationWithContent> => {

    return await context.notification.delete({ 
        where: { id },
        include: { content: true },
    });
};

export default { 
    findAll, 
    findById,
    create, 
    update, 
    remove
};