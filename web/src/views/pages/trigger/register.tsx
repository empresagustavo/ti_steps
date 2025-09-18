import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

type TriggerForm = {
  phrase: string
  author: string
  proposer: string
  duration: number // em minutos
}

type Trigger = {
  id: number
  phrase: string
  author: string
  proposer: string
  duration: number
}

export default function TriggerRegisterPage() {
  const [form, setForm] = useState<TriggerForm>({
    phrase: "",
    author: "",
    proposer: "",
    duration: 30,
  })
  const [triggers, setTriggers] = useState<Trigger[]>([])

  const handleChange = (field: keyof TriggerForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.phrase.trim() || !form.author.trim() || !form.proposer.trim()) return

    const newTrigger: Trigger = {
      id: triggers.length + 1,
      phrase: form.phrase,
      author: form.author,
      proposer: form.proposer,
      duration: form.duration,
    }

    setTriggers((prev) => [...prev, newTrigger])
    setForm({ phrase: "", author: "", proposer: "", duration: 30 })
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
                <Input
                  id="author"
                  placeholder="Ex: Ana"
                  value={form.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="proposer">Proposto por</Label>
                <Input
                  id="proposer"
                  placeholder="Ex: Carlos"
                  value={form.proposer}
                  onChange={(e) => handleChange("proposer", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duração (min)</Label>
              <Input
                id="duration"
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => handleChange("duration", Number(e.target.value))}
              />
            </div>

            <Button type="submit" variant="ghost" className="w-full text-white bg-[#4f52ff]">Registrar</Button>
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
                Nenhum gatilho registrado ainda.
              </p>
            ) : (
              <div className="space-y-3">
                {triggers.map((t) => (
                  <div
                    key={t.id}
                    className="border rounded-xl p-3 shadow-sm flex flex-col gap-1"
                  >
                    <p className="font-medium">“{t.phrase}”</p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Autor: {t.author}</span>
                      <span>Proposto por: {t.proposer}</span>
                    </div>
                    <span className="text-xs text-blue-500">
                      Duração: {t.duration} min
                    </span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
