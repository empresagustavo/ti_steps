import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/auth/use-auth"
import { toast } from "sonner"

// Tipos de dados
interface NavMain {
  id: string
  title: string
  url: string
  parentId: string | null
  items?: NavMain[]
}

interface User {
  id: string
  name: string
  email: string
  navMain: NavMain[]
}

export default function UserManagement() {
  const { isAdmin } = useAuth()
  if (!isAdmin) {
    toast.warning("Você não tem permissão para acessar essa página!")
    return
  }

  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [menus, setMenus] = useState<NavMain[]>([])
  const [selectedMenuToAdd, setSelectedMenuToAdd] = useState<string>("")

  // Buscar usuários
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then(setUsers)
  }, [])

  // Buscar menus
  useEffect(() => {
    fetch("http://localhost:3000/api/navs-main")
      .then((res) => res.json())
      .then(setMenus)
  }, [])

  const handleSelectUser = (user: User) => {
    console.log(user)
    setSelectedUser(user)
    setSelectedMenuToAdd("")
  }

  const handleAddMenu = () => {
    if (!selectedUser || !selectedMenuToAdd) return

    const menu = menus.find((m) => m.id === selectedMenuToAdd)
    if (!menu) return

    const updatedUser = {
      ...selectedUser,
      navMain: [...selectedUser.navMain, menu],
    }

    setSelectedUser(updatedUser)
    setSelectedMenuToAdd("")
  }

  const handleRemoveMenu = (menuId: string) => {
    if (!selectedUser) return

    const updatedUser = {
      ...selectedUser,
      navMain: selectedUser.navMain.filter((m) => m.id !== menuId),
    }

    setSelectedUser(updatedUser)
  }

  const handleSave = async () => {
    if (!selectedUser) return

    await fetch(`http://localhost:3000/api/users/${selectedUser.id}/menus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        navMainIds: selectedUser.navMain.map((m) => m.id),
      }),
    })

    toast.success("Menus atualizados com sucesso!")
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
            <CardTitle>Menus de {selectedUser.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Menus atuais */}
            <div className="flex flex-wrap gap-2">
              {selectedUser.navMain.length > 0 ? (
                selectedUser.navMain.map((menu) => (
                  <Badge
                    key={menu.id}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveMenu(menu.id)}
                  >
                    {menu.title} ✕
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
                        !selectedUser.navMain.some(
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
              <Button onClick={handleAddMenu}>Adicionar</Button>
            </div>

            {/* Salvar alterações */}
            <div className="flex justify-end">
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
