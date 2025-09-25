import { Request, Response } from "express";
import { NotificationModel } from "../models/notification.model";
import notificationContentService from "../services/notificationContent.service";
import { NotificationContentModel } from "../models/notificationContent.model";



const getAll = async (req: Request, res: Response) => {

  const navs = await notificationContentService.getAll();

  res.json(navs);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await notificationContentService.getById(id);
  
  res.json(nav);
};

const create = async (req: Request, res: Response) => {

  const { message, title } = req.body as NotificationContentModel;

  const newNav = await notificationContentService.create({ message, title });

  res.status(201).json(newNav);
};

const update = async (req: Request, res: Response) => {

  const { message, title, active } = req.body as NotificationContentModel;
  const { id } = req.params;

  const nav = await notificationContentService.update(id, { message, title, active });

  res.json(nav);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await notificationContentService.remove(id);
  
  res.json(nav);
};


export default { 
    getAll, 
    getById, 
    create, 
    update,
    remove
};
