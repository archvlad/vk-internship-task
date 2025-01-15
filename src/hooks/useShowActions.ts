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

  const handleChangeName = (id: number, name: string) => {
    showsStore.updateShow(id, { name: name });
  };

  const handleChangeOverview = (id: number, overview: string) => {
    showsStore.updateShow(id, { overview: overview });
  };

  return {
    handleLike,
    handleUnlike,
    handleRemove,
    handleChangeName,
    handleChangeOverview,
  };
};
