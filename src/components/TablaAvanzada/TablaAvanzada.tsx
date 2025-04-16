"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const TablaAvanzada = () => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-sm border">
                <Table className="w-full">
                    <TableCaption>Faltan datos por deslegar de CLBRI.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-blue-200 text-blue-800">
                            <TableHead className="w-[100px]">Datos1</TableHead>
                            <TableHead>Datos2</TableHead>
                            <TableHead>Datos3</TableHead>
                            <TableHead>Datos4</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">PH</TableCell>
                            <TableCell>PH</TableCell>
                            <TableCell>PH</TableCell>
                            <TableCell>PH</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">PH</TableCell>
                            <TableCell>PH</TableCell>
                            <TableCell>PH</TableCell>
                            <TableCell>PH</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                        <PaginationLink href="#">2</PaginationLink>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default TablaAvanzada;
