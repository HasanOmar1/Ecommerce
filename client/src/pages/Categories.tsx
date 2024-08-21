import { Category } from "@components/ecommerce/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import Heading from "@components/common/Heading/Heading";

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
    <>
      <Heading>Categories</Heading>
      <Loading error={error} status={loading}>
        <GridList
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
