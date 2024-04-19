import { useState, useEffect } from "react"
import { getAllProducts } from "@/app/services/actions/productAction"

function useProducts(
  initialPage = 0,
  initialRowsPerPage = 5,
  initialCategory = "",
  initialSearchQuery = ""
) {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(initialPage)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await getAllProducts(
        page + 1,
        rowsPerPage,
        selectedCategory,
        searchQuery
      )
      setProducts(response.products)
      setTotalCount(response.total)
      setLoading(false)
    } catch (error) {
      console.error("An error occurred while fetching products:", error)
      setError(error as any)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, rowsPerPage, selectedCategory, searchQuery])

  return {
    products,
    setProducts,
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
    fetchProducts,
  }
}

export default useProducts
