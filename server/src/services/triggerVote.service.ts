import { Prisma, TriggerVote } from "@prisma/client";
import triggerVoteRepository from "../repositories/triggerVote.repository";
import { TriggerVoteModel } from "../models/triggerVote.model";
import { NotFoundError } from "../errors/http.error";

const getAll = async (userId: string): Promise<TriggerVoteModel[]> => {

    let all = await triggerVoteRepository.findAll(userId);

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<TriggerVoteModel> => {

    let vote = await triggerVoteRepository.findById(id);
    if(!vote) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(vote);;
};

const findByUserId = async (userId: string, triggerId: string): Promise<TriggerVoteModel> => {

    let vote = await triggerVoteRepository.findByUserId(userId, triggerId);
    if(!vote) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(vote);;
};

const create = async (model: TriggerVoteModel): Promise<TriggerVoteModel> => {
    
    let vote = await triggerVoteRepository.create(toEntity(model, true) as unknown as Prisma.TriggerVoteCreateInput);

    return toModel(vote);
};

const update = async (id: string, model: TriggerVoteModel): Promise<TriggerVoteModel> => {
    
    if(!await triggerVoteRepository.findById(id)) throw new NotFoundError("Nenhum recurso encontrado.");
    
    let vote = await triggerVoteRepository.update(id, toEntity(model, false) as unknown as Prisma.TriggerVoteUpdateInput);

    return toModel(vote);
};

const remove = async (id: string): Promise<boolean> => {

    if(!await triggerVoteRepository.findById(id)) throw new NotFoundError("Nenhum recurso encontrado.");

    let vote = await triggerVoteRepository.remove(id);
    return vote === undefined;
}

const toModel = (entity: TriggerVote): TriggerVoteModel => {
    
    return {
        triggerId: entity.triggerId,
        userId: entity.userId,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
        vote: entity.vote
    };
};

const toEntity = (model: TriggerVoteModel, isCreate: boolean): Prisma.TriggerVoteCreateInput | Prisma.TriggerVoteUpdateInput => {

    if(isCreate) {
        let entity:Prisma.TriggerVoteCreateInput ={
            trigger: { connect: { id: model.triggerId } },
            user: { connect: { id: model.userId } },
            vote: model.vote
        };

        return entity;
    }

    let entity:Prisma.TriggerVoteUpdateInput ={ 
    };
    
    return entity;
};


export default { 
    getAll, 
    getById, 
    findByUserId,
    create,
    update,
    remove,
};
