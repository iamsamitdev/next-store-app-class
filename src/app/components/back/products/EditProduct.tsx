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
  import { Product, ProductEdit } from "@/app/(back)/backend/types/ProductTypes"
  import { IconX } from "@tabler/icons-react"
  import { updateProduct } from "@/app/services/actions/productAction"
  import { formatDateToISOWithoutMilliseconds } from "@/app/utils/CommondUtil"

  interface EditProductProps {
    open: boolean
    product: Product | any
    onClose: () => void
    onUpdated: () => void
  }

  const EditProduct: React.FC<EditProductProps> = ({
    open,
    product,
    onClose,
    onUpdated,
  }) => {
    const fileInputRef: any = useRef(null)
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(
      null
    )

    // Categories for Select
    const categories = [
      { name: "Mobile", value: "1" },
      { name: "Tablet", value: "2" },
      { name: "Smart Watch", value: "3" },
      { name: "Labtop", value: "4" },
    ]

    const editFormValidateSchema = Yup.object().shape({
      product_name: Yup.string().required("Product Name is required").trim(),
      unit_price: Yup.number().required("Price is required"),
      unit_in_stock: Yup.number().required("Unit in Stock is required"),
      category_id: Yup.string().required("Category is required"),
    })

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ProductEdit>({
      resolver: yupResolver(editFormValidateSchema) as any,
    })

    const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => setImagePreviewUrl(reader.result as string)
        reader.readAsDataURL(file)
      } else {
        setImagePreviewUrl("")
      }
    }

    const removeEditImage = () => {
      setImagePreviewUrl("")
      if (fileInputRef.current) fileInputRef.current.value = ""
    }

    // handle close edit dialog
    const handleCloseEdit = () => {
      onClose()
      setImagePreviewUrl("")
      reset()
    }

    // Handle Submit Edit
    const onSubmitEdit = async (data: ProductEdit) => {

      // console.log(data)
      // console.log(editingProduct)

      // รับค่าเป็น FormData
      const formData: any = new FormData()

      // กำหนดค่าให้กับ FormData
      formData.append("product_name", data.product_name)
      formData.append("unit_price", data.unit_price.toString())
      formData.append("unit_in_stock", data.unit_in_stock.toString())
      formData.append("category_id", data.category_id)
      formData.append("modified_date", formatDateToISOWithoutMilliseconds(new Date()))

      // Append image file to form data
      if (fileInputRef.current.files[0]) {
        formData.append("image", fileInputRef.current.files[0])
      }

      // วนลูปออกมาดู
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
      }

      // Call your API to submit the edited product
      try {
        const response = await updateProduct(product.product_id, formData)
        console.log(response)
        // Call the onUpdated callback to refresh the product list
        onUpdated()
        handleCloseEdit() // Close the dialog upon successful submission
      } catch (error) {
        console.error("Failed to update product:", error)
      }
    }

    return (
      <Dialog open={open} onClose={handleCloseEdit}>
        <DialogTitle sx={{ mt: "20px" }}>Edit Product</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitEdit)} noValidate autoComplete="off">
          <DialogContent sx={{ width: "400px" }}>
            {/* Preview Old Image */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${product?.product_picture}`}
              alt={product?.product_name}
              style={{ width: "100%", marginBottom: "20px" }}
            />

            <Controller
              name="product_name"
              control={control}
              defaultValue={product?.product_name || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  margin="dense"
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
              defaultValue={product?.unit_price || 0}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
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
              defaultValue={product?.unit_in_stock || 0}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
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
                defaultValue={product?.category_id.toString() || ""}
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

            {/* File Input Edit Product*/}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleEditFileChange}
              style={{ display: "block", margin: "10px 0" }}
            />

            {imagePreviewUrl && (
              <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    onClick={removeEditImage}
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
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }

  export default EditProduct
