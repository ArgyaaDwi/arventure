import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
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
} from "@/components/ui/alert-dialog"; // Import sesuai dengan library yang digunakan

export default function MountainTable() {
  const [mountains, setMountains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedMountainId, setSelectedMountainId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
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
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-300">
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="border border-gray-300 text-white text-center">
              ID
            </TableHead>
            <TableHead className="border border-gray-300 text-white text-center">
              Name
            </TableHead>
            <TableHead className="border border-gray-300 text-white text-center">
              Province
            </TableHead>
            <TableHead className="border border-gray-300 text-white text-center">
              Image
            </TableHead>
            <TableHead className="border border-gray-300 text-white text-center">
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
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEditMountain(mountain.id)}
                >
                  <FaEdit />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                  >
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setSelectedMountainId(mountain.id);
                        setIsAlertDialogOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </AlertDialogTrigger>
                  {isAlertDialogOpen && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the mountain
                          and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setIsAlertDialogOpen(false)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteMountain}
                        >
                          Continue
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
