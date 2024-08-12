import { Container } from "react-bootstrap";
import { Product } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";

const Products = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.productsSlice
  );

  useEffect(() => {
    dispatch(actGetProductsByCatPrefix(params.prefix as string));

    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Loading error={error} status={loading}>
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
