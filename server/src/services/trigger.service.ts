import { Prisma, Trigger } from "@prisma/client";
import triggerRepository, { TriggerWithVote } from "../repositories/trigger.repository";
import { TriggerModel } from "../models/trigger.model";
import { TriggerVoteModel } from "../models/triggerVote.model";
import { BadRequestError } from "../errors/http.error";
import triggerVoteService from "./triggerVote.service";


const getAll = async (createdAtStart: Date, createdAtEnd: Date): Promise<TriggerModel[]> => {

    let all = await triggerRepository.findAll(createdAtStart, createdAtEnd);

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<TriggerModel> => {

    let rel = await triggerRepository.findById(id);
    if(!rel) throw new Error("Nenhum recurso encontrado.");

    return toModel(rel);;
};

const create = async (model: TriggerModel): Promise<TriggerModel> => {
    
    let rel = await triggerRepository.create(toEntity(model, true) as unknown as Prisma.TriggerCreateInput);

    return toModel(rel);
};

const update = async (id: string, model: TriggerModel): Promise<TriggerModel> => {
    
    if(!await triggerRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");
    
    let rel = await triggerRepository.update(id, toEntity(model, false) as unknown as Prisma.TriggerUpdateInput);

    return toModel(rel);
};

const remove = async (id: string): Promise<boolean> => {

    if(!await triggerRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");

    let rel = await triggerRepository.remove(id);
    return rel === undefined;
}

const vote = async (vote: TriggerVoteModel): Promise<TriggerVoteModel> => {

    const trigger = await triggerRepository.findById(vote.triggerId);
    if(!trigger) throw new Error("Nenhum recurso encontrado.");

    let isVoted: boolean;
    try {
        isVoted = await triggerVoteService.findByUserId(vote.userId, vote.triggerId) !== undefined;
    } catch (error) {
        isVoted = false;
    }

    if(isVoted) throw new BadRequestError("Usuário já votou!")

    const triggerEndTime = new Date(trigger.createdAt.getTime() + trigger.duration * 60_000)
    const now = new Date();
    if(now > triggerEndTime) throw new BadRequestError("Votação encerrada!");

    return await triggerVoteService.create(vote);
}


const toModel = (entity: TriggerWithVote): TriggerModel => {
    
    return {
        active: entity.active,
        author: {
            email: entity.author.email,
            name: entity.author.name,
            active: entity.author.active,
            createdAt: entity.author.createdAt,
            id: entity.author.id,
            updatedAt: entity.author.updatedAt,
        },
        proposer: {
            email: entity.proposer.email,
            name: entity.proposer.name,
            active: entity.proposer.active,
            createdAt: entity.proposer.createdAt,
            id: entity.proposer.id,
            updatedAt: entity.proposer.updatedAt,
        },
        duration: entity.duration,
        votes: entity.votes.map(vote => {
            return { 
                userId: vote.userId,
                triggerId: vote.triggerId,
                vote: vote.vote,
                active: vote.active,
                createdAt: vote.createdAt,
                id: vote.id,
                updatedAt: vote.updatedAt
            }
        }),
        negativeVotes: entity.votes.filter(vote => vote.vote === false).length,
        positiveVotes: entity.votes.filter(vote => vote.vote === true).length,
        phrase: entity.phrase,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: TriggerModel, isCreate: boolean): Prisma.TriggerCreateInput | Prisma.TriggerUpdateInput => {

    if(isCreate) {
        let entity:Prisma.TriggerCreateInput ={
            author: { connect: { id: model.authorId } },
            proposer: { connect: { id: model.proposerId } },
            phrase: model.phrase,
            duration: model.duration,
        };

        return entity;
    }

    let entity:Prisma.TriggerUpdateInput ={
        active: model.active,
    };
    if(model.authorId){
        entity.author = { connect: { id: model.authorId } };
    }
    if(model.proposerId){
        entity.proposer = { connect: { id: model.proposerId } };
    }
    if(model.phrase){
        entity.phrase = model.phrase;
    }
    if(model.duration && model.duration > 0){
        entity.duration =  model.duration;
    }

    return entity;
};


export default { 
    getAll, 
    getById, 
    create,
    update,
    remove,
    vote,
};
