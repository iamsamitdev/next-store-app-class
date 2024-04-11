// Material UI Components
import { 
  Stack, 
  Typography, 
  InputAdornment, 
  Box, 
  Button, 
  Divider, 
  Alert, 
  FormControlLabel, 
  FormGroup 
} from '@mui/material'
import * as Icons from "@mui/icons-material/"

// Other Components
import { loginType } from "@/app/(auth)/types/auth"
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox"
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField"
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel"
import AuthSocialButtons from "./AuthSocialButtons"

// Next Components
import Link from "next/link"
import { useRouter } from 'next/navigation'

// React Hook Form and Yup for Form Validation
import { Controller, useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// Import authAction
import { login } from "@/app/services/actions/authAction"
import { useState } from 'react'

// Types
type User = {
  username: string
  password: string
}

export default function AuthLogin({ title, subtitle, subtext }: loginType) {
  
  // Router
  const router = useRouter()

  // Initial Values
  const initialValue: User = {
    username: "iamsamit", // iamsamit
    password: "Samit@1234" // Samit@1234
  }

  // Form Validation Schema
  const formValidateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  })

  // React Hook Form 
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  })

  // Login Status
  const [loginStatus, setLoginStatus] = useState('')

  // Handle Submit Login
  const onSubmitLogin = async (data: User) => {

    // Call Login Function
    const response: any = await login(data)
    // console.log(response)
    if (response.success) {
      // console.log("Login Success", response.data)
      setLoginStatus('success')
      router.push("/backend/dashboard")

    } else {
      setLoginStatus('error')
      console.log("Login Failed")
    }
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>
      
      {/* Login Status */}
      { loginStatus && (
        <Alert severity={loginStatus == 'success' ? 'success' : 'error' } sx={{marginTop: '20px'}}>
          <Typography variant="body2">
            {loginStatus == 'success' ? 'Login Successful' : 'Login Failed'}
          </Typography>
        </Alert>
        )
      }

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        noValidate
        autoComplete="off"
      >
        <Stack>

          <Box>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  error={(errors.username?.message ?? "") != ""}
                  // helperText={errors.username?.message?.toString()}
                  id="username"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icons.Person />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="username"
                  autoFocus
                />
              )}
            />
            {
              errors.username?.message ? (
                <Alert severity="error">{errors.username?.message}</Alert>
              ) : null
            }
          </Box>

          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  error={(errors.password?.message ?? "") != ""}
                  // helperText={errors.password?.message?.toString()}
                  id="password"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icons.Lock />
                      </InputAdornment>
                    ),
                  }}
                  type="password"
                  autoComplete="current-password"
                />
              )}
            />
            {
              errors.password?.message ? (
                <Alert severity="error">{errors.password?.message}</Alert>
              ) : null
            }
           
          </Box>

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/forgotpass"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>

        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  )
}


