import React, { useState, useEffect } from "react";
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
  fetchAllUsers,
  fetchViewUsers,
  //   deleteMountain,
} from "@/utils/supabase/user/crud";
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

export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedMountainId, setSelectedMountainId] = useState<string | null>(
    null
  );
  const router = useRouter();

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await fetchAllUsers();
  //       setUsers(data);
  //       setLoading(false);
  //     } catch (err: any) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   getUsers();
  // }, []);
  useEffect(() => {
    const getDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchViewUsers();
        setUsers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getDetail();
  }, []);

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
              Citys
            </TableHead>
            <TableHead className="border border-gray-300 text-black text-center">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((users, index) => (
            <TableRow
              key={users.id}
              className={index % 2 === 0 ? "bg-gray-100" : ""}
            >
              <TableCell className="font-medium border border-gray-300 text-center">
                {users.id}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {users.name}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {users.city}
              </TableCell>
              <TableCell className="border border-gray-300 text-center">
                {users.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
