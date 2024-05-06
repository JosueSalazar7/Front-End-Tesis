import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Mensaje from "./Alertas/Mensaje";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    canPreviousPage,
    canNextPage,
} from "react-table";
import { useNavigate } from "react-router-dom";

const TablaPasajeros = () => {
    const navigate = useNavigate();
    const [pasajeros, setPasajeros] = useState([]);

    const listarPasajeros = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/lista-pasajeros`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            if (respuesta.status === 200) {
                setPasajeros(respuesta.data);

            } else {
                console.error("Error al obtener los pasajeros:", respuesta.data.error);
            }
        } catch (error) {
            console.error("Error de red al obtener los pasajeros:", error);
        }
    };

    useEffect(() => {
        listarPasajeros();
    }, []);

    const data = React.useMemo(() => pasajeros, [pasajeros]);

    const columns = React.useMemo(
        () => [
            {
                Header: "N°",
                accessor: (row, index) => index + 1,
            },
            {
                Header: "Nombre",
                accessor: "pasajeroNombre",
            },
            {
                Header: "Apellido",
                accessor: "pasajeroApellido",
            },
            {
                Header: "Correo",
                accessor: "correo",
            },
            {
                Header: "Teléfono",
                accessor: "phone",
            },
            {
                Header: "Rol",
                accessor: "rol",
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize },
        page,
        gotoPage,
        setPageSize,
        previousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

    return (
        <div className="mt-4">
            {pasajeros.length === 0 ? (
                <Mensaje tipo={"active"}>{"No existen pasajeros registrados"}</Mensaje>
            ) : (
                <>
                    <table {...getTableProps()} className="w-full mt-5 table-auto shadow-lg bg-white">
                        <thead className="bg-gray-800 text-slate-400">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()} className="p-2">
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="border-b hover:bg-gray-300 text-center">
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination flex items-center justify-center mt-4">
                        <button
                            className="px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {"<<"}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {"<"}
                        </button>{" "}
                        <span className="mr-2">
                            Página{" "}
                            <strong>
                                {pageIndex + 1} de {page.length}
                            </strong>
                        </span>
                        <span className="mr-2">
                            | Ir a la página:{" "}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                className="w-16 px-2 py-1 border rounded-md text-center"
                            />
                        </span>{" "}
                        <select
                            className="px-2 py-1 border rounded-md mr-2"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 15, 20, 25, 30].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Mostrar {pageSize}
                                </option>
                            ))}
                        </select>
                        <button
                            className="px-3 py-1 border rounded-md mr-2 hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {">"}
                        </button>{" "}
                        <button
                            className="px-3 py-1 border rounded-md hover:bg-gray-400 hover:text-white bg-gray-800 text-slate-400"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {">>"}
                        </button>{" "}
                    </div>
                </>
            )}
        </div>
    );
};

export default TablaPasajeros;
