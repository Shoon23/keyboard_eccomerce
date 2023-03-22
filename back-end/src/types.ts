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

export interface iProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productStock: number;
  productDescription: string;
}

export interface iReview {
  reviewDescription: string;
  reviewStar: number;
  userId: string;
  productId: string;
}
