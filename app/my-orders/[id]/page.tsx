import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, CreditCard } from "lucide-react"

// Mock order details data
const orderDetails = {
  "ORD-2024-001234": {
    id: "ORD-2024-001234",
    date: "March 20, 2024",
    status: "DELIVERED",
    deliveredDate: "March 24, 2024",
    estimatedDelivery: "March 25, 2024",
    trackingNumber: "1Z999AA1234567890",
    shippingAddress: "123 Main St, Anytown, CA 12345",
    paymentMethod: "Credit Card ending in 4242",
    items: [
      {
        id: "1",
        productId: "1",
        title: "Premium Wireless Headphones",
        image: "/placeholder.svg?height=100&width=100",
        price: 199.99,
        quantity: 2,
      },
      {
        id: "2",
        productId: "2",
        title: "Smart Fitness Watch",
        image: "/placeholder.svg?height=100&width=100",
        price: 299.99,
        quantity: 1,
      },
    ],
    subtotal: 699.97,
    shipping: 0,
    tax: 56.0,
    total: 755.97,
  },
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orderDetails[params.id as keyof typeof orderDetails]

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Button asChild>
            <Link href="/my-orders">Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "SHIPPED":
        return <Truck className="w-6 h-6 text-blue-500" />
      case "PROCESSING":
        return <Package className="w-6 h-6 text-yellow-500" />
      case "PENDING":
        return <Clock className="w-6 h-6 text-gray-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800"
      case "SHIPPED":
        return "bg-blue-100 text-blue-800"
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800"
      case "PENDING":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="outline" className="mb-4 bg-transparent">
          <Link href="/my-orders">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{order.id}</h1>
            <p className="text-gray-600">Placed on {order.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(order.status)}
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link href={`/products/${item.productId}`}>
                      <h3 className="font-semibold hover:text-purple-600 transition-colors">{item.title}</h3>
                    </Link>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-semibold">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Payment Confirmed</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-sm text-gray-600">March 22, 2024</p>
                  </div>
                </div>
                {order.status === "DELIVERED" && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-gray-600">{order.deliveredDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{order.shippingAddress}</p>
              {order.trackingNumber && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium mb-1">Tracking Number</p>
                  <p className="text-sm text-purple-600 font-mono">{order.trackingNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{order.paymentMethod}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-transparent">
              <Link href="/products">Order Again</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Download Invoice
            </Button>
            {order.status === "DELIVERED" && (
              <Button variant="outline" className="w-full bg-transparent">
                Leave a Review
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
