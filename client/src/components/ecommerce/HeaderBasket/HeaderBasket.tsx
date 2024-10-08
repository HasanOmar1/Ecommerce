import styles from "./styles.module.css";
import Logo from "@assets/svg/cart.svg?react";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import { useEffect, useState } from "react";

const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
  styles;

const HeaderBasket = () => {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${basketQuantity} ${isAnimate && pumpCartQuantity}`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={basketContainer}>
      <div className={basketCart}>
        <Logo title="basket icon" />
        <div className={quantityStyle}>{totalQuantity}</div>
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
