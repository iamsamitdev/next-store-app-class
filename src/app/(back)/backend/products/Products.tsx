"use client"
// React
import { useEffect, useState, useRef } from "react"

// Custom components
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/app/services/actions/productAction"
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
  category_id: number
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
  product_name: string
  unit_price: number
  unit_in_stock: number
  category_id: string
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

  // State for image preview for creating product
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  // Ref for the file input for creating product
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
    resetCreate({
      product_name: "",
      unit_price: 0,
      unit_in_stock: 0,
      category_id: "",
      created_date: formatDateToISOWithoutMilliseconds(new Date()),
      modified_date: formatDateToISOWithoutMilliseconds(new Date()),
    })
  }

  // Handle file change for creating product
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
  
  // Remove image preview for creating product
  const removeImage = () => {
    // Clear the preview URL
    setImagePreviewUrl('')
    // Clear the file input value
    fileInputRef.current.value = ''
  }

  // Form Validation Schema for creating product
  const createFormValidateSchema: any = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required").trim(),
    unit_price: Yup.string().required("Price is required"),
    unit_in_stock: Yup.string().required("Unit in Stock is required"),
    category_id: Yup.string().required("Category is required"),
  })

   // React Hook Form for creating product
   const {
    control: controlCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
  } = useForm<ProductPost>({
      defaultValues: {
        product_name: "",
        unit_price: 0,
        unit_in_stock: 0,
        category_id: "",
        created_date: formatDateToISOWithoutMilliseconds(new Date()),
        modified_date: formatDateToISOWithoutMilliseconds(new Date()),
      },
    resolver: yupResolver(createFormValidateSchema),
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
  const [editOpen, setEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | any>(null)

   // State for image preview for edit product
  const [editImagePreviewUrl, setEditImagePreviewUrl] = useState("")

  // Ref for the file input for edit product
  const editFileInputRef:any = useRef(null); // Ref for the file input


  // Handle file change for edit product
  const handleEditFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader()
  
      reader.onloadend = () => {
        // console.log(reader.result)
        setEditImagePreviewUrl(reader.result) // This is now the base64 encoded data URL of the file
      }
  
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      setEditImagePreviewUrl('')// Reset or clear the preview if no file is selected
    }
  }

  // Remove image preview for edit product
  const removeEditImage = () => {
    // Clear the preview URL
    setEditImagePreviewUrl('')
    // Clear the file input value
    editFileInputRef.current.value = ''
  }

  const handleCloseEdit = () => {
    setEditOpen(false)
    resetEdit()

    setEditImagePreviewUrl("")
    // Clear the file input value
    editFileInputRef.current.value = ''
  }

  // Reset form with current product data when opening the edit dialog
  const handleOpenEdit = (product: Product) => {
    resetEdit({
      product_name: product.product_name,
      unit_price: product.unit_price,
      unit_in_stock: product.unit_in_stock,
      category_id: product.category_id.toString(),
      modified_date: formatDateToISOWithoutMilliseconds(new Date()),
    })
    setEditingProduct(product)
    setEditOpen(true)
  }

  // Form Validation Schema for editing product
  const editFormValidateSchema = Yup.object().shape({
    product_name: Yup.string().required("Product Name is required").trim(),
    unit_price: Yup.number().required("Price is required"),
    unit_in_stock: Yup.number().required("Unit in Stock is required"),
    category_id: Yup.string().required("Category is required"),
  });

  // React Hook Form for editing product
  const {
    control: controlEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm<ProductEdit>({
    resolver: yupResolver(editFormValidateSchema) as any,
  })

  // Handle Submit Edit Product
  const onSubmitEdit = async (data: ProductEdit) => {
    console.log(data)
    // console.log(editingProduct)

    // รับค่าเป็น FormData
    const formData: any = new FormData()

    // กำหนดค่าให้กับ FormData
    formData.append("product_name", data.product_name)
    formData.append("unit_price", data.unit_price.toString())
    formData.append("unit_in_stock", data.unit_in_stock.toString())
    formData.append("category_id", data.category_id)
    formData.append("modified_date", data.modified_date)

    // Append image file to form data
    if (editFileInputRef.current.files[0]) {
      formData.append("image", editFileInputRef.current.files[0])
    }

    // วนลูปออกมาดู
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Call your API to submit the edited product
    try {
      const response = await updateProduct(editingProduct.product_id, formData)
      console.log(response)
      fetchProducts() // Fetch products again after successful submission
      handleCloseEdit() // Close the dialog upon successful submission
    } catch (error) {
      console.error("Failed to update product:", error)
    }
    
  }
  // -------------------------------------------------------------------------

  // Delete Product ----------------------------------------------------------
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null)

  const handleOpenDelete = (productId: number) => {
    setDeletingProductId(productId)
    setDeleteOpen(true)
  }
  
  const handleCloseDelete = () => {
    setDeleteOpen(false)
    setDeletingProductId(null)
  }

  const handleDeleteProduct = async () => {
    if (deletingProductId) {
      try {
        const response = await deleteProduct(deletingProductId)
        console.log(response)
        fetchProducts()  // Fetch products again after successful deletion
        handleCloseDelete()  // Close the confirmation dialog
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    }
    handleCloseDelete()  // Close the confirmation dialog
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
                      onClick={() => handleOpenEdit(product)}
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mr: 1, minWidth: "30px" }}
                      onClick={() => handleOpenDelete(product.product_id)}
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
          onSubmit={handleSubmitCreate(onSubmitProduct)}
          noValidate
          autoComplete="off"
        >
          <DialogTitle sx={{mt:'20px'}}>Add New Product</DialogTitle>
          <DialogContent sx={{width: '400px'}}>

            <Controller
              name="product_name"
              control={controlCreate}
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
                  error={errorsCreate.product_name ? true : false}
                  helperText={errorsCreate.product_name?.message}
                />
              )}
            />

            <Controller
              name="unit_price"
              control={controlCreate}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  id="unit_price"
                  label="Unit Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={errorsCreate.unit_price ? true : false}
                  helperText={errorsCreate.unit_price?.message}
                />
              )}
            />

            <Controller
              name="unit_in_stock"
              control={controlCreate}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  id="unit_in_stock"
                  label="Unit in Stock"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={errorsCreate.unit_in_stock ? true : false}
                  helperText={errorsCreate.unit_in_stock?.message}
                />
              )}
            />

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="category_name-label">Category</InputLabel>
              <Controller
                name="category_id"
                control={controlCreate}
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
              <FormHelperText error={errorsCreate.category_id ? true : false}>
                {errorsCreate.category_id?.message}
              </FormHelperText>
            </FormControl>
            
            {/* File Input Create Product*/}
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
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle sx={{mt:'20px'}}>Edit Product</DialogTitle>
        <form 
          onSubmit={handleSubmitEdit(onSubmitEdit)}
          noValidate
          autoComplete="off"
        >
          <DialogContent sx={{width: '400px'}}>

            {/* Preview Old Image */}
            <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${editingProduct?.product_picture}`} alt={editingProduct?.product_name} style={{ width: '100%', marginBottom:'20px' }} />

            <Controller
              name="product_name"
              control={controlEdit}
              defaultValue={editingProduct?.product_name || ''}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
                  label="Product Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  error={errorsEdit.product_name ? true : false}
                  helperText={errorsEdit.product_name?.message}
                />
              )}
            />

            <Controller
              name="unit_price"
              control={controlEdit}
              defaultValue={editingProduct?.unit_price || 0}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Unit Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={errorsEdit.unit_price ? true : false}
                  helperText={errorsEdit.unit_price?.message}
                />
              )}
            />

            <Controller
              name="unit_in_stock"
              control={controlEdit}
              defaultValue={editingProduct?.unit_in_stock || 0}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Unit in Stock"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={errorsEdit.unit_in_stock ? true : false}
                  helperText={errorsEdit.unit_in_stock?.message}
                />
              )}
            />

            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel id="category_name-label">Category</InputLabel>
              <Controller
                name="category_id"
                control={controlEdit}
                defaultValue={editingProduct?.category_id.toString() || ''}
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
              <FormHelperText error={errorsEdit.category_id ? true : false}>
                {errorsEdit.category_id?.message}
              </FormHelperText>
            </FormControl>

            {/* File Input Edit Product*/}
            <input
              type="file"
              ref={editFileInputRef}
              onChange={handleEditFileChange}
              style={{ display: 'block', margin: '10px 0' }}
            />

            {editImagePreviewUrl && (
              <Box sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                <Box sx={{ textAlign: 'right'}}>
                  <Button onClick={removeEditImage} variant="outlined" style={{ display: 'inline-block'}}>
                    <IconX size={16} />
                  </Button>
                </Box>
                <img src={editImagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }} />
              </Box>
            )
            }


          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit" variant="contained">Update</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteProduct} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
