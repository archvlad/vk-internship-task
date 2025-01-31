import ShowCard from "@components/ShowCard";
import showsStore, { StoredShow } from "@stores/showsStore";
import { Flex } from "antd";
import { Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
const { Title } = Typography;
import SortBySelect from "@components/FilterCategorySelect";
import VirtualizedList from "@components/VirtualizedList";

import styles from "./ShowsViewer.module.css";

const ShowsViewer = observer(() => {
  const observer = useRef<IntersectionObserver>();

  const [sortByCategory, setSortByCategory] = useState<string>("popularity");
  const [sortByDirection, setSortByDirection] = useState<string>("desc");

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (showsStore.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            showsStore.setPage(showsStore.page + 1);
            showsStore.fetchShows({
              sortByCategory,
              sortByDirection,
            });
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [sortByCategory, sortByDirection]
  );

  const handleSortByChange = (
    sortByCategory: string,
    sortByDirection: string
  ) => {
    setSortByCategory(sortByCategory);
    setSortByDirection(sortByDirection);
  };

  const renderItem = (show: StoredShow, index: number) => {
    if (showsStore.shows.length == index + 1) {
      return <ShowCard key={show.id} ref={lastElementRef} show={show} />;
    } else {
      return <ShowCard key={show.id} show={show} />;
    }
  };

  useEffect(() => {
    showsStore.setPage(1);
    showsStore.clearShows();
    showsStore.fetchShows({
      sortByCategory,
      sortByDirection,
    });
  }, [sortByCategory, sortByDirection]);

  return (
    <Flex gap="middle" align="center" justify="center" vertical>
      <Title level={3}>TV Shows</Title>
      <div className={styles.main}>
        <Flex vertical gap="middle" align="center" justify="center">
          <SortBySelect
            onChange={handleSortByChange}
            sortByCategory={sortByCategory}
            sortByDirection={sortByDirection}
          />
          <VirtualizedList
            items={showsStore.shows}
            loading={showsStore.loading}
            renderItem={renderItem}
            loadingItem={<ShowCard isSkeleton />}
            itemHeight={492}
            containerHeight={984}
            nodePadding={2}
          />
        </Flex>
      </div>
    </Flex>
  );
});

export default ShowsViewer;
