import { Prisma } from "@prisma/client";
import { NavMainModel } from "../models/navMain.model";
import navMainRepository, { NavMainWithChildren } from "../repositories/navMain.repository";
import { NotFoundError } from "../errors/http.error";


const getAll = async (): Promise<NavMainModel[]> => {

    let all = await navMainRepository.findAll();

    return all.map(nav => { return toModel(nav); });
};

const getById = async (id: string): Promise<NavMainModel> => {

    let nav = await navMainRepository.findById(id);
    if(!nav) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(nav);;
};

const create = async (model: NavMainModel) => {
    
    let nav = await navMainRepository.create(toEntity(model, true) as unknown as Prisma.NavMainCreateInput);

    return toModel(nav);
};

const update = async (id: string, model: NavMainModel): Promise<NavMainModel> => {
    
    await getById(id);
    
    let nav = await navMainRepository.update(id, toEntity(model, false) as unknown as Prisma.NavMainUpdateInput);

    return toModel(nav);
};

const remove = async (id: string): Promise<boolean> => {

    await getById(id);

    let nav = await navMainRepository.remove(id);
    return nav === undefined;
}

const toModel = (entity: NavMainWithChildren): NavMainModel => {
    console.log(entity)
    return {
        title: entity.title,
        url: entity.url,
        items: entity?.children?.map(child => toModel(child as NavMainWithChildren)),
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
    };
};

const toEntity = (model: NavMainModel, isCreate: boolean): Prisma.NavMainCreateInput | Prisma.NavMainUpdateInput => {

    if(isCreate) {

        const items = model?.items?.map(item => {
            let newItem: Prisma.NavMainCreateWithoutParentInput = {
                title: item.title,
                url: item.url
            };
            return newItem;
        });

        let entity:Prisma.NavMainCreateInput = {
            title: model.title,
            url: model.url,
        };

        if(items){
            entity.children = {
                create: items,
            }
        }

        return entity;
    }

    let entity:Prisma.NavMainUpdateInput ={
        title: model.title,
        url: model.url,
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
