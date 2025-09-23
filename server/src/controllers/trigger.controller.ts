import { Request, Response } from "express";
import triggerService from "../services/trigger.service";
import { TriggerModel } from "../models/trigger.model";
import { TriggerVoteModel } from "../models/triggerVote.model";

const getAll = async (req: Request, res: Response) => {

  const { cas, cae } = req.query;
  console.log(cas, cae)

  const triggers = await triggerService.getAll(new Date(cas as string), new Date(cae as string));

  res.json(triggers);
};

const getById = async (req: Request, res: Response) => {

  const { id } = req.params;

  const trigger = await triggerService.getById(id);
  
  res.json(trigger);
};

const create = async (req: Request, res: Response) => {

    const { duration, phrase, authorId, proposerId } = req.body as TriggerModel;

    const trigger = await triggerService.create({ duration, phrase, authorId, proposerId });

    res.status(201).json(trigger);
};

const update = async (req: Request, res: Response) => {

  const { duration, phrase, authorId, proposerId, active, } = req.body as TriggerModel;
  const { id } = req.params;

  const trigger = await triggerService.update(id, { duration, phrase, authorId, proposerId, active,});

  res.json(trigger);
};

const remove = async (req: Request, res: Response) => {

  const { id } = req.params;

  const trigger = await triggerService.remove(id);
  
  res.json(trigger);
};

const vote = async (req: Request, res: Response) => {

  const { userId, triggerId, vote } = req.body as TriggerVoteModel;

  const triggerVote = await triggerService.vote({ userId, triggerId, vote });
  
  res.json(triggerVote);
};

export default { 
    getAll, 
    getById, 
    create, 
    update,
    remove,
    vote
};
