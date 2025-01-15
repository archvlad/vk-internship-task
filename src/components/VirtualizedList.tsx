import { Flex, Spin } from "antd";
import { useState } from "react";

const VirtualizedList = <T,>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  loading,
}: {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  itemHeight: number;
  containerHeight: number;
  loading: boolean;
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);

  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const invisibleItemsHeight =
    (startIndex + visibleItems.length - endIndex) * itemHeight;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((event.target as HTMLDivElement).scrollTop);
  };

  return (
    <div
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <Flex
          vertical
          gap="middle"
          align="center"
          justify="center"
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {items
            .slice(startIndex, endIndex)
            .map((item, index) => renderItem(item, startIndex + index))}
          <div style={{ height: `${invisibleItemsHeight}px` }} />
        </Flex>
      </div>
      {loading && (
        <Spin spinning style={{ margin: "5px auto", width: "100%" }} />
      )}
    </div>
  );
};

export default VirtualizedList;
