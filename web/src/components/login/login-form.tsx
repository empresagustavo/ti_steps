import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import authImg from "@/assets/12085707_20944201.jpg"
import createImg from "@/assets/11668754_20945760.jpg";
import { useAuth } from "@/hooks/auth/use-auth"
import { useState } from "react"
import React from "react"
import { useLogin } from "@/hooks/auth/use-login"
import { toast } from "sonner";
import { useCreate } from "@/hooks/user/use-user"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { login } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const { mutate: loginAuth } = useLogin(
  (data) => {
    toast.success(`Bem-vindo Admin ${data.name}`);
    login(data);
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao logar.`, {
      className: "text-red-500 font-semibold"
    });
  },);

  const { mutate: newUser } = useCreate(
  (data) => {
    toast.success(`Bem-vindo Admin ${data.name}`);
    login(data);
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao cadastrar.`, {
      className: "text-red-500 font-semibold"
    });
  },);


  function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    loginAuth({email: username, password});
  };

  function handleRegister(e: React.FormEvent){
    
    e.preventDefault();
    console.log(isCreate)

    newUser({email: username, password});
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={!isCreate ? handleLogin : handleRegister}>
            {!isCreate ? 
              // Login
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem vindo de volta!</h1>
                  <p className="text-muted-foreground text-balance">
                    Realise seu login para acessar os Steps do T.I.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <Button type="submit" variant="ghost" className="w-full bg-[#4547E9] text-white" onClick={() =>setIsCreate(false)}>
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    or
                  </span>
                </div>
                <Button type="button" variant="ghost" className="w-full" onClick={() =>setIsCreate(true)}>
                  Criar conta
                </Button>
              </div>
            :
              // Cadartrar
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Faça seu cadastro!</h1>
                  <p className="text-muted-foreground text-balance">
                    Se prepare! Aí vem os Steps do T.I.
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <Button type="submit" variant="ghost" className="w-full bg-[#4547E9] text-white">
                  Registrar
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    or
                  </span>
                </div>
                <Button type="button" variant="ghost" className="w-full" onClick={() =>setIsCreate(false)}>
                  Cancelar
                </Button>
              </div>
            }
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={isCreate ? createImg : authImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-white *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
