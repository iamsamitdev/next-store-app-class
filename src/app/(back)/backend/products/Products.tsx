"use client"

import DashboardCard from '@/app/components/back/shared/DashboardCard'
import { Box } from '@mui/material'
import { getAllProducts } from "@/app/services/actions/productAction"
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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

type Props = {}

export default function ProductsPage({ }: Props) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts()
                setProducts(response)
            } catch (error) {
                console.error('An error occurred while fetching products:', error)
            }
        }
        fetchProducts()
    }, [])

    //   console.log(products)

    return (
        <>
            <Box mt={2}>
                <DashboardCard title="Products">

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Unit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product: Product) => (
                                    <TableRow
                                        key={product.product_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="product">
                                            {product.product_id}
                                        </TableCell>
                                        <TableCell>{product.product_name}</TableCell>
                                        <TableCell>{product.category_name}</TableCell>
                                        <TableCell>{product.unit_price}</TableCell>
                                        <TableCell>{product.unit_in_stock}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DashboardCard>
            </Box>
        </>
    )
}