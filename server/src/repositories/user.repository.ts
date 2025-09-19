import { Prisma, PrismaClient, User } from "@prisma/client";


export type UserWithNavMains = Prisma.UserGetPayload<{
    include: {
        userRelNavMain: {
            include: {
                navMain: {
                    include: { children: true } 
                }
            }
        }
    }
}>;

const context = new PrismaClient();


const findByEmail = async (email: string): Promise<UserWithNavMains | null> => {

    return await context.user.findFirst({ 
        where: { email },
        include: {
            userRelNavMain: {
                include: {
                    navMain: {
                        include: { children: true }
                    }
                }
            }
        } 
    });
};

const findAll = async (): Promise<UserWithNavMains[]> => {

    return await context.user.findMany({
        include: {
            userRelNavMain: {
                include: {
                    navMain: {
                        include: { children: true }
                    }
                }
            }
        } 
    });
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
    findByEmail,
    findAll, 
    findById, 
    create, 
    update, 
    remove
};