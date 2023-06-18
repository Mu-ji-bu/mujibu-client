import { useAppSelector } from '@/libraries/hooks/reduxHooks';
import { selectUser } from '@/store/slices/userSlice';
import { Button } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useState } from 'react';

interface IPaymentProps {
  prize: number;
  isDisabled: boolean;
}

const PaymentForm: React.FC<IPaymentProps> = ({ prize, isDisabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useAppSelector(selectUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler = async (e: any) => {
    console.log('handle!');
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const responseH = await fetch('/api/hello').then((res) => res.json());
    console.log(responseH);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: prize, email: '000testonly@gmail.com' }), // multiply 100 to be cents
    })
      .then((res) => res.json())
      .catch(() => {
        setIsProcessing(false);
        alert('API error, 現在只能在 netlify 上使用');
      });

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    //   if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails as StripeCardElement,
        billing_details: {
          name: user.name || '六角小姐',
        },
      },
    });

    setIsProcessing(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment Successful');
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-fit">
      <form className="w-full" onSubmit={paymentHandler}>
        <h2>信用卡資訊</h2>
        <CardElement />
        {isProcessing || isDisabled ? (
          <Button variant="contained" fullWidth disabled color="secondary" size="large" className="mt-3">
            立刻付清
          </Button>
        ) : (
          <Button type="submit" variant="contained" fullWidth size="large" className="mt-3">
            立刻付清
          </Button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
