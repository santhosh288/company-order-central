
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

interface PaymentButtonProps {
  total: number;
  onPaymentSuccess: (paymentId: string) => void;
  disabled?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ 
  total, 
  onPaymentSuccess, 
  disabled 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing for demo
      // In a real app, you would integrate with Stripe, PayPal, etc.
      
      // Demo payment simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.1; // 90% success rate
      
      if (isSuccess) {
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        toast({
          title: "Payment Successful!",
          description: `Payment of ${formatCurrency(total)} has been processed.`,
        });
        
        onPaymentSuccess(paymentId);
      } else {
        throw new Error("Payment declined. Please try a different payment method.");
      }
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Payment processing failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={disabled || isProcessing}
      className="w-full"
      size="lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing Payment...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          Pay {formatCurrency(total)}
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
