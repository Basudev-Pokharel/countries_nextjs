"use client";
import { fetchCountries } from "@/lib/features/countries/countriesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";
import { CardActionArea } from "@mui/material";
import FavouriteButton from "@/components/FavouriteButton";

const Countries = () => {
  const countries = useSelector((state) => state.countries.countries);
  const [filterCountries, setFilterCountries] = useState(null);
  let dispatch = useDispatch();
  const router = useRouter();
  const handleCountryClick = (countryName) => {
    const slug = countryName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/countries/${encodeURIComponent(slug)}`);
  };

  //Use effect for updating UseState vaiable filterCountries
  useEffect(() => {
    setFilterCountries(countries);
  }, [countries]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);
  // console.log("Lis of countries:", countries);

  const getCurrency = (currency) => {
    for (let i in key) {
      // console.log(key, currency["key"]);
      <p></p>;
    }
  };

  //For select implementaion
  const [select, setSelect] = useState();
  console.log(filterCountries);
  const handleChange = (e) => {
    let sortedArray = [...filterCountries];
    let type = e.target.value.toLowerCase();
    console.log(type);
    if (type == "population-asc") {
      sortedArray.sort((a, b) => a.population - b.population);
    } else if (type === "population-desc") {
      sortedArray.sort((a, b) => b.population - a.population);
    } else if (type === "name-asc") {
      sortedArray.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (type === "name-desc") {
      sortedArray.sort((a, b) => b.name.common.localeCompare(a.name.common));
    } else if (type == "area-asc") {
      sortedArray.sort((a, b) => a.area - b.area);
    } else if (type == "area-desc") {
      sortedArray.sort((a, b) => b.area - a.area);
    } else {
      setFilterCountries(sortedArray);
      return;
    }
    setFilterCountries(sortedArray);
  };

  //For sorting with region
  const handleChangeRegion = (e) => {
    let sortedArray = [...filterCountries];
    let region = e.target.value.toLowerCase();
    if (region == "none") {
      setFilterCountries(sortedArray);
      return;
    }
    const filtered = countries.filter(
      (country) => country.region.toLowerCase() === region
    );
    setFilterCountries(filtered);
  };

  //For searching with Name
  const searchFilter = (e) => {
    let searchWord = e.target.value.toLowerCase();
    let filteresSearch = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(searchWord);
    });

    setFilterCountries(filteresSearch);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      flexWrap={"wrap"}
      gap={"10px"}
      p={2}
    >
      {countries.length == 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <CircularProgress />
          <Typography variant="h3">Loading...</Typography>
        </Box>
      )}
      {filterCountries && (
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={3}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            "@media(max-width:560px)": {
              width: "100%",
              flexDirection: "column",
              "& .css-3ymxzt-MuiInputBase-root-MuiOutlinedInput-root": {
                width: "90vw",
              },
            },
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search with Name"
            variant="outlined"
            onChange={searchFilter}
          />
          <Box>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Sort By
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChange}
                value="none"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"name-asc"}>Name: Asc</MenuItem>
                <MenuItem value={"name-desc"}>Name: Desc</MenuItem>
                <MenuItem value={"population-asc"}>Population: Asc</MenuItem>
                <MenuItem value={"population-desc"}>Population: Desc</MenuItem>
                <MenuItem value={"area-asc"}>Area: Asc</MenuItem>
                <MenuItem value={"area-desc"}>Area: Desc</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                By Region
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={handleChangeRegion}
                defaultValue="none"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"asia"}>Asia</MenuItem>
                <MenuItem value={"europe"}>Europe</MenuItem>
                <MenuItem value={"americas"}>Americas</MenuItem>
                <MenuItem value={"africa"}>Africa</MenuItem>
                <MenuItem value={"oceania"}>Oceania</MenuItem>
                <MenuItem value={"antarctic"}>Antarctic</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={"10px"}
      >
        {filterCountries &&
          filterCountries.map((country, idx) => {
            return (
              <Card
                key={country.name.common}
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
                <CardActionArea
                  onClick={() => handleCountryClick(country.name.common)}
                >
                  <CardContent>
                    <Typography variant="h5">{country.name.common}</Typography>
                    <Typography variant="h6">{country.population}</Typography>
                    <Typography variant="p">
                      {() => {
                        getCurrency(country.currencies);
                      }}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};
export default Countries;
