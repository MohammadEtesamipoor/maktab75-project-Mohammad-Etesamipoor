import { GetProducts } from "apis/ApiProduct";
import { GetProductsCategory } from "apis/ApiCategory";
import { useEffect } from "react";
import { useState } from "react";
import { TableAdminPage } from "Components";
import { FaEye, FaEyeSlash, FaUserAlt, FaPlus } from "react-icons/fa";
import {DeleteButtonProduct} from 'Components/Button/DeleteButtonProduct'
import {
  Box,
  Button,
  Heading,
  ButtonGroup,
  IconButton,
  Select
} from "@chakra-ui/react";

export function AdminProductPage() {
  const [productData, setproductData] = useState([]);

  const [CategoryProductData, setCategoryProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await GetProductsCategory().then((res) => {
        setCategoryProductData(res.data);
      });
      await GetProducts().then((res) => {
        const test = res.data.filter((item) => item["category-id"] === "2");
        setproductData(res.data);
      });
    };
    fetchData();
  }, []);
  
  const handelFilter=(e)=>{
    console.log(e.target.name);
  }
  return (
    // {/* productData.length > 0 ? productData[0].count : "loadiing" */}
    <Box h="100%">
      <Box mt="20px" display="flex" justifyContent="space-between" px="4">
        <Heading color="#525261">مدیریت کالاها</Heading>
        <Select dir="ltr" w="120px" placeholder="all" >
          <option onChange={(e)=>handelFilter("option1")} value="option1">samsung</option>
          <option onChange={(e)=>handelFilter("option2")} value="option2">xiaomi</option>
          <option value="option3">nokia</option>
          <option value="option4">huawei</option>
        </Select>
        <Button rightIcon={<FaPlus />} colorScheme="teal" variant="outline">
          افزودن کالا
        </Button>
      </Box>
      {productData.length > 0 ? (
        <TableAdminPage
          listProduct={productData}
          listCategory={CategoryProductData}
        />
      ) : (
        "loading"
      )}
    </Box>
  );
}
