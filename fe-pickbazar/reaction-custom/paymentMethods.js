import ExampleIOUPaymentForm from "@reactioncommerce/reaction-components/ExampleIOUPaymentForm/v1";
import StripePaymentInput from "@reactioncommerce/reaction-components/StripePaymentInput/v1";

const paymentMethods = [
  {
    displayName: "Credit Card",
    InputComponent: StripePaymentInput,
    name: "stripe_card",
    shouldCollectBillingAddress: true
  },
  {
    displayName: "IOU",
    InputComponent: ExampleIOUPaymentForm,
    name: "iou_example",
    shouldCollectBillingAddress: true
  }
];

export default paymentMethods;
