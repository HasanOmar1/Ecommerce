import { Container } from "react-bootstrap";
import { Category } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";

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
      <Loading error={error} status={loading}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
