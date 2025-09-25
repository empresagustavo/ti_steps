import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserModel } from "../models/user.model";
import { UserRelNavMainModel } from "../models/userRelNavMain.model";





const getAll = async (req: Request, res: Response) => {

  const users = await userService.getAll();

  res.json(users);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const user = await userService.getById(id);
  
  res.json(user);
};

const create = async (req: Request, res: Response) => {

    const { email, name, password, } = req.body as UserModel;

    const newUser = await userService.create({name, email, password});

    res.status(201).json(newUser);
};

const update = async (req: Request, res: Response) => {

  const { email, name, password, } = req.body as UserModel;
  const { id } = req.params;

  const newUser = await userService.update(id, { email, name, password });

  res.json(newUser);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const user = await userService.remove(id);
  
  res.json(user);
};

const createNavMainAccess = async (req: Request, res: Response) => {

  const { userId, navMainId } = req.body as UserRelNavMainModel;

  const userNav = await userService.createNavMainAccess(userId, navMainId);

  res.json(userNav);
}

const removeNavMainAccess = async (req: Request, res: Response) => {

  const { userId, navId } = req.params;

  const userNav = await userService.removeNavMainAccess(userId, navId);

  res.json(userNav);
}


export default { 
  getAll, 
  getById, 
  create, 
  update,
  remove,
  createNavMainAccess,
  removeNavMainAccess,
};
