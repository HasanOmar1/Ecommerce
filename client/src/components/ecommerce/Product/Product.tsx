import { memo, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

const { product, productImg, maximumNotice } = styles;

const Product = memo(({ img, price, title, id, max, quantity }: TProduct) => {
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) return;

    setIsBtnDisabled(true);
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price.toFixed(2)}$</h3>
      <h3 className={maximumNotice}>
        {quantityReachedToMax
          ? "You reached the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}
      </h3>

      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={addToCartHandler}
        disabled={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            Loading <Spinner animation="border" size="sm" />
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
