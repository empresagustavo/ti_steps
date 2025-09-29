import { Prisma, UserRelNavMain } from "@prisma/client";
import { UserRelNavMainModel } from "../models/userRelNavMain.model";
import userRelNavMainRepository from "../repositories/userRelNavMain.repository";
import { NotFoundError } from "../errors/http.error";

const getAll = async (userId: string): Promise<UserRelNavMainModel[]> => {

    let all = await userRelNavMainRepository.findAll(userId);

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<UserRelNavMainModel> => {

    let rel = await userRelNavMainRepository.findById(id);
    if(!rel) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(rel);;
};

const create = async (model: UserRelNavMainModel): Promise<UserRelNavMainModel> => {
    
    let rel = await userRelNavMainRepository.create(toEntity(model, true) as unknown as Prisma.UserRelNavMainCreateInput);

    return toModel(rel);
};

const update = async (id: string, model: UserRelNavMainModel): Promise<UserRelNavMainModel> => {
    
    await getById(id);
    
    let rel = await userRelNavMainRepository.update(id, toEntity(model, false) as unknown as Prisma.UserUpdateInput);

    return toModel(rel);
};

const remove = async (id: string): Promise<boolean> => {

    await getById(id);

    let rel = await userRelNavMainRepository.remove(id);
    return rel === undefined;
}

const removeByRel = async (userId: string, navMainId: string): Promise<boolean> => {

    const userNav = await userRelNavMainRepository.findByRelId(userId, navMainId);
    if(!userNav ) throw new NotFoundError("Nenhum recurso encontrado.");

    let rel = await userRelNavMainRepository.remove(userNav.id);
    return rel === undefined;
}

const toModel = (entity: UserRelNavMain): UserRelNavMainModel => {
    
    return {
        navMainId: entity.navMainId,
        userId: entity.userId,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: UserRelNavMainModel, isCreate: boolean): Prisma.UserRelNavMainCreateInput | Prisma.UserRelNavMainUpdateInput => {

    if(isCreate) {
        let entity:Prisma.UserRelNavMainCreateInput ={
            user: { connect: { id: model.userId } },
            navMain: { connect: { id: model.navMainId } }
        };

        return entity;
    }

    let entity:Prisma.UserRelNavMainUpdateInput ={
        user: { connect: { id: model.userId } },
        navMain: { connect: { id: model.navMainId } },
        active: model.active,
    };
    
    if(model.navMainId) {
        entity.navMain = { connect: { id: model.navMainId } };
    }
    if(model.userId){
        entity.user = { connect: { id: model.userId } };
    }

    return entity;
};


export default { 
    getAll, 
    getById, 
    create,
    update,
    remove,
    removeByRel,
};
