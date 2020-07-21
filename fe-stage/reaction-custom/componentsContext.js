/**
 * All Reaction Design System components are injected into the app from this single file.
 * This allows you to easily swap out one of the default components for your own, everywhere
 * in the app. It also allows you to take updates to the `@reactioncommerce/components` package
 * without worrying about it pulling in new component versions everywhere automatically. Instead,
 * you can switch from the `v1` import path to the `v2` import path, e.g., for a single component
 * when you're ready.
 *
 * You may also import your reaction-custom React components here and add them to the exported object.
 * They will then be available in the `components` property of all Reaction Design
 * System components, as well as any of your own components that you've wrapped
 * with the `withComponents` higher-order component.
 */

import iconAmericanExpress from "@reactioncommerce/reaction-components/svg/iconAmericanExpress";
import iconClear from "@reactioncommerce/reaction-components/svg/iconClear";
import iconDiscover from "@reactioncommerce/reaction-components/svg/iconDiscover";
import iconError from "@reactioncommerce/reaction-components/svg/iconError";
import iconExpand from "@reactioncommerce/reaction-components/svg/iconExpand";
import iconLock from "@reactioncommerce/reaction-components/svg/iconLock";
import iconPlus from "@reactioncommerce/reaction-components/svg/iconPlus";
import iconMastercard from "@reactioncommerce/reaction-components/svg/iconMastercard";
import iconValid from "@reactioncommerce/reaction-components/svg/iconValid";
import iconVisa from "@reactioncommerce/reaction-components/svg/iconVisa";
import spinner from "@reactioncommerce/reaction-components/svg/spinner";
import Accordion from "@reactioncommerce/reaction-components/Accordion/v1";
import AccordionFormList from "@reactioncommerce/reaction-components/AccordionFormList/v1";
import AddressBook from "@reactioncommerce/reaction-components/AddressBook/v1";
import Address from "@reactioncommerce/reaction-components/Address/v1";
import AddressCapture from "@reactioncommerce/reaction-components/AddressCapture/v1";
import AddressChoice from "@reactioncommerce/reaction-components/AddressChoice/v1";
import AddressForm from "@reactioncommerce/reaction-components/AddressForm/v1";
import AddressReview from "@reactioncommerce/reaction-components/AddressReview/v1";
import BadgeOverlay from "@reactioncommerce/reaction-components/BadgeOverlay/v1";
import Button from "@reactioncommerce/reaction-components/Button/v1";
import CartItem from "@reactioncommerce/reaction-components/CartItem/v1";
import CartItemDetail from "@reactioncommerce/reaction-components/CartItemDetail/v1";
import CartItems from "@reactioncommerce/reaction-components/CartItems/v1";
import CartSummary from "@reactioncommerce/reaction-components/CartSummary/v1";
import CatalogGrid from "@reactioncommerce/reaction-components/CatalogGrid/v1";
import CatalogGridItem from "reaction-components/CatalogGridItem";
import Checkbox from "@reactioncommerce/reaction-components/Checkbox/v1";
import CheckoutAction from "@reactioncommerce/reaction-components/CheckoutAction/v1";
import CheckoutActionComplete from "@reactioncommerce/reaction-components/CheckoutActionComplete/v1";
import CheckoutActionIncomplete from "@reactioncommerce/reaction-components/CheckoutActionIncomplete/v1";
import ErrorsBlock from "@reactioncommerce/reaction-components/ErrorsBlock/v1";
import Field from "@reactioncommerce/reaction-components/Field/v1";
import InPageMenuItem from "@reactioncommerce/reaction-components/InPageMenuItem/v1";
import InlineAlert from "@reactioncommerce/reaction-components/InlineAlert/v1";
import InventoryStatus from "@reactioncommerce/reaction-components/InventoryStatus/v1";
import Link from "reaction-components/Link";
import MiniCartSummary from "@reactioncommerce/reaction-components/MiniCartSummary/v1";
import PhoneNumberInput from "@reactioncommerce/reaction-components/PhoneNumberInput/v1";
import Price from "@reactioncommerce/reaction-components/Price/v1";
import ProfileImage from "@reactioncommerce/reaction-components/ProfileImage/v1";
import ProgressiveImage from "reaction-components/ProgressiveImage";
import QuantityInput from "@reactioncommerce/reaction-components/QuantityInput/v1";
import RegionInput from "@reactioncommerce/reaction-components/RegionInput/v1";
import Select from "@reactioncommerce/reaction-components/Select/v1";
import SelectableItem from "@reactioncommerce/reaction-components/SelectableItem/v1";
import SelectableList from "@reactioncommerce/reaction-components/SelectableList/v1";
import StockWarning from "@reactioncommerce/reaction-components/StockWarning/v1";
import StripeForm from "@reactioncommerce/reaction-components/StripeForm/v1";
import TextInput from "@reactioncommerce/reaction-components/TextInput/v1";
import withLocales from "../lib/utils/withLocales";

// Providing locales data
const AddressFormWithLocales = withLocales(AddressForm);

export default {
  Accordion,
  AccordionFormList,
  AddressBook,
  Address,
  AddressCapture,
  AddressChoice,
  AddressForm: AddressFormWithLocales,
  AddressReview,
  BadgeOverlay,
  Button,
  CartItem,
  CartItemDetail,
  CartItems,
  CartSummary,
  CatalogGrid,
  CatalogGridItem,
  Checkbox,
  CheckoutAction,
  CheckoutActionComplete,
  CheckoutActionIncomplete,
  ErrorsBlock,
  Field,
  InlineAlert,
  InventoryStatus,
  Link,
  iconAmericanExpress,
  iconClear,
  iconDiscover,
  iconError,
  iconExpand,
  iconLock,
  iconMastercard,
  iconPlus,
  iconValid,
  iconVisa,
  InPageMenuItem,
  MiniCartSummary,
  PhoneNumberInput,
  Price,
  ProfileImage,
  ProgressiveImage,
  QuantityInput,
  RegionInput,
  Select,
  spinner,
  SelectableItem,
  SelectableList,
  StockWarning,
  StripeForm,
  TextInput
};
