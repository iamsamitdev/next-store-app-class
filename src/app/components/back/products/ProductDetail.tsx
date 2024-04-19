import React from "react"
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material"
import { numberWithCommas, formatDate } from "@/app/utils/CommondUtil"
import { Product } from "@/app/(back)/backend/types/ProductTypes"

interface ProductDetailProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  open,
  onClose,
}) => {
  if (!product) return null // Render nothing if no product is selected

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ width: "400px" }}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${product.product_picture}`}
          alt={product.product_name}
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <Typography variant="h5">{product.product_name}</Typography>
        <Typography color="textSecondary">{product.category_name}</Typography>
        <Typography color="textSecondary">
          $ {numberWithCommas(product.unit_price)}
        </Typography>
        <Typography color="textSecondary">
          Units: {product.unit_in_stock}
        </Typography>
        <Typography color="textSecondary">
          Created: {formatDate(product.created_date)}
        </Typography>
        <Typography color="textSecondary">
          Updated: {formatDate(product.modified_date)}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDetail
