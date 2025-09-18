import { Prisma, User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import userRepository from "../repositories/user.repository";

const getAll = async (): Promise<UserModel[]> => {

    let all = await userRepository.findAll();

    return all.map(user => { return toModel(user); });
};

const getById = async (id: string): Promise<UserModel> => {

    let user = await userRepository.findById(id);
    if(!user) throw new Error("Nenhum recurso encontrado.");

    return toModel(user);;
};

const create = async (model: UserModel) => {
    
    let user = await userRepository.create(toEntity(model, true) as unknown as Prisma.UserCreateInput);

    return toModel(user);
};

const update = async (id: string, model: UserModel): Promise<UserModel> => {
    
    if(!await userRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");
    
    let user = await userRepository.update(id, toEntity(model, false) as unknown as Prisma.UserUpdateInput);

    return toModel(user);
};

const remove = async (id: string): Promise<boolean> => {

    if(!await userRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");

    let user = await userRepository.remove(id);
    return user === undefined;
}

const toModel = (entity: User): UserModel => {
    
    return {
        email: entity.email,
        name: entity.name,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: UserModel, isCreate: boolean): Prisma.UserCreateInput | Prisma.UserUpdateInput => {

    if(isCreate) {
        let entity:Prisma.UserCreateInput ={
            email: model.email,
            name: model.name,
            password: model.password!
        };

        return entity;
    }

    let entity:Prisma.UserUpdateInput ={
        email: model.email,
        name: model.name,
        password: model.password,
        active: model.active,
    };

    return entity;
};


export default { 
    getAll, 
    getById, 
    create,
    update,
    remove,
};
