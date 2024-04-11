"use client"
// React
import { useEffect, useState, useRef } from "react"

// Custom components
import { getAllProducts, createProduct } from "@/app/services/actions/productAction"
import { numberWithCommas, formatDate, formatDateToISOWithoutMilliseconds } from "@/app/utils/CommondUtil"

// MUI Table and related components
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material"
import { IconEye, IconEdit, IconTrash, IconPlus } from "@tabler/icons-react"

// React Hook Form and Yup for Form Validation
import { Controller, useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// Types for product get
type Product = {
  product_id: number
  category_name: string
  product_name: string
  unit_price: number
  product_picture: string
  unit_in_stock: number
  created_date: string
  modified_date: string
}

// Types for product post
type ProductPost = {
  product_name: string
  category_id: string
  unit_price: number
  unit_in_stock: number
  product_picture: string
  created_date: string
  modified_date: string
}

type Props = {}

export default function ProductsPage({}: Props) {
  
  // Read Products -----------------------------------------------------------
  // State for products
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts()
        setProducts(response)
      } catch (error) {
        console.error("An error occurred while fetching products:", error)
      }
    }
    fetchProducts()
  }, [])

  //   console.log(products)
  // -------------------------------------------------------------------------

  // Create Product ----------------------------------------------------------
  // State for dialog
  const [open, setOpen] = useState(false)

  // State for selected category
  const [category, setCategory] = useState("")

  // State for image preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const fileInputRef:any = useRef(null); // Ref for the file input

  // Example categories, replace with your actual categories
  const categories = [
    { name: "Electronics", value: "1" },
    { name: "Furniture", value: "2" },
    { name: "Clothing", value: "3" },
  ]

  // Handle dialog open
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Handle dialog close
  const handleClose = () => {
    setOpen(false)
    setImagePreviewUrl("")
  }

  // Handle file change
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
  
      reader.onloadend = () => {
        // console.log(reader.result)
        setImagePreviewUrl(reader.result); // This is now the base64 encoded data URL of the file
      }
  
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      setImagePreviewUrl(''); // Reset or clear the preview if no file is selected
    }
  }  

  // Remove image preview
  const removeImage = () => {
    // Clear the preview URL
    setImagePreviewUrl('');
    // Clear the file input value
    fileInputRef.current.value = ''
  }

  // Form Validation Schema
  const formValidateSchema: any = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required").trim(),
    unit_price: Yup.string().required("Price is required"),
    unit_in_stock: Yup.string().required("Unit in Stock is required"),
    category_id: Yup.string().required("Category is required"),
    product_picture: Yup.string().required("Product Picture Name is required"),
  })

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductPost>({
    defaultValues: {
      product_name: "",
      unit_price: 0,
      unit_in_stock: 0,
      category_id: "",
      product_picture: "",
      created_date: formatDateToISOWithoutMilliseconds(new Date()),
      modified_date: formatDateToISOWithoutMilliseconds(new Date()),
    },
    resolver: yupResolver(formValidateSchema),
  })

  // Handle Submit Product
  const onSubmitProduct = async (data: ProductPost) => {
    
    // console.log(data)

    // Form Data
    const formData: any = new FormData()

    // Append data to form data
    formData.append("product_name", data.product_name)
    formData.append("unit_price", data.unit_price.toString())
    formData.append("unit_in_stock", data.unit_in_stock.toString())
    formData.append("category_id", data.category_id)
    formData.append("product_picture", data.product_picture)
    formData.append("created_date", data.created_date)
    formData.append("modified_date", data.modified_date)

    // Append image file to form data
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0])
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Call your API to submit formData
    // Adjust the createProduct function to expect FormData
    try {
      const response = await createProduct(formData)
      console.log(response)
      handleClose(); // Close the dialog upon successful submission
    } catch (error) {
      console.error("Failed to create product:", error);
    }

  }

  // -------------------------------------------------------------------------

  return (
    <>
      <Card
        sx={{ padding: 0, border: `1px solid #eee`, borderRadius: 1 }}
        variant={"outlined"}
      >
        <CardContent sx={{ pt: "16px", pb: "0px" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant="h5">Products</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              <IconPlus size={16} /> &nbsp;Add Product
            </Button>
          </Stack>
        </CardContent>
        <Box sx={{ overflow: "auto", width: { sm: "auto" } }}>
          <Table
            aria-label="products"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Picture
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Product
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Category
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Unit
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Created
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: "100px" }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Manage
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow
                  key={product.product_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="product">
                    {product.product_id}
                  </TableCell>
                  <TableCell>
                    <img
                      src={product.product_picture}
                      alt={product.product_name}
                      style={{ width: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>${numberWithCommas(product.unit_price)}</TableCell>
                  <TableCell>{product.unit_in_stock}</TableCell>
                  <TableCell>{formatDate(product.created_date)}</TableCell>
                  <TableCell>
                    {/* Button View, Edit and Delete with Icon */}

                    <Button
                      variant="contained"
                      color="info"
                      sx={{ mr: 1, minWidth: "30px" }}
                    >
                      <IconEye size={16} />
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mr: 1, minWidth: "30px" }}
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mr: 1, minWidth: "30px" }}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <form 
          onSubmit={handleSubmit(onSubmitProduct)}
          noValidate
          autoComplete="off"
        >
        <DialogTitle sx={{mt:'20px'}}>Add New Product</DialogTitle>
        <DialogContent>

          <Controller
            name="product_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                id="product_name"
                label="Product Name"
                type="text"
                fullWidth
                variant="outlined"
                error={errors.product_name ? true : false}
                helperText={errors.product_name?.message}
              />
            )}
          />

          <Controller
            name="unit_price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                id="unit_price"
                label="Unit Price"
                type="number"
                fullWidth
                variant="outlined"
                error={errors.unit_price ? true : false}
                helperText={errors.unit_price?.message}
              />
            )}
          />

          <Controller
            name="unit_in_stock"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                id="unit_in_stock"
                label="Unit in Stock"
                type="number"
                fullWidth
                variant="outlined"
                error={errors.unit_in_stock ? true : false}
                helperText={errors.unit_in_stock?.message}
              />
            )}
          />

          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel id="category_name-label">Category</InputLabel>
            <Controller
              name="category_id"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  labelId="category_name-label"
                  id="category_id"
                  label="Category"
                  value={value}
                  onChange={onChange} // Use field.onChange for change handler
                  error={!!error} // Use fieldState.error to determine if there's an error
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText error={errors.category_id ? true : false}>
              {errors.category_id?.message}
            </FormHelperText>
          </FormControl>

          <Controller 
            name="product_picture"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                id="product_picture_name"
                label="Product Picture Name"
                type="text"
                fullWidth
                variant="outlined"
                error={errors.product_picture ? true : false}
                helperText={errors.product_picture?.message}
              />
            )}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'block', margin: '10px 0' }}
          />

          {imagePreviewUrl && (
            <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
              <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }} />
                <Button onClick={removeImage} variant="contained" color="secondary" style={{ display: 'block', margin: '10px auto' }}>
                Remove Image
              </Button>
            </Box>
          )}

        </DialogContent>
        <DialogActions sx={{mb:'20px', mr: '16px'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
