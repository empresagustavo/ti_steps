import { Prisma, Notification } from "@prisma/client";
import { NotificationModel } from "../models/notification.model";
import notificationRepository from "../repositories/notification.repository";

const getAll = async (userId: string): Promise<NotificationModel[]> => {

    let all = await notificationRepository.findAll(userId);

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<NotificationModel> => {

    let rel = await notificationRepository.findById(id);
    if(!rel) throw new Error("Nenhum recurso encontrado.");

    return toModel(rel);;
};

const create = async (model: NotificationModel): Promise<NotificationModel> => {
    
    let rel = await notificationRepository.create(toEntity(model, true) as unknown as Prisma.NotificationCreateInput);

    return toModel(rel);
};

const update = async (id: string, model: NotificationModel): Promise<NotificationModel> => {
    
    if(!await notificationRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");
    
    let rel = await notificationRepository.update(id, toEntity(model, false) as unknown as Prisma.NotificationUpdateInput);

    return toModel(rel);
};

const remove = async (id: string): Promise<boolean> => {

    if(!await notificationRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");

    let rel = await notificationRepository.remove(id);
    return rel === undefined;
}


const toModel = (entity: Notification): NotificationModel => {
    
    return {
        title: entity.title,
        read: entity.read,
        message: entity.message,
        userId: entity.userId,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: NotificationModel, isCreate: boolean): Prisma.NotificationCreateInput | Prisma.NotificationUpdateInput => {

    if(isCreate) {
        let entity:Prisma.NotificationCreateInput ={
            user: { connect: { id: model.userId } },
            message: model.message,
            title: model.title,
        };

        return entity;
    }

    let entity:Prisma.NotificationUpdateInput ={
        active: model.active,
        read: model.read
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
