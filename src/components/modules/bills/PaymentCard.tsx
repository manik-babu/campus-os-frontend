"use client";
import { IPayments } from "@/@types/bill";
import { makePayment } from "@/services/payment.service";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard } from "lucide-react";
import { useState } from "react";

export default function PaymentCard({ payment, billId }: { payment: IPayments; billId: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            const data = {
                billId,
                amount: parseFloat(payment.amount),
                billName: payment.name
            }
            console.table(data)
            const res = await makePayment(data);
            if (res.ok && res.data) {
                window.location.assign(res.data.url)
            }
            toast.success("Payment successful!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to make payment");
        } finally {
            setIsLoading(false);
        }
    }

    const amountInNumber = parseFloat(payment.amount);

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-4 md:p-5">
                <div className="flex items-center justify-between gap-4">
                    {/* Payment Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm md:text-base font-semibold text-foreground truncate">
                                {payment.name}
                            </h3>
                            {payment.isPaid && (
                                <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Paid
                                </Badge>
                            )}
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-foreground">
                            Rs. {amountInNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* Action Button */}
                    {!payment.isPaid && !payment.isDisabled && (
                        <Button
                            onClick={handlePayment}
                            disabled={isLoading || payment.isDisabled}
                            size="sm"
                            className="whitespace-nowrap gap-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            {isLoading ? "Processing..." : "Pay Now"}
                        </Button>
                    )}

                    {payment.isPaid && (
                        <div className="flex items-center text-green-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                    )}

                    {!payment.isPaid && payment.isDisabled && (
                        <Button
                            disabled
                            size="sm"
                            variant="outline"
                            className="whitespace-nowrap"
                        >
                            Unavailable
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}