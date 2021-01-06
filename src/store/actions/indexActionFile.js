//central file which imports all the action creators from all the other actions creator files
//We do this for the sake of less hassle

export {
  addIngredients,
  removeIngredients,
  resetIngredients,
} from './burgerBuilderActionCreators';

export { addPurchaseOrder } from './ordersActionCreators';
