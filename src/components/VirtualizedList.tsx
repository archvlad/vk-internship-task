import { Flex, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const VirtualizedList = observer(
  <T,>({
    items,
    renderItem,
    itemHeight,
    containerHeight,
    nodePadding,
    loading,
    loadingItem,
  }: {
    items: T[];
    renderItem: (item: T, index: number) => JSX.Element;
    itemHeight: number;
    containerHeight: number;
    nodePadding: number;
    loading: boolean;
    loadingItem: JSX.Element;
  }) => {
    const [scrollTop, setScrollTop] = useState(0);

    let startNode = Math.floor(scrollTop / itemHeight) - nodePadding;
    startNode = Math.max(0, startNode);

    let visibleNodesCount =
      Math.ceil(containerHeight / itemHeight) + 2 * nodePadding;

    visibleNodesCount = Math.min(items.length - startNode, visibleNodesCount);

    const visibleItems = items.slice(startNode, startNode + visibleNodesCount);

    const totalContentHeight = items.length * itemHeight;
    const offsetY = startNode * itemHeight;

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      setScrollTop((event.target as HTMLDivElement).scrollTop);
    };

    return (
      <div
        style={{
          height: containerHeight,
          overflowY: "auto",
          overflowX: "hidden",
          width: 400,
        }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalContentHeight }}>
          <Flex
            vertical
            gap="middle"
            style={{
              transform: `translateY(${offsetY}px)`,
            }}
          >
            {visibleItems.map((item, index) =>
              renderItem(item, startNode + index)
            )}
            {loading && (
              <>
                {[...Array(1)].map((_, index) => (
                  <div key={index}>{loadingItem}</div>
                ))}
                <Spin spinning style={{ margin: "10px auto", width: "100%" }} />
              </>
            )}
          </Flex>
        </div>
      </div>
    );
  }
);

export default VirtualizedList;
