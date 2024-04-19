"use client"
// React
import { useState } from "react"

// MUI Table and related components
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Alert,
} from "@mui/material"
import { IconPlus } from "@tabler/icons-react"

// Import Types
import { Product } from "@/app/(back)/backend/types/ProductTypes"

// Import useProducts Hook
import useProducts from "@/app/hooks/back/useProducts"

// Import ProductList
import ProductList from "@/app/components/back/products/ProductList"

// Import AddProductDialog
import AddProductDialog from "@/app/components/back/products/AddProduct"

// Import ProductDetail
import ProductDetail from "@/app/components/back/products/ProductDetail"

// Import EditProduct
import EditProduct from "@/app/components/back/products/EditProduct"

// Import DeleteProduct
import DeleteProduct from "@/app/components/back/products/DeleteProduct"

// Import FilterSearchProduct
import FilterSearchProduct from "@/app/components/back/products/FilterSearchProduct"

// Import ExportProduct
import ExportProduct from "@/app/components/back/products/ExportProduct"

type Props = {}

export default function ProductsPage({}: Props) {
  // Use the custom hook to get products ----------------------------------
  const {
    fetchProducts,
    products,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totalCount,
    loading,
    error,
  } = useProducts()
  // ----------------------------------------------------------------------

  // Create Product -------------------------------------------------------
  // State for dialog add product
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false)

  const handleProductAdded = async () => {
    await fetchProducts()
  }
  // ----------------------------------------------------------------------

  // Search and Filter ----------------------------------------------------
  // Search field change handler
  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }

  // Category select change handler
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
  }

  // ----------------------------------------------------------------------

  // Product Detail -------------------------------------------------------
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product)
    setDetailOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailOpen(false)
    setSelectedProduct(null)
  }
  // -------------------------------------------------------------------------

  // Edit Product ------------------------------------------------------------
  const [editOpen, setEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setEditOpen(true)
  }

  const handleCloseEdit = () => {
    setEditOpen(false)
    setEditingProduct(null)
  }

  // handle product updated
  const handleProductUpdated = async () => {
    await fetchProducts()
    handleCloseEdit()
  }

  // -------------------------------------------------------------------------

  // Delete Product ----------------------------------------------------------
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null
  )

  const handleOpenDelete = (productId: number) => {
    setDeletingProductId(productId)
    setDeleteOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false)
    setDeletingProductId(null)
  }

  const handleDeleted = async () => {
    await fetchProducts()
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
            <Typography variant="h5">Products ({totalCount})</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsDialogAddOpen(true)}
            >
              <IconPlus size={16} /> &nbsp;Add Product
            </Button>
          </Stack>
        </CardContent>

        <Stack
          direction="row"
          m={2}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <FilterSearchProduct
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
          <ExportProduct products={products} />
        </Stack>

        <Box sx={{ overflow: "auto", width: { sm: "auto" } }}>
          {/* Loading */}
          {loading && <LinearProgress sx={{ mx: 2, mb: 2 }} />}

          {/* Error */}
          {error && !loading && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* No Products */}
          {products.length === 0 && !loading && (
            <Alert severity="info" sx={{ mx: 2, mb: 2 }}>
              No products found
            </Alert>
          )}

          {/* Products Table */}
          {products.length > 0 && (
            <ProductList
              products={products}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={(_event, newPage) => setPage(newPage)}
              handleChangeRowsPerPage={(event) =>
                setRowsPerPage(parseInt(event.target.value, 10))
              }
              handleOpenDetails={handleOpenDetails}
              handleOpenEdit={handleOpenEdit}
              handleOpenDelete={handleOpenDelete}
            />
          )}
        </Box>
      </Card>

      {/* Add Product Dialog */}
      <AddProductDialog
        open={isDialogAddOpen}
        handleClose={() => setIsDialogAddOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          open={detailOpen}
          onClose={handleCloseDetails}
        />
      )}

      {/* Edit Product Dialog */}
      {editingProduct && (
        <EditProduct
          open={editOpen}
          product={editingProduct}
          onClose={handleCloseEdit}
          onUpdated={handleProductUpdated}
        />
      )}

      {/* Delete Product Dialog */}
      <DeleteProduct
        open={deleteOpen}
        productId={deletingProductId}
        onClose={handleCloseDelete}
        onDeleted={handleDeleted}
      />
    </>
  )
}