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
  fetchAllUsers, fetchViewUsers
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
  const [selectedMountainId, setSelectedMountainId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
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

    getUsers();
  }, []);
//   useEffect(() => {
//     const updateMountainsWithProvinceName = async () => {
//       const updatedMountains = await Promise.all(
//         mountains.map(async (mountain) => {
//           const province = await fetchProvinceById(mountain.idProvince);
//           return {
//             ...mountain,
//             provinceName: province.provinceName,
//           };
//         })
//       );
//       setMountains(updatedMountains);
//     };

//     if (mountains.length > 0) {
//       updateMountainsWithProvinceName();
//     }
//   }, [mountains]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const handleEditMountain = (id: string) => {
//     router.push(`/admin/mountain/edit?id=${id}`);
//   };

//   const handleDeleteMountain = async () => {
//     try {
//       if (selectedMountainId) {
//         await deleteMountain(selectedMountainId);
//         const updatedMountains = mountains.filter(
//           (mountain) => mountain.id !== selectedMountainId
//         );
//         setMountains(updatedMountains);
//         setIsAlertDialogOpen(false);
//         setSelectedMountainId(null);
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

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
            <TableHead className="border border-gray-300 text-black text-center">
              Email
            </TableHead>
            {/* <TableHead className="border border-gray-300 text-black text-center">
              Image
            </TableHead> */}
    <TableHead className="border border-gray-300 text-black text-center">
              Actions
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
              {/* <TableCell className="border border-gray-300 text-center">
                <Image
                  src={mountain.image}
                  alt={mountain.name}
                  width={100}
                  height={100}
                />
              </TableCell> */}
              <TableCell className="border border-gray-300 text-center">
                <button
                  className="text-black hover:text-blue-700 mr-5"
                  // onClick={() => handleEditMountain(mountain.id)}
                >
                  <BiEdit size={25}/>
                </button>
                {/* <AlertDialog>
                  <AlertDialogTrigger
                    asChild
                  > */}
                    <button
                      className="text-red-500 hover:text-red-700"
                      // onClick={() => {
                      //   setSelectedMountainId(mountain.id);
                      //   setIsAlertDialogOpen(true);
                      // }}
                    >
                      <BiSolidTrashAlt size={25}/>
                    </button>
                  {/* </AlertDialogTrigger>
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
                        <AlertDialogAction
                          onClick={handleDeleteMountain}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
