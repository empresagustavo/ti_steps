import { Prisma, PrismaClient, Notification } from "@prisma/client";


const context = new PrismaClient();

const findAll = async (userId: string): Promise<Notification[]> => {

    return await context.notification.findMany({
        where: { userId },
    });
};

const findById = async (id: string): Promise<Notification | null> => {

    return await context.notification.findFirst({ 
        where: { id },
    });
};

const create = async (data: Prisma.NotificationCreateInput): Promise<Notification> => {

    return await context.notification.create({ 
        data,
    });
};

const update = async (id: string, data: Prisma.NotificationUpdateInput): Promise<Notification> => {

    return await context.notification.update({ 
        where: { id },
        data,
    });
};

const remove = async (id: string): Promise<Notification> => {

    return await context.notification.delete({ 
        where: { id },
    });
};

export default { 
    findAll, 
    findById,
    create, 
    update, 
    remove
};