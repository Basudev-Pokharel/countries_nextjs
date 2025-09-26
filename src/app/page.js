// "use client";

// import Image from "next/image";
// import Countries from "./countries/page";
// import { fetchCountries } from "@/lib/features/countries/countriesSlice";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <Countries />
//     </div>
//   );
// }

//new one just test
// Add these imports
"use client";
// import Countries from "./countries/page";
import { useRouter } from "next/navigation";
import { CardActionArea } from "@mui/material";
import Countries from "./countries/page";

// Add inside your component
const router = useRouter();

// Add this function
const handleCountryClick = (countryName) => {
  // Create URL-friendly slug
  const slug = countryName.toLowerCase().replace(/\s+/g, "-");
  router.push(`/countries/${encodeURIComponent(slug)}`);
};

// Update your Card component
<Card key={country.name.common} sx={{ width: "280px", height: "320px" }}>
  <CardActionArea onClick={() => handleCountryClick(country.name.common)}>
    <CardContent>
      <Countries />
    </CardContent>
  </CardActionArea>
</Card>;
