import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreateTrigger, useFindAllTrigger, useUpdateTrigger } from "@/hooks/trigger/trigger.hook"
import type { TriggerModel } from "@/models/trigger/trigger.model"
import { toast } from "sonner"
import type { UserModel } from "@/models/user/user-model"
import { useFindAll } from "@/hooks/user/use-user"
import { useAuth } from "@/hooks/auth/use-auth"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TriggerForm = {
  phrase: string
  authorId: string
  duration: number
}

export default function TriggerRegisterPage() {
  const { userData } = useAuth()

  const [form, setForm] = useState<TriggerForm>({
    phrase: "",
    authorId: "",
    duration: 30,
  })
  const [triggers, setTriggers] = useState<TriggerModel[]>([])
  const [users, setUsers] = useState<UserModel[]>([])

  const { mutate: findAllUsers } = useFindAll(
    (data) => setUsers(data),
    (error) => {
      console.log(error)
      toast.error(error.response?.data?.message || `Erro ao carregar usuários.`, {
        className: "text-red-500 font-semibold"
      })
    }
  )

  const { mutate: findAllTriggers } = useFindAllTrigger(
    (data) => {
      setTriggers(data)
    },
    (error) => {
      console.log(error)
      toast.error(error.response?.data?.message || `Erro ao carregar gatilhos.`, {
        className: "text-red-500 font-semibold"
      })
    }
  )

  const { mutate: createTrigger } = useCreateTrigger(
    () => {
      toast.success(`Trigger registrado com sucesso!`)
      handleFindAllTriggers()
    },
    (error) => {
      console.log(error)
      toast.error(error.response?.data?.message || `Erro ao registrar Trigger.`, {
        className: "text-red-500 font-semibold"
      })
    }
  )

  const { mutate: updateTrigger } = useUpdateTrigger(
    () => {
      toast.success(`Trigger removido com sucesso!`)
      handleFindAllTriggers()
    },
    (error) => {
      console.log(error)
      toast.error(error.response?.data?.message || `Erro ao remover Trigger.`, {
        className: "text-red-500 font-semibold"
      })
    }
  )

  // Buscar usuários e triggers do dia
  useEffect(() => {
    findAllUsers({})
    handleFindAllTriggers()
  }, [])

  const handleFindAllTriggers = () => {
    const today = new Date()
    const startDate = new Date(today)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(23, 59, 59, 999)

    findAllTriggers({ startDate, endDate })
  }

  const handleChange = (field: keyof TriggerForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phrase.trim() || !form.authorId.trim()) return

    createTrigger({
      duration: form.duration,
      phrase: form.phrase,
      authorId: form.authorId,
      proposerId: userData?.id!,
    })

    setForm({ phrase: "", authorId: "", duration: 30 })
  }

  const isClosed = (createdAt: string | Date, duration: number) => {
    const start = new Date(createdAt)
    const end = new Date(start.getTime() + duration * 60000)
    return new Date() > end
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card de Registro */}
      <Card>
        <CardHeader>
          <CardTitle>Registrar Gatilho</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phrase">Frase</Label>
              <Textarea
                id="phrase"
                placeholder="Digite a frase provocativa..."
                value={form.phrase}
                onChange={(e) => handleChange("phrase", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="author">Autor</Label>
                <Select
                  value={form.authorId}
                  onValueChange={(value) => handleChange("authorId", value)}
                >
                  <SelectTrigger id="author" className=" w-full">
                    <SelectValue placeholder="Selecione um autor" />
                  </SelectTrigger>
                  <SelectContent >
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="proposer">Proposto por</Label>
                <Input
                  id="proposer"
                  value={userData?.name || ""}
                  disabled
                />
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duração (min)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => handleChange("duration", Number(e.target.value))}
              />
            </div> */}

            <Button type="submit" variant="ghost" className="w-full text-white bg-[#4f52ff]">
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Card de Gatilhos Registrados */}
      <Card>
        <CardHeader>
          <CardTitle>Gatilhos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {triggers.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Nenhuma Trigger registrada hoje.
              </p>
            ) : (
              <div className="space-y-3">
                {triggers.map((t) => {
                  const closed = isClosed(t.createdAt!, t.duration!)
                  return (
                    <div
                      key={t.id}
                      className="border rounded-xl p-3 shadow-sm flex flex-col gap-2"
                    >
                      <p className="font-medium">“{t.phrase}”</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Autor: {t.author?.name}</span>
                        <span>Proposto por: {t.proposer?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-semibold ${closed ? "text-red-500" : "text-green-500"}`}>
                          {closed ? "Fechada" : "Aberta"}
                        </span>
                        {userData?.id === t.proposer?.id && !closed && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateTrigger({ id: t.id! })}
                          >
                            Excluir
                          </Button>
                        )}
                      </div>
                      <span className="text-xs text-blue-500">
                        Duração: {t.duration} min
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
