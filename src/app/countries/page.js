"use client";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  console.log("Lis of countries:", countries);

  const getCurrency = (currency) => {
    for (let i in key) {
      // console.log(key, currency["key"]);
      <p></p>;
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap={"10px"}
    >
      {countries.map((country, idx) => {
        return (
          <Card
            key={idx}
            sx={{
              padding: "1px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <Image
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              src={country.flags.svg}
              alt={country.name.common}
            />
            <CardContent>
              <Typography variant="h6">{country.name.common}</Typography>
              <Typography variant="h8">{country.population}</Typography>
              <Typography variant="h8">
                {() => {
                  getCurrency(country.currencies);
                }}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
export default Countries;
