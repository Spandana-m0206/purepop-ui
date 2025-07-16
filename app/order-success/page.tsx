import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"

export default function OrderSuccessPage() {
  const orderNumber = "ORD-2024-001234"
  const estimatedDelivery = "March 25, 2024"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order Number:</span>
              <span className="text-purple-600 font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Delivery:</span>
              <span>{estimatedDelivery}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="font-semibold">$549.97</span>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Payment Processed</h3>
                <p className="text-sm text-gray-600">Your payment has been successfully processed</p>
              </div>
              <div>
                <Package className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
              </div>
              <div>
                <Truck className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">On the Way</h3>
                <p className="text-sm text-gray-600">You'll receive tracking info once shipped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/my-orders">View My Orders</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">If you have any questions about your order, feel free to contact us.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
            <span>Email: support@purepop.com</span>
            <span className="hidden sm:inline">|</span>
            <span>Phone: 1-800-PUREPOP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
