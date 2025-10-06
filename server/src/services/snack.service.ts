import { Prisma } from "@prisma/client";
import { SnackModel, SnackStats } from "../models/snack.model";
import snackRepository, { SnackWithUser } from "../repositories/snack.repository";
import { NotFoundError } from "../errors/http.error";


const getAll = async (startDate: Date, endDate: Date): Promise<SnackModel[]> => {

    let all = await snackRepository.findAll(startDate, endDate);

    return all.map(nav => { return toModel(nav); });
};

const getAllStats = async (startDate: Date, endDate: Date): Promise<SnackStats> => {
    
    return toModelStats(await snackRepository.findAll(startDate, endDate));
}

const getById = async (id: string): Promise<SnackModel> => {

    let nav = await snackRepository.findById(id);
    if(!nav) throw new NotFoundError("Nenhum recurso encontrado.");

    return toModel(nav);;
};

const create = async (model: SnackModel) => {
    
    let nav = await snackRepository.create(toEntity(model, true) as unknown as Prisma.SnackCreateInput);

    return toModel(nav);
};

const update = async (id: string, model: SnackModel): Promise<SnackModel> => {
    
    await getById(id);
    
    let nav = await snackRepository.update(id, toEntity(model, false) as unknown as Prisma.SnackUpdateInput);

    return toModel(nav);
};

const remove = async (id: string): Promise<boolean> => {

    await getById(id);

    let nav = await snackRepository.remove(id);
    return nav === undefined;
}

const toModel = (entity: SnackWithUser): SnackModel => {
    console.log(entity)
    return {
        date: entity.date,
        description: entity.description,
        isPaid: entity.isPaid,
        isPromised: entity.isPromised,
        user: {
            email: entity.user.email,
            name: entity.user.name,
            active: entity.user.active,
            createdAt: entity.user.createdAt,
            id: entity.user.id,
            updatedAt: entity.user.updatedAt,
        },
        active: entity.active,
        createdAt: entity.createdAt,
        id: entity.id,
        updatedAt: entity.updatedAt,
        type: entity.type
    };
};

const toModelStats = (entity: SnackWithUser[]): SnackStats => {

    // ==== Totais ====
    const totalPaid = entity.filter((s) => s.isPaid).length;
    const totalUnpaid = entity.filter((s) => !s.isPaid).length;
    const totalPromised = entity.filter((s) => s.isPromised).length;

    // ==== Rankings ====
    // Fome Zero → quem mais pagou
    const hungerZeroRanking = Object.values(
        entity
        .filter((s) => s.isPaid)
        .reduce((acc, s) => {
            acc[s.userId] = acc[s.userId] || { user: s.user.name, count: 0 };
            acc[s.userId].count++;
            return acc;
        }, {} as Record<string, { user: string; count: number }>)
    ).sort((a, b) => b.count - a.count);

    const freeloaderRanking= Object.values(
        entity
        .filter((s) => !s.isPaid && s.date < new Date())
        .reduce((acc, s) => {
            acc[s.userId] = acc[s.userId] || { user: s.user.name, count: 0 };
            acc[s.userId].count++;
            return acc;
        }, {} as Record<string, { user: string; count: number }>)
    ).sort((a, b) => b.count - a.count);

    const afternoonSnackRanking= Object.values(
        entity
        .filter((s) => s.isPaid && s.type === "AFTERNOON")
        .reduce((acc, s) => {
            acc[s.userId] = acc[s.userId] || { user: s.user.name, count: 0 };
            acc[s.userId].count++;
            return acc;
        }, {} as Record<string, { user: string; count: number }>)
    ).sort((a, b) => b.count - a.count);

    const promisedSnackRanking= Object.values(
        entity
        .filter((s) => s.isPromised && !s.isPaid)
        .reduce((acc, s) => {
            acc[s.userId] = acc[s.userId] || { user: s.user.name, count: 0 };
            acc[s.userId].count++;
            return acc;
        }, {} as Record<string, { user: string; count: number }>)
    ).sort((a, b) => b.count - a.count);

    return {
        totalPaid,
        totalUnpaid,
        totalPromised,
        hungerZeroRanking,
        freeloaderRanking,
        afternoonSnackRanking,
        promisedSnackRanking,
    };
}

const toEntity = (model: SnackModel, isCreate: boolean): Prisma.SnackCreateInput | Prisma.SnackUpdateInput => {

    if(isCreate) {

        let entity:Prisma.SnackCreateInput = {
            date: model.date,
            isPromised: model.isPromised,
            user: { connect: { id: model.userId } },
            description: model.description,
            isPaid: model.isPaid,
            type: model.type,
        };

        return entity;
    }

    let entity:Prisma.SnackUpdateInput = {
        date: model.date,
        isPromised: model.isPromised,
        description: model.description,
        isPaid: model.isPaid,
        type: model.type,
        active: model.active,
    };
    if(model.userId){
        entity.user = { connect: { id: model.userId } };
    }

    return entity;
};


export default { 
    getAll, 
    getAllStats,
    getById, 
    create,
    update,
    remove,
};
