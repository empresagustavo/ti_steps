import { Prisma, PrismaClient } from "@prisma/client";

export type SnackWithUser = Prisma.SnackGetPayload<{
  include: { user: true },
}>;



const context = new PrismaClient();

const findAll = async (startDate: Date, endDate: Date): Promise<SnackWithUser[]> => {

    return await context.snack.findMany({
        where: {
            active: true,
            AND: [
                { date: { gte: startDate, lte: endDate, } },
            ] 
        },
        include: { user : true }
    });
};

const findById = async (id: string): Promise<SnackWithUser | null> => {

    return await context.snack.findFirst({ 
        where: { id },
        include: { user : true }
    });
};

const create = async (data: Prisma.SnackCreateInput): Promise<SnackWithUser> => {

    return await context.snack.create({ 
        data,
        include: { user: true }
    });
};

const update = async (id: string, data: Prisma.SnackUpdateInput): Promise<SnackWithUser> => {

    return await context.snack.update({ 
        where: { id },
        data,
        include: { user: true }
    });
};

const remove = async (id: string): Promise<SnackWithUser> => {

    return await context.snack.delete({ 
        where: { id },
        include: { user: true }
    });
};


export default { 
    findAll, 
    findById, 
    create, 
    update, 
    remove
};