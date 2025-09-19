import { Prisma, PrismaClient, NavMain } from "@prisma/client";

export type NavMainWithChildren = Prisma.NavMainGetPayload<{
  include: { children: true },
}>;

const context = new PrismaClient();

const findAll = async (): Promise<NavMainWithChildren[]> => {

    return await context.navMain.findMany({
        where: { parentId : null },
        include: { children : true }
    });
};

const findById = async (id: string): Promise<NavMainWithChildren | null> => {

    return await context.navMain.findFirst({ 
        where: { id },
        include: { children : true }
    });
};

const create = async (data: Prisma.NavMainCreateInput): Promise<NavMainWithChildren> => {

    return await context.navMain.create({ 
        data,
        include: { children: true }
    });
};

const update = async (id: string, data: Prisma.NavMainUpdateInput): Promise<NavMainWithChildren> => {

    return await context.navMain.update({ 
        where: { id },
        data,
        include: { children: true }
    });
};

const remove = async (id: string): Promise<NavMainWithChildren> => {

    return await context.navMain.delete({ 
        where: { id },
        include: { children: true }
    });
};


export default { 
    findAll, 
    findById, 
    create, 
    update, 
    remove
};