"use server"

import { cookies } from 'next/headers'

// Variables for keeping the token
let token: string | undefined

// Get Token from Cookies
function getToken() {
    if (token) {
        return token
    }
    
    const tokenCookie = cookies().get('token')
    if (tokenCookie) {
        token = tokenCookie.value
        return token
    }
    
    return undefined
}

// CRUD Functions for Product
// Get All Products with page and limit and filter with selectedCategory and searchQuery
async function getAllProducts(page: number, limit: number, selectedCategory: string, searchQuery: string) {
  getToken()
  // console.log('fetch...')
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL_API}/Product?page=${page}&limit=${limit}`
    if (selectedCategory) {
      url += `&selectedCategory=${selectedCategory}`
    }
    if (searchQuery) {
      url += `&searchQuery=${searchQuery}`
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return data
    } else {
      throw new Error('Failed to get products')
    }
  } catch (error) {
    console.error('An error occurred while getting products:', error)
  }
}

// Create Product
async function createProduct(payload: any) {
  getToken()
  try {

    // console.log(payload)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: payload,
    })
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return { success: true }
    } else {
      throw new Error('Failed to create product')
    }
    
  } catch (error) {
    console.error('An error occurred while creating product:', error)
  }
}

// Update Product with ID
async function updateProduct(id: string, payload: any) {
  getToken()
  try {

    // console.log(payload)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: payload,
    })
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return { success: true }
    } else {
      throw new Error('Failed to update product')
    }

  }
  catch (error) {
    console.error('An error occurred while updating product:', error)
  }
}

// Delete Product with ID
async function deleteProduct(id: number) {
  getToken()
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/Product/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      return { success: true }
    } else {
       throw new Error('Failed to delete product')
    }

  }
  catch (error) {
    console.error('An error occurred while deleting product:', error)
  }
}

export { getAllProducts, createProduct, updateProduct, deleteProduct }