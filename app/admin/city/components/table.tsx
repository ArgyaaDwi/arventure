"use client";
import React, { useState, useEffect } from "react";
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi";
import { rem } from "@mantine/core";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconX, IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
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
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;
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
      notifications.show({
        title: "Succes!",
        message: "Successfully deleted province!",
        icon: checkIcon,
        color: "green",
      });
      const updatedProvinces = provinces.filter(
        (province) => province.id !== provinceId
      );
      setProvinces(updatedProvinces);
    } catch (err: any) {
      notifications.show({
        title: "Error",
        message: "Failed to delete province!",
        icon: xIcon,
        color: "red",
      });
      console.error("Error delete data:", err);
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

                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="text-red-500 hover:text-red-700">
                      <BiSolidTrashAlt size={25} />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this province?{" "}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProvince(province.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
