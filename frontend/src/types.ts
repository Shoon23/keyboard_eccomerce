export interface iRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface iLogin {
  email: string;
  password: string;
}

export interface iUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  cartId: string;
  accessToken?: string;
  favoritesId: string;
  checkOutId: string;
  isAdmin: boolean;
}

export interface iProduct {
  productDescription: string;
  productId: string;
  productImg: Array<{
    imgUrl: string;
    productId: string;
    productImgId: string;
  }>;
  productName: string;
  productPrice: number;
  productStock: number;
}

export interface iFavorite {
  favoriteItemId: string;
  favoritesId: string;
  productId: string;
  product: iProduct;
}

export interface iProductReview {
  reviewId: string;
  reviewDescription: string;
  reviewStar: number;
  userId: string;
  productId: string;
  user: iUser;
}
