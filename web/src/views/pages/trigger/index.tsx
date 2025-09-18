import { useState, useEffect, type JSX, type ForwardRefExoticComponent, type RefAttributes } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Clock, Trophy, type LucideProps, Medal, Award, Bookmark } from "lucide-react"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

type Trigger = {
  id: number
  phrase: string
  points: number
  isOpen: boolean
  timeLeft: number // em segundos
  author: string
  proposer: string
  hasVoted?: "up" | "down"
}

type UserRanking = {
  id: number
  name: string
  triggersCount: number
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export default function TriggerPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([
    {
      id: 1,
      phrase: "Nem todo mundo nasceu pra isso né...",
      points: 12,
      isOpen: true,
      timeLeft: 3600,
      author: "Ana",
      proposer: "Carlos",
    },
    {
      id: 2,
      phrase: "Tem gente que só fala, mas não faz...",
      points: -3,
      isOpen: true,
      timeLeft: 1800,
      author: "Pedro",
      proposer: "João",
    },
    {
      id: 3,
      phrase: "Ah, mas fulano faria melhor...",
      points: 8,
      isOpen: false,
      timeLeft: 0,
      author: "Marina",
      proposer: "Lucas",
    },
  ])

  const [ranking] = useState<UserRanking[]>([
    { id: 1, name: "Ana", triggersCount: 5, icon: Trophy },
    { id: 2, name: "Pedro", triggersCount: 4, icon: Medal },
    { id: 3, name: "Marina", triggersCount: 3, icon: Award },
    { id: 4, name: "Carlos", triggersCount: 2, icon: Bookmark },
  ]);

  const [rankingToday] = useState<UserRanking[]>([
    { id: 1, name: "Ana", triggersCount: 2, icon: Trophy },
    { id: 2, name: "Pedro", triggersCount: 1, icon: Medal },
    { id: 3, name: "Marina", triggersCount: 1, icon: Award },
    { id: 4, name: "Carlos", triggersCount: 1, icon: Bookmark},
  ])

  // Contagem regressiva do cooldown
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggers((prev) =>
        prev.map((t) =>
          t.isOpen && t.timeLeft > 0
            ? { ...t, timeLeft: t.timeLeft - 1 }
            : t
        )
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVote = (id: number, type: "up" | "down") => {
    setTriggers((prev) =>
      prev.map((t) => {
        if (t.id === id && !t.hasVoted && t.isOpen) {
          return {
            ...t,
            hasVoted: type,
            points: type === "up" ? t.points + 1 : t.points - 1,
          }
        }
        return t
      })
    )
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card de Votação */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Votações de Gatilhos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {triggers.map((trigger) => (
            <div
              
              key={trigger.id}
              className={`border rounded-xl p-4 flex flex-col gap-2 shadow-sm ${trigger.isOpen ?'' : 'bg-gray-100'}`}
            >
              <p className="font-medium">“{trigger.phrase}”</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Autor: {trigger.author}</span>
                <span>Proposto por: {trigger.proposer}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                {trigger.isOpen
                  ? <span>{formatTime(trigger.timeLeft)} restantes</span>
                  : <span className="text-red-500">Encerrado</span>}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold">Pontos: {trigger.points}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={trigger.hasVoted === "up" ? "default" : "outline"}
                    onClick={() => handleVote(trigger.id, "up")}
                    disabled={!!trigger.hasVoted || !trigger.isOpen}
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" /> A Favor
                  </Button>
                  <Button
                    size="sm"
                    variant={trigger.hasVoted === "down" ? "default" : "outline"}
                    onClick={() => handleVote(trigger.id, "down")}
                    disabled={!!trigger.hasVoted || !trigger.isOpen}
                  >
                    <ThumbsDown className="w-4 h-4 mr-1" /> Contra
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Card de Ranking */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div className="flex flex-col gap-4">
            <Label>De hoje</Label>

            {rankingToday.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-3">
                    {<user.icon className={
                      user.icon.displayName === 'Trophy' ? 'text-yellow-400' : 
                      user.icon.displayName === 'Medal' ? 'text-slate-400' : 
                      user.icon.displayName === 'Award' ? 'text-red-400' : 
                      user.icon.displayName === 'Bookmark' ? 'text-indigo-400' : ''}/> }
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.triggersCount} gatilhos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{user.name}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Label>Da semana</Label>

            {ranking.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-3">
                    {<user.icon className={
                      user.icon.displayName === 'Trophy' ? 'text-yellow-400' : 
                      user.icon.displayName === 'Medal' ? 'text-slate-400' : 
                      user.icon.displayName === 'Award' ? 'text-red-400' : 
                      user.icon.displayName === 'Bookmark' ? 'text-indigo-400' : ''}/> }
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.triggersCount} gatilhos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{user.name}</span>
                </div>
              </div>
            ))}
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}
