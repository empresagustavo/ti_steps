import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Clock, Trophy, Medal, Award, Bookmark } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { TriggerModel } from "@/models/trigger/trigger.model"
import { useFindAllTrigger, useVoteTrigger } from "@/hooks/trigger/trigger.hook"
import { useAuth } from "@/hooks/auth/use-auth"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

type UserRanking = {
  id: string
  name: string
  triggersCount: number
  icon: React.ComponentType<any>
}

type ExtendedTrigger = TriggerModel & {
  isOpen: boolean;
  timeLeft: number; // segundos
  hasVoted?: "up" | "down";
  positiveVotes: number;
  negativeVotes: number;
};


export default function TriggerPage() {
  const { userData } = useAuth()
  const [triggers, setTriggers] = useState<ExtendedTrigger[]>([]);

  const [ranking, setRanking] = useState<UserRanking[]>([])
  const [rankingToday, setRankingToday] = useState<UserRanking[]>([])

  const { mutate: findAllTriggers } = useFindAllTrigger(
    (data) => {
      const now = new Date();

      const formatted: ExtendedTrigger[] = data.map((t) => {
        const created = t.createdAt ? new Date(t.createdAt) : null;
        const durationMinutes = typeof t.duration === "number" ? t.duration : 0;
        const expiration = created
          ? new Date(created.getTime() + durationMinutes * 60_000)
          : null;
        const diffSec = expiration
          ? Math.max(0, Math.floor((expiration.getTime() - now.getTime()) / 1000))
          : 0;

        const positive = t.votes ? t.votes.filter((v) => v.vote === true).length : 0;
        const negative = t.votes ? t.votes.filter((v) => v.vote === false).length : 0;

        const userVote = t.votes?.find((v) => v.userId === userData?.id);
        const hasVoted = userVote ? (userVote.vote ? "up" : "down") : undefined;

        return {
          ...t,
          isOpen: !!expiration && diffSec > 0,
          timeLeft: diffSec,
          hasVoted,
          positiveVotes: positive,
          negativeVotes: negative,
        };
      });

      // 🔥 Ordenação: abertas primeiro (maior tempo), encerradas depois
      const sorted = formatted.sort((a, b) => {
        if (a.isOpen && !b.isOpen) return -1; // abertos antes
        if (!a.isOpen && b.isOpen) return 1;  // encerrados depois
        if (a.isOpen && b.isOpen) return b.timeLeft - a.timeLeft; // maior tempo primeiro
        return 0;
      });

      setTriggers(sorted);
      calculateRankings(sorted);
    },
    (error) => {
      console.log(error);
      toast.error(error.response?.data?.message || `Erro ao carregar Triggers.`, {
        className: "text-red-500 font-semibold",
      });
    }
  );


  function handleFindAllTriggers() {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 7) // 7 dias atrás
    findAllTriggers({ startDate: start, endDate: end });
  }

  const { mutate: voteTrigger } = useVoteTrigger(
  () => {
    toast.success(`Seu voto foi registrado com sucesso!`);
    handleFindAllTriggers();
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao registrar voto.`, {
      className: "text-red-500 font-semibold"
    });
  });

  useEffect(() => {
    handleFindAllTriggers();
  }, [])

  // atualização do tempo restante
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggers((prev) =>
        prev.map((t) => {
          if (t.isOpen && t.timeLeft > 0) {
            const newTime = t.timeLeft - 1
            return {
              ...t,
              timeLeft: newTime,
              isOpen: newTime > 0,
            }
          }
          return t
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVote = (id: string, type: "up" | "down") => {
    setTriggers((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.hasVoted && t.isOpen) {
          return {
            ...t,
            hasVoted: type,
            positiveVotes: type === "up" ? (t.positiveVotes ?? 0) + 1 : t.positiveVotes,
            negativeVotes: type === "down" ? (t.negativeVotes ?? 0) + 1 : t.negativeVotes,
          }
        }
        return t
      })
    )

    voteTrigger({ triggerId: id, userId: userData?.id!, vote: type === "up" });
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }

  const calculateRankings = (triggers: ExtendedTrigger[]) => {
    // Apenas gatilhos finalizados e aprovados
    const validTriggers = triggers.filter(
      (t) => !t.isOpen && (t.positiveVotes > t.negativeVotes)
    );

    const weeklyCount: Record<string, number> = {};
    const todayCount: Record<string, number> = {};

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    validTriggers.forEach((t) => {
      const author = t.author;
      if (!author) return;

      const created = new Date(t.createdAt!);

      // Contagem semanal
      weeklyCount[author.id] = (weeklyCount[author.id] || 0) + 1;

      // Contagem do dia
      if (created >= todayStart) {
        todayCount[author.id] = (todayCount[author.id] || 0) + 1;
      }
    });

    const makeRanking = (counts: Record<string, number>): UserRanking[] =>
      Object.entries(counts)
        .map(([id, triggersCount], index) => {
          const user = validTriggers.find((t) => t.author?.id === id)?.author;
          return {
            id,
            name: user?.name || "Desconhecido",
            triggersCount,
            icon:
              index === 0
                ? Trophy
                : index === 1
                ? Medal
                : index === 2
                ? Award
                : Bookmark,
          };
        })
        .sort((a, b) => b.triggersCount - a.triggersCount);

    setRanking(makeRanking(weeklyCount));
    setRankingToday(makeRanking(todayCount));
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card de Votação */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Votações de Gatilhos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-100 min-h-[480px]">
            {triggers.length > 0 ? 
              triggers.map((trigger) => (
                <div
                  key={trigger.id}
                  className={`border mt-4 mb-4 rounded-xl p-4 flex flex-col gap-2 shadow-sm ${
                    trigger.isOpen ? "" : "bg-gray-100"
                  }`}
                >
                  <p className="font-medium">“{trigger.phrase}”</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Autor: {trigger.author?.name}</span>
                    <span>Proposto por: {trigger.proposer?.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {trigger.isOpen ? (
                      <span>{formatTime(trigger.timeLeft)} restantes</span>
                    ) : (
                      <span className="text-red-500">Encerrado</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      A Favor: {trigger.positiveVotes ?? 0} | Contra: {trigger.negativeVotes ?? 0}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={trigger.hasVoted === "up" ? "default" : "outline"}
                        onClick={() => handleVote(trigger.id!, "up")}
                        disabled={!!trigger.hasVoted || !trigger.isOpen}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" /> A Favor
                      </Button>
                      <Button
                        size="sm"
                        variant={trigger.hasVoted === "down" ? "default" : "outline"}
                        onClick={() => handleVote(trigger.id!, "down")}
                        disabled={!!trigger.hasVoted || !trigger.isOpen}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" /> Contra
                      </Button>
                    </div>
                  </div>
                </div>
              )) 
              :
              <span className="text-gray-400 text-sm">Nenhuma Trigger ainda lançada...</span>
            }
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Card de Ranking */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <Label>De hoje</Label>
            {rankingToday.length > 0 ?
              rankingToday.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">#{index + 1}</span>
                    <user.icon
                      className={
                        user.icon === Trophy
                          ? "text-yellow-400"
                          : user.icon === Medal
                          ? "text-slate-400"
                          : user.icon === Award
                          ? "text-red-400"
                          : "text-indigo-400"
                      }
                    />
                    <span className="text-sm text-muted-foreground">{user.triggersCount} gatilhos</span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              ))
              :
              <span className="text-gray-400 text-sm">Nenhuma Trigger em ranking ainda...</span>
            }
          </div>

          <div className="flex flex-col gap-4">
            <Label>Da semana</Label>
            {ranking.length > 0 ?
              ranking.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">#{index + 1}</span>
                    <user.icon
                      className={
                        user.icon === Trophy
                          ? "text-yellow-400"
                          : user.icon === Medal
                          ? "text-slate-400"
                          : user.icon === Award
                          ? "text-red-400"
                          : "text-indigo-400"
                      }
                    />
                    <span className="text-sm text-muted-foreground">{user.triggersCount} gatilhos</span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              ))
              :
              <span className="text-gray-400 text-sm">Nenhuma Trigger em ranking ainda...</span>
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
