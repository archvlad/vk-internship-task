import showsStore from "../stores/showsStore";

export const useShowActions = () => {
  const handleLike = (id: number) => {
    showsStore.updateShow(id, { liked: true });
  };

  const handleUnlike = (id: number) => {
    showsStore.updateShow(id, { liked: false });
  };

  const handleRemove = (id: number) => {
    showsStore.removeShow(id);
  };

  return { handleLike, handleUnlike, handleRemove };
};
