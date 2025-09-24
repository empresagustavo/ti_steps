import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useCreateNavAccess, useFindAll, useRemoveNavAccess } from "@/hooks/user/use-user"
import type { UserModel } from "@/models/user/user-model"
import type { NavMainModel } from "@/models/user/nav-main-model"
import { X } from "lucide-react"
import { useFindAllNavs } from "@/hooks/nav/nav.hook"


export default function UserManagement() {

  const [users, setUsers] = useState<UserModel[]>([])
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null)
  const [menus, setMenus] = useState<NavMainModel[]>([])
  const [selectedMenuToAdd, setSelectedMenuToAdd] = useState<string>("")


  const { mutate: findAllUsers } = useFindAll(
  (data) => {
    
    setUsers(data);

    if(!selectedUser) return;
    const user = data.find(user => user.id === selectedUser.id);
    
    if(!user) return;

    setSelectedUser(user);
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao carregar usuários.`, {
      className: "text-red-500 font-semibold"
    });
  },);

  const { mutate: createNavAccess } = useCreateNavAccess(
  () => {
    toast.success(`Acesso(s) liberado(s) para ${selectedUser?.name}`);
    findAllUsers({})
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao liberar acesso.`, {
      className: "text-red-500 font-semibold"
    });
  },);

  const { mutate: removeNavAccess } = useRemoveNavAccess(
  () => {
    toast.success(`Acesso(s) removido(s) de ${selectedUser?.name}`);
    findAllUsers({})
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao remover acesso.`, {
      className: "text-red-500 font-semibold"
    });
  },);

  const { mutate: findAllNavs } = useFindAllNavs(
  (data) => {
    setMenus(data);
  },
  (error) => {
    console.log(error)
    toast.error(error.response?.data?.message || `Erro ao remover acesso.`, {
      className: "text-red-500 font-semibold"
    });
  },);

    // Buscar usuários/navs
  useEffect(() => {
    findAllUsers({});
    findAllNavs({});
  }, [])


  const handleSelectUser = (user: UserModel) => {
    console.log(user)
    setSelectedUser(user)
    setSelectedMenuToAdd("")
  }

  const handleAddMenu = () => {
    if (!selectedUser || !selectedMenuToAdd) return

    const menu = menus.find((m) => m.id === selectedMenuToAdd)
    if (!menu) return

    setSelectedMenuToAdd("")
    createNavAccess({ navMainId: menu.id, userId: selectedUser.id });
  }

  const handleRemoveMenu = (menuId: string) => {

    if (!selectedUser) return

    removeNavAccess({navMainId: menuId, userId: selectedUser.id});
  }


  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Lista de usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`cursor-pointer ${
                    selectedUser?.id === user.id ? "bg-muted" : ""
                  }`}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detalhes do usuário selecionado */}
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle>
              Menus liberados - <span className="text-blue-700">{selectedUser.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Menus atuais */}
            <div className="flex flex-wrap gap-2">
              {selectedUser?.navMain?.length! > 0 ? (
                selectedUser?.navMain?.map((menu) => (
                  <Badge
                    key={menu.id}
                    variant="secondary"
                  >
                    {menu.title}
                    <Badge 
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveMenu(menu.id)}>
                        <X className="text-red-400 " />
                      </Badge>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhum menu vinculado
                </p>
              )}
            </div>

            {/* Adicionar novo menu */}
            <div className="flex gap-2 items-center">
              <Select
                value={selectedMenuToAdd}
                onValueChange={setSelectedMenuToAdd}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um menu" />
                </SelectTrigger>
                <SelectContent>
                  {menus
                    .filter(
                      (m) =>
                        !selectedUser?.navMain?.some(
                          (userMenu) => userMenu.id === m.id
                        )
                    )
                    .map((menu) => (
                      <SelectItem key={menu.id} value={menu.id}>
                        {menu.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button className="cursor-pointer" onClick={handleAddMenu}>Adicionar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
