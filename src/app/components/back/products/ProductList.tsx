import React from "react"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  TablePagination,
  Box,
} from "@mui/material"
import Image from "next/image"
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react"
import { Product } from "@/app/(back)/backend/types/ProductTypes"
import { numberWithCommas, formatDate } from "@/app/utils/CommondUtil"

interface ProductListProps {
  products: Product[]
  totalCount: number
  page: number
  rowsPerPage: number
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOpenDetails: (product: Product) => void
  handleOpenEdit: (product: Product) => void
  handleOpenDelete: (productId: number) => void
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  totalCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpenDetails,
  handleOpenEdit,
  handleOpenDelete,
}) => {
  return (
    <>
      <Table aria-label="products" sx={{ whiteSpace: "nowrap", mt: 2 }}>
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
          {products.map((product) => (
            <TableRow key={product.product_id}>
              <TableCell>{product.product_id}</TableCell>
              <TableCell>

                {/* Image */}
                <Box
                  sx={{
                    position: "relative",
                    width: '50px',
                    height: '50px',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL_API}/${product.product_picture}`}
                    alt={product.product_name}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>

              </TableCell>
              <TableCell>{product.product_name}</TableCell>
              <TableCell>{product.category_name}</TableCell>
              <TableCell>${numberWithCommas(product.unit_price)}</TableCell>
              <TableCell>{product.unit_in_stock}</TableCell>
              <TableCell>{formatDate(product.created_date)}</TableCell>
              <TableCell>
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default ProductList
