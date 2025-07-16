"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const productData = {
  "1": {
    id: "1",
    title: "Premium Wireless Headphones",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    amount: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 124,
    description:
      "Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort padding",
      "Bluetooth 5.0 connectivity",
      "Quick charge technology",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
    },
    totalQuantity: 50,
  },
}

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = productData[params.id as keyof typeof productData]

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push("/products")}>Back to Products</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.title} added to your cart.`,
    })
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.totalQuantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-96 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4 bg-red-500">Sale</Badge>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-purple-600" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-purple-600">${product.amount}</span>
            <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            <Badge variant="destructive">Save ${(product.originalPrice - product.amount).toFixed(2)}</Badge>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.totalQuantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-500">{product.totalQuantity} available</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Truck className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">Orders over $50</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">2 Year Warranty</p>
              <p className="text-xs text-gray-500">Full coverage</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <RotateCcw className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm font-medium">30 Day Returns</p>
              <p className="text-xs text-gray-500">No questions asked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-medium">John D.</span>
                    </div>
                    <p className="text-gray-600">
                      Excellent sound quality and very comfortable to wear for long periods.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Sarah M.</span>
                    </div>
                    <p className="text-gray-600">
                      Great headphones, battery life is amazing. Only wish they came in more colors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Free shipping on orders over $50</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• 30-day return window</li>
                      <li>• Items must be in original condition</li>
                      <li>• Free return shipping</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
