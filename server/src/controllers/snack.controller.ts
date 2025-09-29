import { Request, Response } from "express";
import snackService from "../services/snack.service";
import { SnackModel } from "../models/snack.model";

const getAll = async (req: Request, res: Response) => {

  const { cas, cae } = req.query;

  console.log(cas, cae)

  const stacks = await snackService.getAll(new Date(cas as string), new Date(cae as string));

  res.json(stacks);
};

const getAllStats = async (req: Request, res: Response) => {

  const { cas, cae } = req.query;

  console.log(cas, cae)

  const stacks = await snackService.getAllStats(new Date(cas as string), new Date(cae as string));

  res.json(stacks);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const stack = await snackService.getById(id);
  
  res.json(stack);
};

const create = async (req: Request, res: Response) => {

    const { date, isPromised, description, userId, isPaid, type } = req.body as SnackModel;

    const newStack = await snackService.create({ date, isPromised, description, userId, isPaid, type });

    res.status(201).json(newStack);
};

const update = async (req: Request, res: Response) => {

  const { date, isPromised, description, userId, isPaid, type } = req.body as SnackModel;
  const { id } = req.params;

  const stack = await snackService.update(id, { date, isPromised, description, userId, isPaid, type });

  res.json(stack);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const stack = await snackService.remove(id);
  
  res.json(stack);
};


export default { 
    getAll, 
    getAllStats,
    getById, 
    create, 
    update,
    remove
};
