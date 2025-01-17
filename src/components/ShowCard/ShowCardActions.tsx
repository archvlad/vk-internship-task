import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import { useShowActions } from "@hooks/useShowActions";
import { StoredShow } from "@stores/showsStore";
import { Button,Flex } from "antd";

const ShowCardActions = (props: { show: StoredShow }) => {
  const { handleLike, handleUnlike, handleRemove } = useShowActions();

  return (
    <Flex gap="small" justify="space-between">
      {props.show.liked ? (
        <Button
          onClick={() => handleUnlike(props.show.id)}
          color="primary"
          variant="filled"
          icon={<LikeOutlined />}
        >
          Liked
        </Button>
      ) : (
        <Button
          onClick={() => handleLike(props.show.id)}
          icon={<LikeOutlined />}
        >
          Like
        </Button>
      )}
      <Button
        onClick={() => handleRemove(props.show.id)}
        color="danger"
        icon={<DeleteOutlined />}
        variant="filled"
      >
        Remove
      </Button>
    </Flex>
  );
};

export default ShowCardActions;
