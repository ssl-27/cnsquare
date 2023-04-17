import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import Catalogue from "./Catalogue";
import ProductFilter from "./ProductFilter";
import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function CNShop() {
  const data = useLoaderData() as Product[];
  const { userInfo } = useContext(UserContext);
  const userTier = userInfo === null ? 0 : userInfo.tier;
  const preprocess = (data: Product[]) => {
    return data.map((v) => {
      const { id, name, type, brand, imageUrl, popularity, prices } = v;
      const price = prices[userTier].price;
      return {
        id,
        name,
        type,
        brand,
        imageUrl,
        popularity,
        price,
        discounted: userTier !== 0,
      };
    });
  };
  const unfiltered = preprocess(data);
  const [previewInfo, setPreviewInfo] = useState(unfiltered);
  return (
    <Container maxWidth="xl">
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "30px" }}>
        <ProductFilter
          info={unfiltered}
          setPreviewInfo={setPreviewInfo}
        ></ProductFilter>
        <Catalogue info={previewInfo}></Catalogue>
      </Box>
    </Container>
  );
}

export default CNShop;
