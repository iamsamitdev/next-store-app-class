import React from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { IconClearAll } from "@tabler/icons-react"

interface FilterSearchProductProps {
  searchQuery: string
  selectedCategory: string
  onSearchChange: (searchQuery: string) => void
  onCategoryChange: (category: string) => void
  onClearFilters: () => void
}

const FilterSearchProduct: React.FC<FilterSearchProductProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
}) => {

  const categories = [
    { name: "Mobile", value: "1" },
    { name: "Tablet", value: "2" },
    { name: "Smart Watch", value: "3" },
    { name: "Labtop", value: "4" },
  ]

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value as string)}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Search Products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ marginLeft: 2 }}
      />
      <Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={onClearFilters}
          sx={{ marginLeft: 2, height: '50px' }}
        >
          <IconClearAll size={16} /> &nbsp;Clear
        </Button>
      </Box>
    </>
  )
}

export default FilterSearchProduct
