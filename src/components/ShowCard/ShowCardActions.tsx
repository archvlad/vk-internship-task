import { Flex, Button } from "antd";
import { DeleteOutlined, LikeOutlined } from "@ant-design/icons";
import { StoredShow } from "@stores/showsStore";
import { useShowActions } from "@hooks/useShowActions";

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
