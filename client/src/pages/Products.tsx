import { Product } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.productsSlice
  );

  const cartItems = useAppSelector((state) => state.cartSlice.items);

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] ?? 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <>
      <Heading>
        <span className="text-capitalize">{params.prefix} </span>Products
      </Heading>

      <Loading error={error} status={loading}>
        <GridList
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Products;
