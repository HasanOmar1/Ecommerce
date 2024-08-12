import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.categoriesSlice
  );

  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch, records]);

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
                  <Category {...record} />
                </Col>
              );
            })
          : "There are no categories"}
      </Row>
    </Container>
  );
};

export default Categories;
