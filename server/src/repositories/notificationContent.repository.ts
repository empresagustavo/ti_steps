import { NotificationContent, Prisma, PrismaClient } from "@prisma/client";

const context = new PrismaClient();



const create = async (data: Prisma.NotificationContentCreateInput): Promise<NotificationContent> => {

    return await context.notificationContent.create({
        data
    });
}

const update = async (id: string, data: Prisma.NotificationContentUpdateInput): Promise<NotificationContent> => {
    
    return await context.notificationContent.update({
        where: { id },
        data
    });
}

const findAll = async (): Promise<NotificationContent[]> => {
    
    return await context.notificationContent.findMany({
        where:{ active: true }
    });
}

const findById = async (id: string): Promise<NotificationContent |  null> => {
    
    return await context.notificationContent.findFirst({
        where: { id }
    });;
}

const remove = async (id: string): Promise<NotificationContent> => {
    
    return await context.notificationContent.delete({
        where: { id }
    });
}

export default {
    create,
    update,
    findAll,
    findById,
    remove,
};