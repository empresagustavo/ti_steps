import { Prisma, PrismaClient, User } from "@prisma/client";


const context = new PrismaClient();

const findAll = async (): Promise<User[]> => {

    return await context.user.findMany() as unknown as User[];
};

const findById = async (id: string): Promise<User | undefined> => {

    return await context.user.findFirst({ 
        where: { 
            id 
        } 
    }) as unknown as User;
};

const create = async (data: Prisma.UserCreateInput): Promise<User> => {

    return await context.user.create({ 
        data 
    }) as unknown as User;
};

const update = async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {

    return await context.user.update({ 
        where: { id },
        data 
    }) as unknown as User;
};

const remove = async (id: string): Promise<User> => {

    return await context.user.delete({ 
        where: { 
            id 
        } 
    }) as unknown as User;
};


export default { 
    findAll, 
    findById, 
    create, 
    update, 
    remove
};