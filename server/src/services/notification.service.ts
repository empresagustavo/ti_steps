import { Prisma } from "@prisma/client";
import notificationRepository, { NotificationWithContent } from "../repositories/notification.repository";
import { NotificationModel } from "../models/notification.model";
import { NotFoundError } from "../errors/http.error";

const getAll = async (userId: string): Promise<NotificationModel[]> => {

    let all = await notificationRepository.findAll(userId);

    return all.map(rel => { return toModel(rel); });
};

const getById = async (id: string): Promise<NotificationModel> => {

    let rel = await notificationRepository.findById(id);
    if(!rel) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(rel);;
};

const create = async (model: NotificationModel): Promise<NotificationModel> => {
    
    let rel = await notificationRepository.create(toEntity(model, true) as unknown as Prisma.NotificationCreateInput);

    return toModel(rel);
};

const update = async (id: string, model: NotificationModel): Promise<NotificationModel> => {
    
    await getById(id);
    
    let rel = await notificationRepository.update(id, toEntity(model, false) as unknown as Prisma.NotificationUpdateInput);

    return toModel(rel);
};

const remove = async (id: string): Promise<boolean> => {

    await getById(id);

    let rel = await notificationRepository.remove(id);
    return rel === undefined;
}


const toModel = (entity: NotificationWithContent): NotificationModel => {
    
    return {
        content: {
            message:entity.content.message,
            title: entity.content.title,
            active: entity.content.active,
            createdAt: entity.content.createdAt,
            id: entity.content.id,
            updatedAt: entity.content.updatedAt, 
        },
        read: entity.read,
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
            content: { connect: { id: model.contentId } }
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
