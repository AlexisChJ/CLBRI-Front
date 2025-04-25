import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const distribuciones = [
    {
      usuario: "Usuario 1",
      fecha: "24 de Abril, 2025",
    },
    {
      usuario: "Usuario 2",
      fecha: "23 de Abril, 2025",
    },
    {
      usuario: "Usuario 3",
      fecha: "23 de Abril, 2025",
    },
    {
      usuario: "Usuario 4",
      fecha: "22 de Abril, 2025",
    },
    {
      usuario: "Usuario 5",
      fecha: "20 de Abril, 2025",
    },
  ]
  
  export function TablaBasica() {
    return (
      <div>
        {/* Title above the table */}
        <h2 className="text-xl font-semibold mb-4">Distribución Reciente</h2>
  
        {/* Your table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Usuario</TableHead>
              <TableHead className="text-right">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distribuciones.map((usuario) => (
              <TableRow key={usuario.usuario}>
                <TableCell className="font-medium">{usuario.usuario}</TableCell>
                <TableCell className="text-right">{usuario.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  