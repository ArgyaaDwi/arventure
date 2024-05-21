
// "use client";
// import {
//   Card,
//   Group,
//   Text,
//   Menu,
//   ActionIcon,
//   Image,
//   SimpleGrid,
//   rem,
// } from "@mantine/core";
// import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
// import {
//   TextInput,
//   NativeSelect,
//   MantineProvider,
//   createTheme,
//   Input,
//   Select,
//   FileInput,
// } from "@mantine/core";
// import classes from "./Demo.module.css";
// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   updateMountain,
//   fetchMountainById,
// } from "@/utils/supabase/mountain/crud"; // Import fungsi untuk mengambil data gunung
// import { fetchAllProvinces } from "@/utils/supabase/city/crud";

// export default function EditMountainPage({searchParams}:{searchParams:any})=>{ {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const [name, setMountainName] = useState("");
//   const [idProvince, setIdProvinceName] = useState("");
//   const [image, setImage] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const [provinces, setProvinces] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedProvince, setSelectedProvince] = useState<any>("");
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const provinceData = await fetchAllProvinces();
//         const formattedProvinceData = provinceData.map((province) => ({
//           value: province.id,
//           label: province.provinceName,
//         }));
//         setProvinces(formattedProvinceData);

//         if (id) {
//           const mountainData = await fetchMountainById(id);
//           console.log("Fetched mountain data:", mountainData); // Log the fetched mountain data

//           setMountainName(mountainData.name);
//           setSelectedProvince({
//             value: mountainData.idProvince,
//             label: mountainData.provinceName,
//           });
//           setImage(mountainData.image);
//         }

//         setLoading(false);
//       } catch (error) {
//         // setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       let imageUrl = image;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", "arventure");

//         const res = await fetch(
//           "https://api.cloudinary.com/v1_1/dpr1oftgx/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to upload image");
//         }

//         const data = await res.json();
//         imageUrl = data.secure_url;
//       }

//       await updateMountain(id!, name, selectedProvince.value, imageUrl);
//       // Menampilkan pesan sukses menggunakan alert
//       alert("Mountain updated successfully!");
//       // Mengarahkan pengguna kembali ke halaman /admin/mountain
//       window.location.href = "/admin/mountain";
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <Card withBorder shadow="sm" radius="md">
//         <Card.Section withBorder inheritPadding py="xs">
//           <Group justify="space-between">
//             <Text fw={700} size="xl">
//               Edit Mountain
//             </Text>
//           </Group>
//         </Card.Section>
//         <br />
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Mountain Name:</label>
//             <TextInput
//               id="name"
//               value={name}
//               onChange={(e) => setMountainName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="idProvince">Province:</label>
//             <Select
//               data={provinces}
//               value={selectedProvince.value}
//               onChange={(_value, option) => setSelectedProvince(option)}
//             />
//           </div>
//           <div>
//             <FileInput
//               accept="image/png,image/jpeg"
//               label="Upload Image"
//               placeholder="Upload Image"
//               value={file}
//               onChange={setFile}
//             />
//           </div>
//           <br />
//           {error && <p>Error: {error}</p>}
//           <button
//             type="button"
//             className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
//             onClick={() => (window.location.href = "/admin/mountain")}
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             className="bg-black text-white rounded-md p-2 my-3 hover:bg-gray-500"
//           >
//             Update
//           </button>
//         </form>
//       </Card>
//     </div>
//   );
// };}
"use client";
import {
  Card,
  Group,
  Text,
  TextInput,
  Select,
  FileInput,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateMountain,
  fetchMountainById,
} from "@/utils/supabase/mountain/crud";
import { fetchAllProvinces } from "@/utils/supabase/city/crud";

interface EditMountainPageProps {
  searchParams: { id: string };
}

const EditMountainPage: React.FC<EditMountainPageProps> = ({ searchParams }) => {
  const router = useRouter();
  const id = searchParams.id;

  const [name, setMountainName] = useState("");
  const [idProvince, setIdProvinceName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const provinceData = await fetchAllProvinces();
        const formattedProvinceData = provinceData.map((province) => ({
          value: province.id,
          label: province.provinceName,
        }));
        setProvinces(formattedProvinceData);

        if (id) {
          const mountainData = await fetchMountainById(id);
          console.log("Fetched mountain data:", mountainData);

          setMountainName(mountainData.name);
          setSelectedProvince({
            value: mountainData.idProvince,
            label: mountainData.provinceName,
          });
          setImage(mountainData.image);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = image;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "arventure");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dpr1oftgx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await res.json();
        imageUrl = data.secure_url;
      }

      await updateMountain(id, name, selectedProvince.value, imageUrl);
      alert("Mountain updated successfully!");
      router.push("/admin/mountain");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Card withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Edit Mountain
            </Text>
          </Group>
        </Card.Section>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Mountain Name:</label>
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setMountainName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="idProvince">Province:</label>
            <Select
              data={provinces}
              value={selectedProvince.value}
              onChange={(value) => setSelectedProvince(value)}
            />
          </div>
          <div>
            <FileInput
              accept="image/png,image/jpeg"
              label="Upload Image"
              placeholder="Upload Image"
              value={file}
              onChange={setFile}
            />
          </div>
          <br />
          {error && <p>Error: {error}</p>}
          <button
            type="button"
            className="bg-white text-black border border-black rounded-md px-4 py-2 my-3 mr-2"
            onClick={() => router.push("/admin/mountain")}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-black text-white rounded-md p-2 my-3 hover:bg-gray-500"
          >
            Update
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EditMountainPage;
