import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { UserModel } from "@/models/user/user-model"
import { useFindAll } from "@/hooks/user/use-user"
import { toast } from "sonner"
import type { SnackModel } from "@/models/snack/snack.model"
import { useCreateSnack, useFindAllSnacks, useUpdateSnack } from "@/hooks/snack/snack.hook"

// ==== Types ====
export type SnackType = "BREAKFAST" | "AFTERNOON"

export default function RegisterSnackPage() {
    const [snacks, setSnacks] = useState<SnackModel[]>([])
    const [selectedUser, setSelectedUser] = useState<string>("")
    const [snackType, setSnackType] = useState<SnackType>("BREAKFAST")
    const [date, setDate] = useState<Date>(new Date())
    const [promised, setPromised] = useState(false)
    const [users, setUsers] = useState<UserModel[]>([])

    const { mutate: findAllUsers } = useFindAll(
        (data) => setUsers(data),
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao carregar usuários.`, {
                className: "text-red-500 font-semibold"})
        }
    )

    const { mutate: findAllSnacks } = useFindAllSnacks(
        (data) => setSnacks(data),
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao carregar os Lanches.`, {
                className: "text-red-500 font-semibold"})
        }
    )

    const { mutate: createSnack } = useCreateSnack(
        () => { 
            toast.success(`Lanche lançado com sucesso!`)
            reloadSnacks();
        },
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao criar o Lanche.`, {
                className: "text-red-500 font-semibold"})
        }
    )

    const { mutate: updateSnack } = useUpdateSnack(
        () => { 
            toast.success(`Lanche autalizado com sucesso!`)
            reloadSnacks();
        },
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao autalizar o Lanche.`, {
                className: "text-red-500 font-semibold"})
        }
    )


    function reloadSnacks(){
        const today = new Date();
        const startDate = new Date(today);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);

        findAllSnacks({ startDate: startDate, endDate: endDate });
    }

    useEffect(() => {

        findAllUsers({});
        reloadSnacks()

        const interval = setInterval(()=>{
            reloadSnacks()
        }, 5000);

        return () => clearInterval(interval);
    }, [])

    const addSnack = () => {
        if (!selectedUser || !date) return

        const newRecord: SnackModel = {
            userId: selectedUser,
            type: snackType,
            date,
            isPromised: promised,
            isPaid: false, // se for promessa começa como não pago
        }

        setSelectedUser("")

        createSnack(newRecord);
    }

    const togglePaid = (id: string) => {

        updateSnack({ id, isPaid: true });
    }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Registrar Lanche</CardTitle>
          <CardDescription>Selecione o usuário, tipo de lanche e data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usuário */}
          <div>
            <Label>Usuário</Label>
            <Select onValueChange={(v) => setSelectedUser(v)} value={selectedUser}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                {users.map(u => (
                  <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de lanche */}
          <div>
            <Label>Tipo de Lanche</Label>
            <Select onValueChange={(v) => setSnackType(v as SnackType)} value={snackType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de lanche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BREAKFAST">Café da manhã</SelectItem>
                <SelectItem value="AFTERNOON">Lanche da tarde</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data */}
          <div className="flex flex-col space-y-2">
            <Label>Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Promessa */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={promised}
              onChange={(e) => setPromised(e.target.checked)}
              id="promised"
            />
            <Label htmlFor="promised">Prometeu o lanche?</Label>
          </div>

          <Button onClick={addSnack}>Registrar</Button>
        </CardContent>
      </Card>

      {/* Lista de registros */}
      <Card>
        <CardHeader>
          <CardTitle>Lanches Registrados</CardTitle>
          <CardDescription>Gerencie os registros já feitos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {snacks.map((snack) => {
            return (
              <div key={snack.id} className="border p-2 rounded flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold">{snack.user?.name}</span>
                  <span className="text-sm">{snack.type === "BREAKFAST" ? "Café da manhã" : "Lanche da tarde"}</span>
                  <span className="text-xs">{format(snack.date!, "dd/MM/yyyy", { locale: ptBR })}</span>
                  {snack.isPromised && <span className="text-xs text-yellow-600">Promessa</span>}
                </div>
                <Button
                  variant={snack.isPaid ? "default" : "outline"}
                  onClick={() => togglePaid(snack.id!)}
                >
                  {snack.isPaid ? "Pago" : "Não Pago"}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
