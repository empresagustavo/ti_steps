import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useFindAllSnacks, useFindAllSnacksStats } from "@/hooks/snack/snack.hook"
import type { SnackModel, SnackStats } from "@/models/snack/snack.model"
import { useEffect, useState } from "react"
import { toast } from "sonner"

// ==== Types ====
export type SnackType = "BREAKFAST" | "AFTERNOON"

export default function SnackPage() {

    const [snacks, setSnacks] = useState<SnackModel[]>([])
    const [snacksStats, setSnacksStats] = useState<SnackStats>()

    const { mutate: findAllStacks } = useFindAllSnacks(
        (data) => setSnacks(data),
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao carregar os Lanches.`, {
                className: "text-red-500 font-semibold"})
        }
    );

    const { mutate: findAllStacksStats } = useFindAllSnacksStats(
        (data) => setSnacksStats(data),
        (error) => {
            toast.error(error.response?.data?.message || `Erro ao carregar os Status dos Lanches.`, {
                className: "text-red-500 font-semibold"})
        }
    )


    function reloadSnacks(){
        const startDate = new Date(new Date().setDate(- 30));
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(new Date().setDate(60));
        endDate.setHours(23, 59, 59, 999);

        findAllStacks({ startDate: startDate, endDate: endDate });
    }

    useEffect(() => {

        const startDate = new Date(new Date().setDate(- 30));
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(new Date().setDate(60));
        endDate.setHours(23, 59, 59, 999);

        reloadSnacks();
        findAllStacksStats({ startDate: startDate, endDate: endDate });

        const interval = setInterval(()=>{
            reloadSnacks();
            findAllStacksStats({ startDate: startDate, endDate: endDate });
        }, 5000);

        return () => clearInterval(interval);
    }, [])


  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Agrupador 1 - Rankings */}
      <Card>
        <CardHeader>
            <CardTitle>Rankings do Lanche - Ultimos 30 dias</CardTitle>
            <CardDescription>Resumo dos rankings organizados</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
            {/* Ranking Fome Zero */}
            <Card>
                <CardHeader>
                    <CardTitle>Fome Zero</CardTitle>
                    <CardDescription>Quem mais pagou lanches</CardDescription>
                </CardHeader>
                <CardContent>
                    {snacksStats?.hungerZeroRanking.map((f, idx) => (
                        <div key={idx} className="flex justify-between border-b py-1">
                            <span>{f.user}</span>
                            <Badge>{f.count}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Ranking Caloteiros */}
            <Card>
                <CardHeader>
                    <CardTitle>Caloteiros</CardTitle>
                    <CardDescription>Quem mais deixou de pagar</CardDescription>
                </CardHeader>
                <CardContent>
                    {snacksStats?.freeloaderRanking.map((c, idx) => (
                        <div key={idx} className="flex justify-between border-b py-1">
                            <span>{c.user}</span>
                            <Badge variant="destructive">{c.count}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Ranking Ô Merenda */}
            <Card>
                <CardHeader>
                    <CardTitle>Ô Merenda</CardTitle>
                    <CardDescription>Quem mais pagou lanche da tarde</CardDescription>
                </CardHeader>
                <CardContent>
                    {snacksStats?.afternoonSnackRanking.map((m, idx) => (
                        <div key={idx} className="flex justify-between border-b py-1">
                            <span>{m.user}</span>
                            <Badge>{m.count}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Ranking Promessas */}
            <Card>
                <CardHeader>
                    <CardTitle>À espera de uma Merenda</CardTitle>
                    <CardDescription>Quem prometeu mas não pagou ainda</CardDescription>
                </CardHeader>
                <CardContent>
                    {snacksStats?.promisedSnackRanking.map((p, idx) => (
                        <div key={idx} className="flex justify-between border-b py-1">
                            <span>{p.user}</span>
                            <Badge variant="outline">{p.count}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </CardContent>
      </Card>

      {/* Agrupador 2 - Registros */}
      <Card>
        <CardHeader>
            <CardTitle>Registros de Lanches - Hoje</CardTitle>
            <CardDescription>Todos os registros detalhados</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
            {snacks.map((snack) => {
                return (
                    <Card key={snack.id} className="p-2">
                        <CardHeader>
                            <CardTitle className="text-sm">{snack.user?.name}</CardTitle>
                            <CardDescription className="flex justify-between text-xs">
                                <span>{snack.type === "BREAKFAST" ? "Café da manhã" : "Lanche da tarde"}</span>
                                <span>{format(snack.date!, "dd/MM/yyyy", { locale: ptBR })}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            {snack.isPromised && <Badge variant="outline">Promessa</Badge>}
                            <Badge variant={snack.isPaid ? "default" : "destructive"}>
                                {snack.isPaid ? "Pago" : "Não Pago"}
                            </Badge>
                        </CardContent>
                    </Card>
                )
            })}
        </CardContent>
      </Card>
    </div>
  )
}
