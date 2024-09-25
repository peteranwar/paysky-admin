import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "react-query";

import { toast } from "react-toastify";

// Material UI Components
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import LoadingButton from '@mui/lab/LoadingButton';

import ProductAddEdit from "../../components/products/ProductAddEdit";
import ProductHeader from "../../components/products/ProductHeader";
import Loader from "../../components/shared/Loader";
import ProductsApi from "../../services/products.api";

const ProductDetails = () => {
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const [loadingDelete, setLoadingDelete] = useState(false)

    // Get Product
    const { data: productData, isLoading: isProductLoading, isFetching: isProductFetching} = useQuery(
        [`product-${id}`, id],
        () =>
            ProductsApi.getProductById(id),
        {
            enabled: true,
            // onSuccess: data => {},
            select: data => {
                return data;
            },
        }
    );

    // For Delete Product
    async function handleDeleteProduct() {
        setLoadingDelete(true);

        await ProductsApi.deleteProduct(id).then(() => {
            toast.success('Deleted Successfully');
            navigate('/products')
        }).catch(error => {
            toast.error(error?.response?.data ?? 'Something went wrong!');
        }).finally(() => {
            setLoadingDelete(false);
        })
    }

    return (
        <Container>
            <Box display='flex' alignItems={{xs:'start', md:'center'}} justifyContent='space-between' flexDirection={{xs:'column', md: 'row'}}  mb={4}>
                <ProductHeader title="Product Details" />

                <LoadingButton disabled={(isProductLoading || isProductFetching)} loading={loadingDelete} type='button' variant='contained' onClick={handleDeleteProduct}
                    sx={{
                        bgcolor: '#ff0000d7',
                        px: { xs: 3, md: 4 },
                        '&:hover': {
                            bgcolor: '#ff0000',
                        }
                    }}>
                    Delete
                </LoadingButton>
            </Box>
            {/* Loading case */}
            {(isProductLoading || isProductFetching) && <Loader />}

            {productData && <ProductAddEdit id={id} productData={productData} />}
        </Container>
    )
}

export default ProductDetails