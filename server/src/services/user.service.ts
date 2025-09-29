import { Prisma, User } from "@prisma/client";
import { UserModel } from "../models/user.model";
import userRepository, { UserWithNavMains } from "../repositories/user.repository";
import { hashPassword } from "../utils/crypt.util";
import { BadRequestError, NotFoundError } from "../errors/http.error";
import { randomUUID } from "crypto";
import { UserRelNavMainModel } from "../models/userRelNavMain.model";
import userRelNavMainService from "./userRelNavMain.service";


const getByEmail = async (email: string): Promise<UserModel> => {

    let user = await userRepository.findByEmail(email);
    if(!user) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModelWithNavMains(user);
};

const getAll = async (): Promise<UserModel[]> => {

    let all = await userRepository.findAll();

    return all.map(user => { return toModelWithNavMains(user); });
};

const getById = async (id: string): Promise<UserModel> => {

    let user = await userRepository.findById(id);
    if(!user) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(user);;
};

const create = async (model: UserModel) => {
    
    if(!model.password || !model.email) throw new BadRequestError("Um ou mais parâmetros inválidos.");
    if(await userRepository.findByEmail(model.email)) throw new BadRequestError("Email já existe cadastrado.");

    model.password = await hashPassword(model.password);

    let user = await userRepository.create(toEntity(model, true) as unknown as Prisma.UserCreateInput);

    return toModel(user);
};

const update = async (id: string, model: UserModel): Promise<UserModel> => {
    
    await getById(id);

    if(!model.password || !model.email) throw new BadRequestError("Um ou mais parâmetros inválidos.");

    model.password = await hashPassword(model.password);
    
    let user = await userRepository.update(id, toEntity(model, false) as unknown as Prisma.UserUpdateInput);

    return toModel(user);
};

const remove = async (id: string): Promise<boolean> => {

    await getById(id);

    let user = await userRepository.remove(id);
    return user === undefined;
}

const createNavMainAccess = async (userId: string, navMainId: string): Promise<UserRelNavMainModel> => {

    if (!userId || !navMainId) throw new BadRequestError("Parâmetros inválidos!"); 

    return await userRelNavMainService.create({ userId, navMainId, });
}

const removeNavMainAccess = async (userId: string, navMainId: string): Promise<boolean> => {

    if (!userId || !navMainId) throw new BadRequestError("Parâmetros inválidos!"); 

    return await userRelNavMainService.removeByRel(userId, navMainId);
}

const toModel = (entity: User): UserModel => {
    
    return {
        email: entity.email,
        token: randomUUID(),
        name: entity.name,
        isAdmin: entity.isAdmin,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toModelWithNavMains = (entity: UserWithNavMains): UserModel => {
    
    return {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        isAdmin: entity.isAdmin,
        active: entity.active,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        navMain: entity.userRelNavMain.map(rel => ({
            id: rel.navMain.id,
            title: rel.navMain.title,
            url: rel.navMain.url,
            active: rel.navMain.active,
            items: rel.navMain.children,
            createdAt: rel.createdAt,
            updatedAt: rel.updatedAt,
        }))
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
    getByEmail,
    getAll, 
    getById, 
    create,
    update,
    remove,
    createNavMainAccess,
    removeNavMainAccess,
};
