import type { TriggerModel } from "@/models/trigger/trigger.model";
import type { TriggerVoteModel } from "@/models/trigger/triggerVote.model";
import { create, findAll, update, vote } from "@/services/http/trigger.service";
import { useMutation } from "@tanstack/react-query";


export function useFindAllTrigger(
    onSuccess?: (data: TriggerModel[]) => void,
    onError?: (err: any) => void,
 ) {
  return useMutation<TriggerModel[], Error, {startDate: Date, endDate: Date}>({
    mutationFn: findAll,
    onSuccess,
    onError,
  });
}

export function useCreateTrigger(
    onSuccess?: (data: TriggerModel) => void,
    onError?: (err: any) => void,
 ) {
  return useMutation<TriggerModel, Error, TriggerModel>({
    mutationFn: create,
    onSuccess,
    onError,
  });
}

export function useUpdateTrigger(
    onSuccess?: (data: TriggerModel) => void,
    onError?: (err: any) => void,
 ) {
  return useMutation<TriggerModel, Error, TriggerModel>({
    mutationFn: update,
    onSuccess,
    onError,
  });
}

export function useVoteTrigger(
    onSuccess?: (data: TriggerVoteModel) => void,
    onError?: (err: any) => void,
 ) {
  return useMutation<TriggerVoteModel, Error, TriggerVoteModel>({
    mutationFn: vote,
    onSuccess,
    onError,
  });
}