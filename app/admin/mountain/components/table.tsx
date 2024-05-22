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
import Image from "next/image";
import {
  fetchAllMountains,
  deleteMountain,
} from "@/utils/supabase/mountain/crud";
import { fetchProvinceById } from "@/utils/supabase/city/crud";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function MountainTable() {
  const [mountains, setMountains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedMountainId, setSelectedMountainId] = useState<string | null>(
    null
  );
  const router = useRouter();

  const getMountains = async () => {
    try {
      setLoading(true);
      const data = await fetchAllMountains();
      setMountains(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMountains();
  }, []);

  useEffect(() => {
    const updateMountainsWithProvinceName = async () => {
      const updatedMountains = await Promise.all(
        mountains.map(async (mountain) => {
          const province = await fetchProvinceById(mountain.idProvince);
          return {
            ...mountain,
            provinceName: province.provinceName,
          };
        })
      );
      setMountains(updatedMountains);
    };

    if (mountains.length > 0) {
      updateMountainsWithProvinceName();
    }
  }, [mountains]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEditMountain = (id: string) => {
    router.push(`/admin/mountain/edit?id=${id}`);
  };

  const handleDeleteMountain = async () => {
    try {
      if (selectedMountainId) {
        await deleteMountain(selectedMountainId);
        const updatedMountains = mountains.filter(
          (mountain) => mountain.id !== selectedMountainId
        );
        setMountains(updatedMountains);
        setIsAlertDialogOpen(false);
        setSelectedMountainId(null);
      }

      window.location.reload
      console.log("diroute sini");
    } catch (err: any) {
      setError(err.message);
    }
  };

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
              Province
            </TableHead>
            {/* <TableHead className="border border-gray-300 text-black text-center">
              Description
            </TableHead> */}
            <TableHead className="border border-gray-300 text-black text-center">
              Image
            </TableHead>
            <TableHead className="border border-gray-300 text-black text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mountains.map((mountain, index) => (
            <TableRow
              key={mountain.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <TableCell className="font-medium border border-gray-300 text-center">
                {mountain.id}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {mountain.name}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {mountain.provinceName}
              </TableCell>
              {/* <TableCell className="border border-gray-300 text-center">
                {mountain.description}
              </TableCell> */}
              <TableCell className="border border-gray-300 text-center">
                <Image
                  src={mountain.image}
                  alt={mountain.name}
                  width={100}
                  height={100}
                />
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                <button
                  className="text-black hover:text-blue-700 mr-5"
                  onClick={() => handleEditMountain(mountain.id)}
                >
                  <BiEdit size={25} />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setSelectedMountainId(mountain.id);
                        setIsAlertDialogOpen(true);
                      }}
                    >
                      <BiSolidTrashAlt size={25} />
                    </button>
                  </AlertDialogTrigger>
                  {isAlertDialogOpen && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure want to delete this mountain?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsAlertDialogOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteMountain}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
