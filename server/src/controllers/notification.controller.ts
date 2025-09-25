import { Request, Response } from "express";
import notificationService from "../services/notification.service";
import { NotificationModel } from "../models/notification.model";



const getAll = async (req: Request, res: Response) => {

  const { userId } = req.query;

  const navs = await notificationService.getAll(userId as string);

  res.json(navs);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await notificationService.getById(id);
  
  res.json(nav);
};

const create = async (req: Request, res: Response) => {

    const { userId, contentId } = req.body as NotificationModel;

    const newNav = await notificationService.create({ userId, contentId });

    res.status(201).json(newNav);
};

const update = async (req: Request, res: Response) => {

  const { read, } = req.body as NotificationModel;
  const { id } = req.params;

  const nav = await notificationService.update(id, { read });

  res.json(nav);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await notificationService.remove(id);
  
  res.json(nav);
};


export default { 
    getAll, 
    getById, 
    create, 
    update,
    remove
};
