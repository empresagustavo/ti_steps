import { Prisma, PrismaClient, TriggerVote } from "@prisma/client";

const context = new PrismaClient();

const findAll = async (triggerId: string): Promise<TriggerVote[]> => {

    return await context.triggerVote.findMany({
        where: { triggerId }
    });
};

const findById = async (id: string): Promise<TriggerVote | null> => {

    return await context.triggerVote.findFirst({ 
        where: { id },
    });
};

const findByUserId = async (userId: string, triggerId: string): Promise<TriggerVote | null> => {

    return await context.triggerVote.findFirst({ 
        where: { userId, triggerId },
    });
};

const create = async (data: Prisma.TriggerVoteCreateInput): Promise<TriggerVote> => {

    return await context.triggerVote.create({ 
        data,
    });
};

const update = async (id: string, data: Prisma.TriggerVoteUpdateInput): Promise<TriggerVote> => {

    return await context.triggerVote.update({ 
        where: { id },
        data,
    });
};

const remove = async (id: string): Promise<TriggerVote> => {

    return await context.triggerVote.delete({ 
        where: { id },
    });
};


export default { 
    findAll, 
    findById, 
    findByUserId,
    create, 
    update, 
    remove
};