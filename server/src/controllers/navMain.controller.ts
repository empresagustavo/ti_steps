import { Request, Response } from "express";
import navMainService from "../services/navMain.service";
import { NavMainModel } from "../models/navMain.model";

const getAll = async (req: Request, res: Response) => {

  const navs = await navMainService.getAll();

  res.json(navs);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await navMainService.getById(id);
  if (!nav) return res.status(404).json({ message: "Nav não encontrado" });
  
  res.json(nav);
};

const create = async (req: Request, res: Response) => {

    const { title, url, items } = req.body as NavMainModel;

    const newNav = await navMainService.create({ title, url, items });

    res.status(201).json(newNav);
};

const update = async (req: Request, res: Response) => {

  const { title, url, } = req.body as NavMainModel;
  const { id } = req.params;

  const nav = await navMainService.update(id, { title, url, });

  res.status(201).json(nav);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const nav = await navMainService.remove(id);
  if (!nav) return res.status(404).json({ message: "Nav não encontrado" });
  
  res.json(nav);
};


export default { 
    getAll, 
    getById, 
    create, 
    update,
    remove
};
