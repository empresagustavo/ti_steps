import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import unauthorized from "../../../assets/unauthorized.png";

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md text-center p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">
            403 - Ooooopa...!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>

          {/* Imagem ilustrativa */}
          <img
            src={unauthorized}
            alt="Unauthorized"
            className="mx-auto"
          />

          {/* Botões */}
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" className="cursor-pointer" onClick={() => navigate(-1)}>
              Voltar
            </Button>
            <Button className="cursor-pointer" onClick={() => navigate("/")}>
              Ir para o Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
