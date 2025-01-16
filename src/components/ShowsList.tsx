import { observer } from "mobx-react-lite";
import showsStore, { StoredShow } from "../stores/showsStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { Flex } from "antd";
import { Typography } from "antd";
import ShowCard from "./ShowCard";
import VirtualizedList from "./VirtualizedList";
import SortBySelect from "./FilterCategorySelect";
const { Title } = Typography;

const ShowsList = observer(() => {
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

  useEffect(() => {
    showsStore.clearShows();
    showsStore.fetchShows({
      sortByCategory,
      sortByDirection,
    });
  }, [sortByCategory, sortByDirection]);

  return (
    <Flex gap="middle" align="center" justify="center" vertical>
      <Title level={3}>TV Shows</Title>
      <div
        style={{
          maxWidth: 500,
          width: "-webkit-fill-available",
        }}
      >
        <Flex vertical gap="middle" align="center" justify="center">
          <SortBySelect
            onChange={handleSortByChange}
            sortByCategory={sortByCategory}
            sortByDirection={sortByDirection}
          />
          <VirtualizedList
            items={showsStore.shows}
            loading={showsStore.loading}
            renderItem={(show: StoredShow, index: number) => {
              if (showsStore.shows.length == index + 1) {
                return (
                  <ShowCard key={show.id} ref={lastElementRef} show={show} />
                );
              } else {
                return <ShowCard key={show.id} show={show} />;
              }
            }}
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

export default ShowsList;
