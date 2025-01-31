import { Select,Space } from "antd";

import styles from "./SortBySelect.module.css";

const sortByCategories = [
  { value: "first_air_date", label: "Release" },
  { value: "name", label: "Name" },
  { value: "popularity", label: "Popularity" },
];

const sortByDirections = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

type FilterCategorySelectProps = {
  sortByCategory: string;
  sortByDirection: string;
  onChange: (sortByCategory: string, sortByDirection: string) => void;
};

const SortBySelect = ({
  sortByCategory,
  sortByDirection,
  onChange,
}: FilterCategorySelectProps) => {
  const handleCategoryChange = (value: string) => {
    onChange(value, sortByDirection);
  };

  const handleDirectionChange = (value: string) => {
    onChange(sortByCategory, value);
  };

  return (
    <div>
      <Space.Compact block>
        <Select
          value={sortByCategory}
          onChange={handleCategoryChange}
          options={sortByCategories}
          placeholder="Select category"
          className={styles.select}
        />
        <Select
          value={sortByDirection}
          onChange={handleDirectionChange}
          options={sortByDirections}
          className={styles.select}
          placeholder="Select direction"
        />
      </Space.Compact>
    </div>
  );
};

export default SortBySelect;
