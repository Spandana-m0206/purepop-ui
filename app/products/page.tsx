"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Heart, Filter, Search } from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    image: "/placeholder.svg?height=300&width=300",
    amount: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
  },
  {
    id: "2",
    title: "Smart Fitness Watch",
    image: "/placeholder.svg?height=300&width=300",
    amount: 299.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviews: 89,
    category: "Electronics",
  },
  {
    id: "3",
    title: "Portable Bluetooth Speaker",
    image: "/placeholder.svg?height=300&width=300",
    amount: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 156,
    category: "Electronics",
  },
  {
    id: "4",
    title: "Wireless Charging Pad",
    image: "/placeholder.svg?height=300&width=300",
    amount: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviews: 78,
    category: "Electronics",
  },
  {
    id: "5",
    title: "Designer Sunglasses",
    image: "/placeholder.svg?height=300&width=300",
    amount: 129.99,
    originalPrice: 179.99,
    rating: 4.4,
    reviews: 92,
    category: "Fashion",
  },
  {
    id: "6",
    title: "Leather Backpack",
    image: "/placeholder.svg?height=300&width=300",
    amount: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 67,
    category: "Fashion",
  },
]

const categories = ["All", "Electronics", "Fashion", "Home & Garden", "Sports"]
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const priceRange = priceRanges.find((r) => r.label === range)
        return priceRange && product.amount >= priceRange.min && product.amount <= priceRange.max
      })

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.amount - b.amount
      case "price-high":
        return b.amount - a.amount
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, range])
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of premium products</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">Filters</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.label} className="flex items-center space-x-2">
                      <Checkbox
                        id={range.label}
                        checked={selectedPriceRanges.includes(range.label)}
                        onCheckedChange={(checked) => handlePriceRangeChange(range.label, checked as boolean)}
                      />
                      <label htmlFor={range.label} className="text-sm">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-purple-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-purple-600">${product.amount}</span>
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
