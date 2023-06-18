import { Button } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const response = await fetch('/api/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 10000 }), // multiply 100 to be cents
    }).then((res) => res.json());

    console.log({ response });

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    //   if (!ifValidCardElement(cardDetails)) return;

    //   const paymentResult = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: cardDetails,
    //       billing_details: {
    //         name: currentUser ? currentUser.displayName : "Guest",
    //       },
    //     },
    //   });

    //   setIsProcessingPayment(false);

    //   if (paymentResult.error) {
    //     alert(paymentResult.error);
    //   } else {
    //     if (paymentResult.paymentIntent.status === "succeeded") {
    //       alert("Payment Successful");
    //     }
    //   }
  };

  return (
    <div className="flex flex-col items-center h-fit">
      <form className="w-full" onSubmit={paymentHandler}>
        <h2>信用卡資訊</h2>
        <CardElement />
        <Button variant="contained" fullWidth size="large" className="mt-3" onClick={() => console.log('結帳！')}>
          立刻付清
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
