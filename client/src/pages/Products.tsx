import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
      <Row>
        {records.length > 0
          ? records.map((record) => {
              return (
                <Col
                  xs={6}
                  md={3}
                  key={record.id}
                  className="d-flex justify-content-center mb-5 mt-2"
                >
                  <Product {...record} />
                </Col>
              );
            })
          : "There are no categories"}
      </Row>
    </Container>
  );
};

export default Products;
