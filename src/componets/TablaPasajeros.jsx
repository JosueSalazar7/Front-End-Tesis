import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import Mensaje from "./Alertas/Mensaje";
import {
    useTable,
    useGlobalFilter,
    usePagination,
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
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
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
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Buscar por nombre, apellido o correo..."
                                className="w-full px-4 py-2 border rounded-md pr-10"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-5.2-5.2"
                                    />
                                    <circle cx="10" cy="10" r="7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <table {...getTableProps()} className="w-full mt-5 table-auto shadow-lg bg-white">
                        <thead className="bg-gray-800 text-slate-400">
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()} className="p-3">
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="border-b hover:bg-gray-300 text-center">
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()} className="p-3">{cell.render("Cell")}</td>;
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
                                {pageIndex + 1} de {pageCount}
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
