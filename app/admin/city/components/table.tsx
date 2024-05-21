"use client";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { fetchAllProvinces, deleteProvince } from "@/utils/supabase/city/crud";
export default function ProvinceTable() {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProvinces = async () => {
      try {
        setLoading(true);
        console.log("Fetching provinces...");
        const data = await fetchAllProvinces();
        console.log("Fetched provinces data:", data);
        setProvinces(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching provinces:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    getProvinces();
  }, []);

  const handleEditProvince = (provinceId: string) => {
    router.push(`/admin/city/edit?provinceId=${provinceId}`);
  };
  const handleDeleteProvince = async (provinceId: string) => {
    try {
      await deleteProvince(provinceId);
      // Refresh data setelah menghapus provinsi
      const updatedProvinces = provinces.filter(
        (province) => province.id !== provinceId
      );
      setProvinces(updatedProvinces);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="border border-gray-300 text-black text-center">
              ID
            </TableHead>
            <TableHead className="border border-gray-300 text-black text-center">
              Name
            </TableHead>
            <TableHead className="border border-gray-300 text-black text-center">
              Actions
            </TableHead>
          
          
            {/* Add more headers as necessary */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {provinces.map((province, index) => (
            <TableRow
              key={province.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <TableCell className="font-medium border border-gray-300 text-center">
                {province.id}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {province.provinceName}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                <button
                  className="text-black hover:text-blue-700 mr-5"
                  onClick={() => handleEditProvince(province.id)}
                >
                  <BiEdit size={25} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteProvince(province.id)}
                >
                  <BiSolidTrashAlt size={25}/>
                </button>
              </TableCell>
              {/* Add more cells as necessary */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
