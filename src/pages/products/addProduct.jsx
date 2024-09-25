// Material UI Components
import Container from "@mui/material/Container"

import ProductHeader from "../../components/products/ProductHeader";
import ProductAddEdit from "../../components/products/ProductAddEdit";

const AddProduct = () => {

    return (
        <Container>
            <ProductHeader title="Add Product" />

            <ProductAddEdit />
        </Container>
    )
}

export default AddProduct