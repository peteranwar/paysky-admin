import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// Material UI Components
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton';

// React Hook Form & YUP Validation
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import CustomInput from '../components/controls/custom-input';
import { addUserData } from '../redux/reducer/user.reducer';
import AuthApiEndpoints from '../services/auth.api';


const Login = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Validation Schema
    const schema = yup
        .object({
            email: yup.string('Please follow the email formaT').email().required('This field is required'),
            password: yup
                .string()
                .required('Please Enter your password')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
        })
        .required();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });
    // Login Submit
    const onSubmit = async (data) => {

        setLoading(true)

        await AuthApiEndpoints.login({
            // username: data.email,
            // password: data.password
            username: "mor_2314",
            password: "83r5^_"
        }).then(res => {
            dispatch(addUserData({ email: data.email }));
            Cookies.set('token', res.token, { expires: 7 });
            navigate('/');
            reset()
            toast.success('Login Successfully');
        }).catch(error => {
            console.log('error', error)
            toast.error(error?.response?.data ?? 'Something went wrong!');
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <Container>
            <Grid container spacing={2} justifyContent="center">
                <Grid size={{xs:12, sm: 10, md: 8, lg: 6}}>
                    <Box textAlign='center' mt={{ xs: 3, md: 5, lg: 8 }} mb={{ xs: 3, md: 4, lg: 5 }}>
                        <Typography variant="h1">
                            Login Page
                        </Typography>
                        <Typography variant="h6" color='text.secondary' component='h2'>
                            Enter your email and password to login
                        </Typography>
                    </Box>
                    <Box
                        component='form'
                        noValidate
                        autocomplete='off'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Box mb={{ xs: 2.5, md: 3.25 }} width='100%'>
                            <CustomInput
                                hasBorder={true}
                                register={register}
                                name='email'
                                errors={errors}
                                placeholder="Enter Your Email"
                                label="Email"
                                type='email'
                                id='email'
                                autocomplete='off'
                            />
                        </Box>

                        <Box mb={{ xs: 2.5, md: 3.25 }} width='100%'>
                            <CustomInput
                                hasBorder={true}
                                register={register}
                                name='password'
                                errors={errors}
                                placeholder="Enter Your Password"
                                label="Password"
                                type='password'
                                id='password'
                            />
                        </Box>

                        {/*  */}
                        <LoadingButton loading={loading} type='submit' variant='contained' fullWidth>
                            Submit
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login