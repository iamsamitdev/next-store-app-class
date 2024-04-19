import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"
import { deleteProduct } from "@/app/services/actions/productAction"

interface DeleteProductProps {
  open: boolean
  productId: number | null
  onClose: () => void
  onDeleted: () => void
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  open,
  productId,
  onClose,
  onDeleted,
}) => {
  const handleDeleteProduct = async () => {
    if (productId) {
      try {
        const response = await deleteProduct(productId)
        console.log("Product deleted:", response)
        onDeleted() // Notify parent component to refresh the product list
        onClose() // Close the dialog
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    } else {
      onClose() // Ensure the dialog closes even if deletion is not executed
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this product?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDeleteProduct} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProduct
