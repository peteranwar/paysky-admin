import PropTypes from 'prop-types';

import { useRef, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

// Material UI Components
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

// React Hook Form & YUP Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


import CustomInput from "../controls/custom-input";
import CustomSelect from "../controls/custom-select";
import ImageMain from "../shared/ImageMain";

import ProductsApi from "../../services/products.api";

const ProductAddEdit = ({ id, productData }) => {
  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null);


  // Get Categories
  const { data: categoriesData } = useQuery(
    ['categoriesData'],
    () =>
      ProductsApi.getCategories(),
    {
      enabled: true,
      // onSuccess: data => {},
      select: data => {
        return data;
      },
    }
  );

  const schema = yup
    .object({
      title: yup.string().required('This field is required'),
      price: yup.number().test('len', 'Must not be more 8 characters', val => val.toString().length < 8).typeError('kindly provide a valid number').required('This field is required'),
      description: yup.string().required('This field is required'),
      category: yup.object().required('This field is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const values = watch();


  useEffect(() => {
    if (productData) {
      reset({
        title: productData.title ?? '',
        price: productData.price ?? '',
        description: productData.description ?? '',
        category: productData.category ? { label: productData.category, value: productData.category } : {},
        image: productData.image ?? '',
      });
    }
  }, [productData, reset])


  const onSubmit = async (data) => {
    // In Case Editing
    setLoading(true);
    if (productData) {
      await ProductsApi.updateProduct(id, data).then(() => {
        toast.success('Updated Successfully');
      }).catch(error => {
        toast.error(error?.response?.data ?? 'Something went wrong!');
      }).finally(() => {
        setLoading(false);
      })
    } else {
      // In Case Adding
      await ProductsApi.addProduct(data).then(() => {
        reset({});
        toast.success('Added Successfully');
      }).catch(error => {
        toast.error(error?.response?.data ?? 'Something went wrong!');
      }).finally(() => {
        setLoading(false);
      })
    }
  };

  const handleSelectCategory = value => {
    reset({
      ...values,
      category: value,
    });
  };


  const openUploader = () => {
    inputRef.current.click();
  };

  const uploadImage = async (e) => {
    const imageBlob = URL.createObjectURL(e.target.files[0]);
    reset({
      ...values,
      image: imageBlob,
    });
  };


  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Box
            component='form'
            noValidate
            autocomplete='off'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={{ xs: 2, md: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInput
                  hasBorder={true}
                  register={register}
                  name='title'
                  errors={errors}
                  placeholder="Product Title"
                  label="Title"
                  type='string'
                  id='title'
                  autocomplete='off'
                  value={values.title}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInput
                  hasBorder={true}
                  register={register}
                  name='price'
                  errors={errors}
                  placeholder="Product Price"
                  label="Price"
                  type='number'
                  id='price'
                  autocomplete='off'
                  value={values.price}
                  labelEnd='EGP'
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomSelect
                  label='Category'
                  id='category'
                  array={categoriesData?.map(cate => ({ value: cate, label: cate }))} // Categories Data
                  placeholder='Product Category'
                  errors={errors}
                  errorsName={errors?.category}
                  valueName={values?.category}
                  handleChange={(e, value) => {
                    handleSelectCategory(value);
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomInput
                  hasBorder={true}
                  register={register}
                  name='description'
                  errors={errors}
                  placeholder="Product Description"
                  label="Description"
                  type='textarea'
                  id='description'
                  autocomplete='off'
                  otherProps={{
                    multiline: true,
                    rows: 8,
                  }}
                />
              </Grid>

              <Grid >
                <FormLabel sx={{
                  display: 'flex',
                  marginBottom: '10px', fontWeight: '700', color: "#292D32",
                  fontSize: { xs: '15px', md: '18px' }
                }}>Product Image
                </FormLabel>
                <Box display='flex' alignItems='center' justifyContent='space-between' p={{ xs: 1, lg: 1.5 }} sx={{ border: '1px solid #D7D7D7', borderRadius: '16px' }}>
                  {/* IN CASE OF EDITING, WE WILL SHOW THE IMAGE */}
                  {values.image && <ImageMain srcUrl={values.image}
                    sx={{ objectFit: 'cover', width: { xs: '150px', md: '200px' }, height: { xs: '75px', md: '100px' }, borderRadius: '16px' }} />}

                  {/* IN CASE OF ADDING, WE WILL SHOW A BLANK IMAGE */}
                  {!values.image && <Box display='flex' alignItems='center' justifyContent='center' sx={{
                    border: '1px solid #D7D7D7', width: { xs: '150px', md: '200px' }, height: { xs: '75px', md: '100px' },
                    borderRadius: '16px'
                  }}>
                    <Typography variant="body1" color="text.secondary">Product Image</Typography>
                  </Box>}

                  <Box my={1} display='flex' gap={2}>
                    <input accept="image/jpeg, image/png" type="file" hidden ref={inputRef} onChange={(e) => uploadImage(e)} />
                    <Button variant='outlined' size='small' onClick={openUploader} sx={{ px: { xs: 3, md: 4 } }}>
                      {productData ? 'Change' : 'Upload'}
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid size={12} sx={{ my: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <LoadingButton loading={loading} variant='contained' type="submit" sx={{ px: { xs: 3, md: 4 } }}>
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

ProductAddEdit.propTypes = {
  id: PropTypes.string,
  productData: PropTypes.object,
}

export default ProductAddEdit