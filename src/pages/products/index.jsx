import { useState, useMemo } from "react"
import { Link } from "react-router-dom"

import { useQuery } from 'react-query'

// Material UI Components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Skeleton from "@mui/material/Skeleton"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"

import ProductCard from "../../components/products/ProductCard"
import ProductCardLoading from "../../components/products/ProductCardLoading"
import CustomTabPanel from "../../components/shared/CustomTabPanel"
import ProductsApi from "../../services/products.api"
import { tabBtnStyle } from "./styles"
import ErrorComponent from "../../components/shared/ErrorComponent"

import { useDebounce } from '../../hooks/useDebounce'
// Page Size
const LIMIT = 6;

// Total Products -- Should comes from Backend
const PRODUCTS_TOTAL = 20;


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Products = () => {
    const [pageLimit, setPageLimit] = useState(LIMIT);
    const [ranking, setRanking] = useState('asc');
    const [tabValue, setTabValue] = useState(0);
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearchValue = useDebounce(searchValue, 1000);

    const { data: productsData, isLoading: isProductsLoading, isFetching: isProductsFetching, error: productsError, isError: isProductsError } = useQuery(
        ['productsData', pageLimit, ranking, tabValue],
        () =>
            ProductsApi.getProducts({
                limit: pageLimit,
                sort: ranking,
                category: tabValue === 0 ? null : categoriesData[tabValue].id
            }),
        {
            // enabled: true,
            // onSuccess: data => {},
            select: data => {
                return data;
            },
        }
    );


    // Get Categories
    const { data: categoriesData, isLoading: isCategoriesLoading, isFetching: isCategoriesFetching } = useQuery(
        ['categoriesData'],
        () =>
            ProductsApi.getCategories(),
        {
            enabled: true,
            // onSuccess: data => { },
            select: data => {
                return [
                    { id: 'all', text: 'All Categories' },
                    ...data.map(category => ({ id: category, text: category }))
                ];
            },
        }
    );


    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        setPageLimit(LIMIT);
    };


    /// sort change function
    const handleSortChange = event => {
        setRanking(event.target.value);
    };


    const filteredData = useMemo(() => productsData?.length > 0 ? productsData.filter(item => {
        return item.title.toLowerCase().includes(debouncedSearchValue.toLowerCase());
    }) : [], [productsData, debouncedSearchValue]);


    return (
        <Container>
            <Box display='flex' justifyContent='space-between' flexDirection={{ xs: 'column', md: 'row' }} mb={{ xs: 3, md: 5 }}>
                <Typography variant="h1" my={1}>
                    All Products
                </Typography>
                <Box display='flex' alignItems='center' justifyContent='space-between' gap={1} my={1}>
                    <FormControl
                        sx={{
                            minWidth: '120px',
                            width: 'max-content',
                        }}
                        disabled={isProductsLoading || isProductsFetching}
                    >
                        <InputLabel id='demo-simple-select-label'>
                            Sorting
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            value={ranking}
                            onChange={handleSortChange}
                            autoWidth
                            label='ranking'
                            sx={{
                                height: '44px',
                            }}
                        >
                            <MenuItem value='desc'>Descending</MenuItem>
                            <MenuItem value='asc'>Ascending </MenuItem>
                        </Select>
                    </FormControl>

                    <Button component={Link} sx={{ px: { xs: 1.5, md: 2 }, '&:hover': { color: 'common.white' } }} variant="contained" color="primary" to='/products/add'>
                        Add New Product
                    </Button>
                </Box>
            </Box>

            {/* Categories */}
            <Grid container sx={{ mb: { xs: 3, md: 5 } }}>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        justifyContent='center'
                        aria-label='basic tabs example'
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                overflow: 'auto',
                                margin: '0',
                                '::-webkit-scrollbar': {
                                    width: '0'
                                }
                            },
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            }
                        }}
                    >
                        {/* Skeleton loader for Categories */}
                        {(isCategoriesLoading || isCategoriesFetching) ? [1, 2, 3, 4].map(index => (
                            <Skeleton
                                key={index}
                                animation='wave'
                                variant='rectangular'
                                width='140px'
                                sx={{ height: { xs: '40px', sm: '48px' }, borderRadius: '24px', mx: 1 }}
                            />
                        )) : categoriesData.map((tab, index) => <Tab
                            key={tab.id}
                            sx={{
                                '&.MuiButtonBase-root': {
                                    ...tabBtnStyle
                                }
                            }}
                            label={tab.text}
                            {...a11yProps(index)}
                        />)}
                    </Tabs>
                </Grid>
            </Grid>

            {/* Search Field */}
            <Grid justifyContent='end' container sx={{ mb: { xs: 2, md: 3 } }}>
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <TextField
                        placeholder='Search Products'
                        sx={{
                            backgroundColor: 'transparent',
                            height: '50px',
                            '& fieldset, .MuiInputBase-root': {
                                height: '50px',
                                borderRadius: '20px',
                            }
                        }}
                        variant='outlined'
                        // disabled={disabled}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type='search'
                    />
                </Grid>
            </Grid>

            {categoriesData?.map((tab, index) =>
                <CustomTabPanel value={tabValue} index={index} key={tab.id}>
                    <Grid container spacing={2}>
                        {/* In case of loading */}
                        {(isProductsLoading || isProductsFetching) && [1, 2, 3, 4].map(indx => (
                            <Grid item xs={12} md={6} lg={4} key={indx}>
                                <ProductCardLoading key={indx} />
                            </Grid>
                        ))}

                        {/* In case of Error */}
                        {isProductsError && <ErrorComponent error={productsError} />}

                        {/* Show Products */}
                        {!(isProductsLoading || isProductsFetching) && <>
                            {filteredData?.length === 0 && searchValue?.length > 0 ?
                                <Typography variant="h3" color='error' mx='auto' my={{ xs: 3, md: 4 }}>No Data Found!</Typography>
                                :
                                (filteredData?.length > 0 ? filteredData : productsData)?.map(product => (
                                    <Grid item xs={12} md={6} lg={4} key={product.id}>
                                        <ProductCard product={product} />
                                    </Grid>
                                ))
                            }
                        </>}

                        {/* Hide View More btn in Case the total number big than the limit and in case showing specific category */}
                        {((pageLimit < PRODUCTS_TOTAL) && tabValue === 0 && !searchValue) && <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', my: { xs: 2, md: 4 } }}>
                            <LoadingButton loading={isProductsFetching} variant="contained" color="primary" onClick={() => setPageLimit(pageLimit + LIMIT)}>
                                View More
                            </LoadingButton>
                        </Grid>}
                    </Grid>
                </CustomTabPanel>)}
        </Container>
    )
}

export default Products