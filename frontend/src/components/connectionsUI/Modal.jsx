import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import SearchCityInput from "../SearchCityInput";
import { useMutation } from "@tanstack/react-query";
import {
  updateConnection,
  updateComment,
  queryClient,
  deleteConnection,
  deleteComment,
} from "../../fetchFunctions";
import toast from "react-hot-toast";
import { usePostContext } from "../../store/PostProvider";

export default function Modal({ type, item, handleClose, isOpen }) {
  const [city, setCity] = useState(null);
  const savedPost = item.itemObject;
  const savedComment = item.itemObject;
  let content = "";
  let cssInputClass =
    "w-full p-2 border rounded focus:bg-light3 focus:outline-0";

  const { postId } = usePostContext();

  const { mutate: updatePost } = useMutation({
    mutationFn: updateConnection,
    onSuccess: () => {
      toast.success("Connection Updated Succesfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleClose();
    },
  });

  const { mutate: updateComm } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      toast.success("Connection Updated Succesfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleClose();
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: deleteConnection,
    onSuccess: () => {
      toast.success("Connection Deleted Succesfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleClose();
    },
  });

  const { mutate: deleteComm } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment Deleted Succesfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      handleClose();
    },
  });

  function handleCitySelection(selectedCity) {
    setCity(selectedCity);
  }

  function onPostSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let updatedFields = {};
    let cityObj = {};
    if (city) {
      cityObj = { encounterCity: city._id };
      updatedFields = { ...updatedFields, ...cityObj };
    }
    if (data.title !== savedPost.title) {
      updatedFields = { ...updatedFields, title: data.title };
    }
    if (data.encounterDescription !== savedPost.encounterDescription) {
      updatedFields = {
        ...updatedFields,
        encounterDescription: data.encounterDescription,
      };
    }
    if (data.encounterPoint !== savedPost.encounterPoint) {
      updatedFields = { ...updatedFields, encounterPoint: data.encounterPoint };
    }
    if (data.targetGender !== savedPost.targetGender) {
      updatedFields = { ...updatedFields, targetGender: data.targetGender };
    }

    updatePost({ formData: { ...updatedFields }, id: item.itemObject._id });
  }

  function onCommentSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    let updatedFields = {};
    if (data.text !== savedComment.text) {
      updatedFields = { text: data.text };
    }

    updateComm({
      formData: { ...updatedFields },
      postId: postId,
      commentId: item.itemObject._id,
    });
  }

  function handlePostDelete(e) {
    e.preventDefault();
    deletePost({ id: item.itemObject._id });
  }

  function handleCommentDelete(e) {
    e.preventDefault();
    deleteComm({ postId: postId, commentId: item.itemObject._id });
  }

  if (type === "edit") {
    if (item.type === "post") {
      const post = item.itemObject;
      content = (
        <div className="max-w-md mx-auto  m-6">
          <h1 className="text-xl mb-2">Edit Connection</h1>
          <form onSubmit={onPostSubmit} className="space-y-4">
            <div>
              <label className="block">Title: </label>
              <input
                name="title"
                type="text"
                className={cssInputClass}
                defaultValue={post?.title || ""}
              />
            </div>
            <div>
              <label className="block">Description: </label>
              <textarea
                className={cssInputClass + " h-30"}
                defaultValue={post?.encounterDescription}
                name="encounterDescription"
              />
            </div>
            <div>
              <label className="block">Location</label>
              <SearchCityInput
                userCity={post?.encounterCity.City}
                onSelect={handleCitySelection}
                className={cssInputClass}
              />
            </div>
            <div>
              <label className="block">Point</label>
              <input
                name="encounterPoint"
                type="text"
                className={cssInputClass}
                defaultValue={post?.encounterPoint}
              />
            </div>
            <div>
              <label className="block">Target Gender</label>
              <select
                defaultValue={post.targetGender}
                className={cssInputClass}
                name="targetGender"
              >
                <option value={null} defaultValue={null}>
                  Select an option
                </option>
                <option value="male" defaultValue="male">
                  male
                </option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                className="cursor-pointer bg-light2 text-dark py-2 px-6 rounded-lg
border-light3 hover:bg-light3 opacity-60"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer  bg-dark text-light2 py-2 px-6 rounded-lg
border-light3 hover:bg-light3"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      );
    } else if (item.type === "comment") {
      const comment = item.itemObject;
      content = (
        <div className="max-w-md  mx-auto px-6 py-4">
          <h1 className="text-xl mb-2">Edit Comment</h1>
          <form onSubmit={onCommentSubmit} className="space-y-2">
            <div>
              <label className="block">Comment: </label>
              <input
                name="text"
                type="text"
                className={cssInputClass}
                defaultValue={comment?.text}
              />
            </div>
            <div className="flex gap-4">
              <button
                className="cursor-pointer bg-light2 text-dark py-2 px-6 rounded-lg
border-light3 hover:bg-light3 opacity-60"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer  bg-dark text-light2 py-2 px-6 rounded-lg
border-light3 hover:bg-light3"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      );
    }
  } else if (type === "delete") {
    content = (
      <>
        <h1>Are you sure</h1>
        <div className="flex gap-4">
          <button
            className="cursor-pointer bg-light2 text-dark py-2 px-6 rounded-lg
border-light3 hover:bg-light3 opacity-60"
            onClick={handleClose}
          >
            No
          </button>

          <button
            className="cursor-pointer  bg-dark text-light2 py-2 px-6 rounded-lg
border-light3 hover:bg-light3"
            onClick={(e) => {
              if (item.type === "post") {
                handlePostDelete(e);
              } else if (item.type === "comment") {
                handleCommentDelete(e);
              }
            }}
          >
            Yes
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border font-menu rounded-2xl bg-light1 p-12">
            {content}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
