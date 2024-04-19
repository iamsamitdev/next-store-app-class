export type Product = {
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

export type ProductPost = {
  product_name: string
  category_id: string
  unit_price: number
  unit_in_stock: number
  created_date: string
  modified_date: string
}

export type ProductEdit = {
  product_name: string
  unit_price: number
  unit_in_stock: number
  category_id: string
  modified_date: string
}
