import { truncate } from "@helpers/textUtils";
import { StoredShow } from "@stores/showsStore";
import { Card, Flex, Image, Skeleton } from "antd";
import { Typography } from "antd";
import { forwardRef, LegacyRef } from "react";

import ShowCardActions from "./ShowCardActions";
const { Text } = Typography;
const { Title } = Typography;
import { HighlightOutlined } from "@ant-design/icons";
import { FALLBACK_IMAGE } from "@constants/images";
import { useShowActions } from "@hooks/useShowActions";

import styles from "./ShowCard.module.css";

type ShowCardProps = {
  show?: StoredShow;
  isSkeleton?: boolean;
};

const ShowCard = (
  props: ShowCardProps,
  ref: LegacyRef<HTMLDivElement> | undefined
) => {
  const { handleChangeName, handleChangeOverview } = useShowActions();
  return (
    <Card
      ref={ref}
      loading={props.isSkeleton}
      className={styles.card}
      cover={
        props.isSkeleton ? (
          <div className={styles.coverContainer}>
            <Skeleton.Node className={styles.skeletonPlaceholder} active />
          </div>
        ) : (
          <Image
            preview={false}
            alt={props.show?.name}
            height={225}
            className={styles.imageStyle}
            src={
              props.show
                ? `https://image.tmdb.org/t/p/original${props.show.backdrop_path}`
                : ""
            }
            fallback={FALLBACK_IMAGE}
            placeholder={
              <Skeleton.Node className={styles.skeletonPlaceholder} active />
            }
          />
        )
      }
    >
      {props.show && (
        <Flex vertical gap="small">
          <Title
            editable={{
              icon: <HighlightOutlined />,
              tooltip: "Click to edit name",
              onChange: (value: string) =>
                handleChangeName(props.show!.id, value),
            }}
            level={4}
            className={styles.title}
          >
            {props.show.name}
          </Title>
          <div>
            <div>
              <Text type="secondary">Country: </Text>
              <Text>{props.show.origin_country[0]}</Text>
            </div>
            <div>
              <Text type="secondary">Release: </Text>
              <Text>{props.show.first_air_date}</Text>
            </div>
            <div>
              <Text type="secondary">Popularity: </Text>
              <Text>{props.show.popularity}</Text>
            </div>
          </div>
          <Typography.Paragraph
            ellipsis={{
              rows: 3,
            }}
            editable={{
              icon: <HighlightOutlined />,
              tooltip: "Click to edit overview",
              onChange: (value: string) =>
                handleChangeOverview(props.show!.id, value),
            }}
            className={styles.overview}
          >
            {props.show.overview
              ? truncate(props.show.overview, 150)
              : "Overview not found"}
          </Typography.Paragraph>
          <ShowCardActions show={props.show} />
        </Flex>
      )}
    </Card>
  );
};

export default forwardRef(ShowCard);
