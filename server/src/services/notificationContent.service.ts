import { Prisma, NotificationContent } from "@prisma/client";
import { NotificationContentModel } from "../models/notificationContent.model";
import { NotificationModel } from "../models/notification.model";
import notificationContentRepository from "../repositories/notificationContent.repository";



const getAll = async (): Promise<NotificationContentModel[]> => {

    let all = await notificationContentRepository.findAll();

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<NotificationContentModel> => {

    let rel = await notificationContentRepository.findById(id);
    if(!rel) throw new Error("Nenhum recurso encontrado.");

    return toModel(rel);;
};

const create = async (model: NotificationContentModel): Promise<NotificationContentModel> => {
    
    let rel = await notificationContentRepository.create(toEntity(model, true) as unknown as Prisma.NotificationContentCreateInput);

    return toModel(rel);
};

const update = async (id: string, model: NotificationContentModel): Promise<NotificationContentModel> => {
    
    if(!await notificationContentRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");
    
    let rel = await notificationContentRepository.update(id, toEntity(model, false) as unknown as Prisma.NotificationContentUpdateInput);

    return toModel(rel);
};

const remove = async (id: string): Promise<boolean> => {

    if(!await notificationContentRepository.findById(id)) throw new Error("Nenhum recurso encontrado.");

    let rel = await notificationContentRepository.remove(id);
    return rel === undefined;
}


const toModel = (entity: NotificationContent): NotificationContentModel => {
    
    return {
        title: entity.title,
        message: entity.message,
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: NotificationContentModel, isCreate: boolean): Prisma.NotificationContentCreateInput | Prisma.NotificationContentUpdateInput => {

    if(isCreate) {
        let entity:Prisma.NotificationContentCreateInput ={
            message: model.message,
            title: model.title,
        };

        return entity;
    }

    let entity:Prisma.NotificationContentUpdateInput ={
        active: model.active,
        message: model.message,
        title: model.title,
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
