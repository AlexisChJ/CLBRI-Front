import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google"

  const redhat_700 = Red_Hat_Display({weight: "700", subsets: ['latin'], preload: true,})
  const zenmaru_700 = Zen_Maru_Gothic({weight: "700", subsets: ['latin'], preload: true,})
  
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
      <div className="mb-10">
        {/* Title above the table */}
        <h2 className={`${ redhat_700.className} text-xl font-semibold text-[#5B5B5B]` }>Distribución Reciente</h2>
        <hr className="border-t-2 border-[#5B5B5B] w-full" />
        {/* Your table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={`${ zenmaru_700.className} text-lg text-[#5B5B5B]` }>Usuario</TableHead>
              <TableHead className={`${ zenmaru_700.className} text-lg text-right text-[#5B5B5B]` }>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {distribuciones.map((usuario) => (
              <TableRow key={usuario.usuario} className="hover:bg-slate-200 transition-colors">
                <TableCell className={`${ zenmaru_700.className} text-md text-[#5B5B5B]` }>{usuario.usuario}</TableCell>
                <TableCell className={`${ zenmaru_700.className} text-md text-right text-[#5B5B5B]` }>{usuario.fecha}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  