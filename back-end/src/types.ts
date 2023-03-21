export interface iUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface iCartItem {
  productId: string;
  cartId: string;
  quantity: number;
  cartItemId: string;
}
