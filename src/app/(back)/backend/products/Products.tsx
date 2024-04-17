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
import { IconEye, IconEdit, IconTrash, IconPlus, IconX } from "@tabler/icons-react"

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
  created_date: string
  modified_date: string
}

// Types for product edit
type ProductEdit = {
  category_id: number
  product_name: string
  unit_price: number
  unit_in_stock: number
  created_date: string
  modified_date: string
}

type Props = {}

export default function ProductsPage({}: Props) {
  
  // Read Products -----------------------------------------------------------
  // State for products
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts()
      setProducts(response)
    } catch (error) {
      console.error('An error occurred while fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log(products)
  // -------------------------------------------------------------------------

  // Product Detail ----------------------------------------------------------
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

   // Handle opening the product detail dialog
   const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product)
    setDetailOpen(true)
  };

  // Handle closing the product detail dialog
  const handleCloseDetails = () => {
    setDetailOpen(false)
    setSelectedProduct(null)
  }
  // -------------------------------------------------------------------------

  // Create Product ----------------------------------------------------------
  // State for dialog
  const [open, setOpen] = useState(false)

  // State for image preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const fileInputRef:any = useRef(null); // Ref for the file input

  // Example categories, replace with your actual categories
   const categories = [
    { name: "Mobile", value: "1" },
    { name: "Tablet", value: "2" },
    { name: "Smart Watch", value: "3" },
    { name: "Labtop", value: "4"}
  ]

  // Handle dialog open
  const handleClickOpen = () => {
    setOpen(true)
  }

  // Handle dialog close
  const handleClose = () => {
    setOpen(false)

    setImagePreviewUrl("")
    // Clear the file input value
    fileInputRef.current.value = ''

    // Reset the form
    reset({
      product_name: "",
      unit_price: 0,
      unit_in_stock: 0,
      category_id: "",
      created_date: formatDateToISOWithoutMilliseconds(new Date()),
      modified_date: formatDateToISOWithoutMilliseconds(new Date()),
    })
  }

  // Handle file change
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader()
  
      reader.onloadend = () => {
        // console.log(reader.result)
        setImagePreviewUrl(reader.result) // This is now the base64 encoded data URL of the file
      }
  
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      setImagePreviewUrl('')// Reset or clear the preview if no file is selected
    }
  }  
  
  // Remove image preview
  const removeImage = () => {
    // Clear the preview URL
    setImagePreviewUrl('')
    // Clear the file input value
    fileInputRef.current.value = ''
  }

  // Form Validation Schema
  const formValidateSchema: any = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required").trim(),
    unit_price: Yup.string().required("Price is required"),
    unit_in_stock: Yup.string().required("Unit in Stock is required"),
    category_id: Yup.string().required("Category is required"),
  })

   // React Hook Form
   const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductPost>({
      defaultValues: {
        product_name: "",
        unit_price: 0,
        unit_in_stock: 0,
        category_id: "",
        created_date: formatDateToISOWithoutMilliseconds(new Date()),
        modified_date: formatDateToISOWithoutMilliseconds(new Date()),
      },
    resolver: yupResolver(formValidateSchema),
  })

  // Handle Submit Product
  const onSubmitProduct = async (data: ProductPost) => {
    // console.log(data)

    // รับค่าเป็น FormData
    const formData: any = new FormData()

    // กำหนดค่าให้กับ FormData
    formData.append("product_name", data.product_name)
    formData.append("unit_price", data.unit_price.toString())
    formData.append("unit_in_stock", data.unit_in_stock.toString())
    formData.append("category_id", data.category_id)
    formData.append("created_date", data.created_date)
    formData.append("modified_date", data.modified_date)

    // Append image file to form data
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0])
    }

    // วนลูปออกมาดู
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Call your API to submit formData
    // Adjust the createProduct function to expect FormData
    try {
      const response = await createProduct(formData)
      console.log(response)
      fetchProducts() // Fetch products again after successful submission
      handleClose() // Close the dialog upon successful submission
    } catch (error) {
      console.error("Failed to create product:", error);
    }

  }
  
  // -------------------------------------------------------------------------

  // Edit Product ------------------------------------------------------------
  // const [editOpen, setEditOpen] = useState(false)
  // const [editingProduct, setEditingProduct] = useState<ProductEdit | null>(null)

  // const handleOpenEdit = (product: ProductEdit) => {
  //   console.log(product)
  //   setEditingProduct(product)
  //   setEditOpen(true)
  // }
  
  // const handleCloseEdit = () => {
  //   setEditOpen(false);
  //   setEditingProduct(null)
  // }

  // const onSubmitEdit = async (data: ProductEdit) => {
  //   try {
  //     const formData: any = new FormData()
  //     formData.append("product_name", data.product_name)
  //     formData.append("unit_price", data.unit_price.toString())
  //     formData.append("unit_in_stock", data.unit_in_stock.toString())
  //     formData.append("category_id", data.category_id)
  //     formData.append("created_date", data.created_date)
  //     formData.append("modified_date", data.modified_date)
  
  //     // Append image file to form data
  //     if (fileInputRef.current.files[0]) {
  //       formData.append("image", fileInputRef.current.files[0])
  //     }

  //     // วนลูปออกมาดู
  //     for (let [key, value] of formData.entries()) {
  //       console.log(`${key}: ${value}`);
  //     }
  
  //     // const response = await updateProduct(editingProduct?.product_id, formData);
  //     // console.log("Update response", response);
  //     // fetchProducts()  // Refresh the list after update
  //     // handleCloseEdit()  // Close dialog after submission
  //   } catch (error) {
  //     console.error("Failed to update product:", error);
  //   }
  // }
  
  
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
            <Typography variant="h5">Products ({ products.length })</Typography>
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
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${product.product_picture}`}
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
                      onClick={() => handleOpenDetails(product)}
                    >
                      <IconEye size={16} />
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ mr: 1, minWidth: "30px" }}
                      // onClick={() => handleOpenEdit(product)}
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
          <DialogContent sx={{width: '400px'}}>

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
            
            {/* File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'block', margin: '10px 0' }}
            />

            {imagePreviewUrl && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Box sx={{ textAlign: 'right'}}>
                  <Button onClick={removeImage} variant="outlined" style={{ display: 'inline-block'}}>
                    <IconX size={16} />
                  </Button>
                </Box>
                <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }} />
              </Box>
            )}

          </DialogContent>
          <DialogActions sx={{mb:'20px', mr: '16px'}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Product Detail Dialog */}
      {
        selectedProduct &&
          <Dialog open={detailOpen} onClose={handleCloseDetails}>
              <DialogContent sx={{width: '400px'}}>
                <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${selectedProduct?.product_picture}`} alt={selectedProduct?.product_name} style={{ width: '100%', marginBottom:'20px' }} />
                <Typography variant="h5">{selectedProduct?.product_name}</Typography>
                <Typography color="textSecondary">{selectedProduct?.category_name}</Typography>
                <Typography color="textSecondary">$ {numberWithCommas(selectedProduct?.unit_price)}</Typography>
                <Typography color="textSecondary">Units: {selectedProduct?.unit_in_stock}</Typography>
                <Typography color="textSecondary">Created: {formatDate(selectedProduct?.created_date)}</Typography>
                <Typography color="textSecondary">Updated: {formatDate(selectedProduct?.modified_date)}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDetails}>Close</Button>
              </DialogActions>
          </Dialog>
      }

      {/* Edit Product Dialog */}

      
    </>
  )
}
