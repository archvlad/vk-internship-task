import { observer } from "mobx-react-lite";
import showsStore, { StoredShow } from "../stores/showsStore";
import { useCallback, useEffect, useRef } from "react";
import { Flex } from "antd";
import { Typography } from "antd";
import ShowCard from "./ShowCard";
import VirtualizedList from "./VirtualizedList";
const { Title } = Typography;

const ShowsList = observer(() => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (showsStore.loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        showsStore.setPage(showsStore.page + 1);
        showsStore.fetchShows();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    showsStore.fetchShows();
  }, []);

  return (
    <>
      <Flex gap="middle" align="center" justify="center" vertical>
        <Title level={3}>TV Shows</Title>
        <div
          style={{
            maxWidth: 500,
            width: "-webkit-fill-available",
          }}
        >
          <Flex vertical gap="middle" align="center" justify="center">
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
              itemHeight={450}
              containerHeight={900}
            />
          </Flex>
        </div>
      </Flex>
    </>
  );
});

export default ShowsList;
