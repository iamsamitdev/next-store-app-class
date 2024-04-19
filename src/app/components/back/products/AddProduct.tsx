import React, { useRef } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { ProductPost } from "@/app/(back)/backend/types/ProductTypes"
import { formatDateToISOWithoutMilliseconds } from "@/app/utils/CommondUtil"
import { IconX } from "@tabler/icons-react"
import { createProduct } from "@/app/services/actions/productAction"

// Define the component's props based on what it needs from the parent component
interface AddProductDialogProps {
  open: boolean
  handleClose: () => void
  onProductAdded: () => void
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  handleClose,
  onProductAdded,
}) => {

  const fileInputRef:any = useRef(null)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null)

  // Categories for Select
  const categories = [
    { name: "Mobile", value: "1" },
    { name: "Tablet", value: "2" },
    { name: "Smart Watch", value: "3" },
    { name: "Labtop", value: "4" },
  ]

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image preview
  const removeImage = () => {
    setImagePreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
    resolver: yupResolver(createFormValidateSchema),
  })

  // Clear the form and reset file input on close
  const handleCloseDialog = () => {
    reset({
      product_name: "",
      unit_price: 0,
      unit_in_stock: 0,
      category_id: "",
      created_date: formatDateToISOWithoutMilliseconds(new Date()),
      modified_date: formatDateToISOWithoutMilliseconds(new Date()),
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    handleClose()
  }

  // Handle Submit Product
  const onSubmit = async (data: ProductPost) => {
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
      console.log(`${key}: ${value}`)
    }

    // Call your API to submit formData
    // Adjust the createProduct function to expect FormData
    try {
      const response = await createProduct(formData)
      console.log(response)
      onProductAdded() // Notify the parent component that a new product has been added
      handleClose() // Close the dialog upon successful submission
    } catch (error) {
      console.error("Failed to create product:", error)
    }
  }

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <DialogTitle sx={{ mt: "20px" }}>Add New Product</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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

          {/* File Input Create Product*/}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "block", margin: "10px 0" }}
          />

          {imagePreviewUrl && (
            <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Box sx={{ textAlign: "right" }}>
                <Button
                  onClick={removeImage}
                  variant="outlined"
                  style={{ display: "inline-block" }}
                >
                  <IconX size={16} />
                </Button>
              </Box>
              <img
                src={imagePreviewUrl}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "10px",
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ mb: "20px", mr: "16px" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProductDialog
