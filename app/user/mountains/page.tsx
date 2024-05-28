// "use client";
// import React from "react";
// import { ArticleCard } from "../components/BadgeCard";
// import { Grid } from "@mantine/core";
// import classes from "../css/mountains.module.css";

// const page = () => {
//   return (
//     <div className={classes.gridoi}>
//       <Grid>
//         <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//           <ArticleCard />
//         </Grid.Col>
//         <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//         </Grid.Col>
//       </Grid>
//     </div>
//   );
// };

// export default page;
'use client';
import { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import { ArticleCard } from "../components/BadgeCard";  // Sesuaikan path jika berbeda
import { fetchAllMountains } from "@/utils/supabase/mountain/crud";
import classes from "../css/mountains.module.css";  // Sesuaikan path jika berbeda

const Page = () => {
  const [mountains, setMountains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </div>
    );
  }  if (error) return <p>Error: {error}</p>;

  return (
    <div className={classes.gridoi}>
      <Grid>
        {mountains.map((mountain) => (
          <Grid.Col key={mountain.id} span={{ base: 12, md: 6, lg: 3 }}>
            <ArticleCard mountain={mountain} />
            
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Page;
