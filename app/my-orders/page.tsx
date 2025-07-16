import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Truck, CheckCircle, Clock } from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "ORD-2024-001234",
    date: "March 20, 2024",
    status: "DELIVERED",
    total: 549.97,
    items: 3,
    estimatedDelivery: "March 25, 2024",
  },
  {
    id: "ORD-2024-001233",
    date: "March 15, 2024",
    status: "SHIPPED",
    total: 199.99,
    items: 1,
    estimatedDelivery: "March 22, 2024",
  },
  {
    id: "ORD-2024-001232",
    date: "March 10, 2024",
    status: "PROCESSING",
    total: 89.99,
    items: 2,
    estimatedDelivery: "March 20, 2024",
  },
  {
    id: "ORD-2024-001231",
    date: "March 5, 2024",
    status: "PENDING",
    total: 299.99,
    items: 1,
    estimatedDelivery: "March 18, 2024",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return <CheckCircle className="w-5 h-5 text-green-500" />
    case "SHIPPED":
      return <Truck className="w-5 h-5 text-blue-500" />
    case "PROCESSING":
      return <Package className="w-5 h-5 text-yellow-500" />
    case "PENDING":
      return <Clock className="w-5 h-5 text-gray-500" />
    default:
      return <Package className="w-5 h-5 text-gray-500" />
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

export default function MyOrdersPage() {
  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-semibold">
                    {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold">{order.estimatedDelivery}</p>
                </div>
                <div className="flex items-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/my-orders/${order.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Order Progress */}
              {order.status !== "PENDING" && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div
                      className={`flex items-center ${
                        ["PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          ["PROCESSING", "SHIPPED", "DELIVERED"].includes(order.status) ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      Processing
                    </div>
                    <div
                      className={`flex items-center ${
                        ["SHIPPED", "DELIVERED"].includes(order.status) ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          ["SHIPPED", "DELIVERED"].includes(order.status) ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      Shipped
                    </div>
                    <div
                      className={`flex items-center ${
                        order.status === "DELIVERED" ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          order.status === "DELIVERED" ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      Delivered
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
