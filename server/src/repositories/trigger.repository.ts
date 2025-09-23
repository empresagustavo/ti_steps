import { Prisma, PrismaClient } from "@prisma/client";

export type TriggerWithVote = Prisma.TriggerGetPayload<{
    include: {
        votes: true, 
        author: true,
        proposer: true
    },
}>;

const context = new PrismaClient();

const findAll = async (createdAtStart: Date, createdAtEnd: Date): Promise<TriggerWithVote[]> => {

    return await context.trigger.findMany({
        where: {
            active: true,
            AND: [
                createdAtStart && createdAtEnd ? { createdAt: { gte: createdAtStart, lte: createdAtEnd, } } : {},
            ] 
        },
        include: {
            votes: true, 
            author: true,
            proposer: true
        },
    });
};

const findById = async (id: string): Promise<TriggerWithVote | null> => {

    return await context.trigger.findFirst({ 
        where: { id },
        include: {
            votes: true, 
            author: true,
            proposer: true
        },
    });
};

const create = async (data: Prisma.TriggerCreateInput): Promise<TriggerWithVote> => {

    return await context.trigger.create({ 
        data,
        include: {
            votes: true, 
            author: true,
            proposer: true
        },
    });
};

const update = async (id: string, data: Prisma.TriggerUpdateInput): Promise<TriggerWithVote> => {

    return await context.trigger.update({ 
        where: { id },
        data,
        include: {
            votes: true, 
            author: true,
            proposer: true
        },
    });
};

const remove = async (id: string): Promise<TriggerWithVote> => {

    return await context.trigger.delete({ 
        where: { id },
        include: {
            votes: true, 
            author: true,
            proposer: true
        },
    });
};


export default { 
    findAll, 
    findById, 
    create, 
    update, 
    remove
};