import { Prisma, PrismaClient, UserRelNavMain } from "@prisma/client";


const context = new PrismaClient();

const findAll = async (userId: string): Promise<UserRelNavMain[]> => {

    return await context.userRelNavMain.findMany({
        where: { userId },
    });
};

const findById = async (id: string): Promise<UserRelNavMain | null> => {

    return await context.userRelNavMain.findFirst({ 
        where: { id },
    });
};

const findByRelId = async (userId: string, navMainId: string): Promise<UserRelNavMain | null> => {

    return await context.userRelNavMain.findFirst({ 
        where: { userId, navMainId },
    });
};

const create = async (data: Prisma.UserRelNavMainCreateInput): Promise<UserRelNavMain> => {

    return await context.userRelNavMain.create({ 
        data,
    });
};

const update = async (id: string, data: Prisma.UserRelNavMainUpdateInput): Promise<UserRelNavMain> => {

    return await context.userRelNavMain.update({ 
        where: { id },
        data,
    });
};

const remove = async (id: string): Promise<UserRelNavMain> => {

    return await context.userRelNavMain.delete({ 
        where: { id },
    });
};

export default { 
    findAll, 
    findById,
    findByRelId,
    create, 
    update, 
    remove
};