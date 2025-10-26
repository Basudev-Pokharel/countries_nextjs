"use client";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavourites } from "../../lib/features/favourites/favouritesSlice";
import { useAuth } from "../context/AuthContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavouriteButton from "@/components/FavouriteButton";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);

  console.log("Favourites: ", favourites);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites());
    }
  }, [user, dispatch]);

  if (authLoading || loading) {
    return <CircularProgress />;
  }

  const getCurrencies = (country) => {
    if (!country.currencies) return "N/A";
    return Object.values(country.currencies)
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  // if we have user logged in show 'Favourites page is here'
  // if we dont have user logged in show 'Please login to see your favourites'
  if (!user) {
    return <div>Please login to see your favourites</div>;
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      {favourites.length === 0 ? (
        <Typography variant="h4">No favourites found</Typography>
      ) : (
        <Grid container spacing={2}>
          {favourites.map((favourite) => {
            const country = favourite.country_name;
            let selectedCoutry = favourite.country_data;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={favourite.id}>
                <Card
                  sx={{
                    minWidth: "200px",
                    minHeight: "200px",
                    // border: "2px solid red",
                  }}
                  data-testid="country-card"
                >
                  <CardActionArea
                    onClick={() => handleCountryClick(country.name.common)}
                    data-testid="country-card-button"
                  >
                    <CardContent>
                      <Image
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                        src={favourite?.country_data?.flags?.svg}
                        alt={country}
                      />
                      <Typography variant="h5" mt={1}>
                        {country}
                      </Typography>
                      <Typography variant="body1">
                        {country.population}
                      </Typography>
                      <Typography variant="body1">
                        {country && getCurrencies(favourite.country_data)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions mt={0}>
                    <Box>
                      {/* //Just button for unfav */}
                      <FavouriteButton country={selectedCoutry} />

                      {/* Unfav ends here */}
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default FavouritesPage;
