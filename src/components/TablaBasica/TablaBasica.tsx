import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google";
import { JSX } from "react";

const redhat_700 = Red_Hat_Display({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});
const redhat_500 = Red_Hat_Display({
  weight: "500",
  subsets: ["latin"],
  preload: true,
});
const zenmaru_700 = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

type EncabezadoObjeto = {
  label: string;
  key: string;
  align?: "left" | "right" | "center";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  icono?: (valor: any, fila: any, index: number) => JSX.Element;
};

type Encabezado = string | EncabezadoObjeto;

interface TablaBasicaProps {
  titulo?: string;
  fecha?: string | null;
  encabezados?: Encabezado[];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  datos?: any[];
  className?: string;
}

export function TablaBasica({
  titulo = "Título de la Tabla",
  fecha = "",
  encabezados = [],
  datos = [],
  className = "",
}: TablaBasicaProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className="flex justify-between items-center">
        <h2
          className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B]`}
        >
          {titulo}
        </h2>
        <h3
          className={`${redhat_500.className} text-xl font-semibold text-[#5B5B5B]`}
        >
          {fecha}
        </h3>
      </div>

      <hr className="border-t-2 border-[#5B5B5B] w-full" />

      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent">
            {encabezados.map((encabezado, index) => {
              const esObjeto = typeof encabezado === "object";
              const align = esObjeto ? encabezado.align : undefined;
              const label = esObjeto ? encabezado.label : encabezado;

              return (
                <TableHead
                  key={index}
                  className={`${
                    zenmaru_700.className
                  } text-lg text-[#5B5B5B] border-none ${
                    align === "right"
                      ? "text-right"
                      : align === "center"
                      ? "text-center"
                      : ""
                  }`}
                >
                  {label}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.map((fila, filaIndex) => (
            <TableRow
              key={filaIndex}
              className="border-none hover:bg-slate-100 transition-colors"
            >
              {encabezados.map((encabezado, colIndex) => {
                const esObjeto = typeof encabezado === "object";
                const key = esObjeto
                  ? encabezado.key || encabezado.label
                  : encabezado;
                const align = esObjeto ? encabezado.align : undefined;
                const icono = esObjeto ? encabezado.icono : undefined;
                const valor =
                  typeof fila === "object" ? fila[key] : fila[colIndex];

                return (
                  <TableCell
                    key={colIndex}
                    className={`${
                      zenmaru_700.className
                    } text-md text-[#5B5B5B] border-none ${
                      align === "right"
                        ? "text-right"
                        : align === "center"
                        ? "text-center"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        align === "right"
                          ? "justify-end"
                          : align === "center"
                          ? "justify-center"
                          : "justify-start"
                      }`}
                    >
                      {icono && (
                        <div className="flex-shrink-0">
                          {icono(valor, fila, filaIndex)}
                        </div>
                      )}
                      {!icono && <span>{valor}</span>}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
