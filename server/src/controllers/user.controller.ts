import { Request, Response } from "express";
import userService from "../services/user.service";
import { UserModel } from "../models/user.model";

const getAll = async (req: Request, res: Response) => {

  const users = await userService.getAll();

  res.json(users);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const user = await userService.getById(id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  
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

  res.status(201).json(newUser);
};

export default { 
    getAll, 
    getById, 
    create, 
    update
};
