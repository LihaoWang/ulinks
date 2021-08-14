import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { firestore, auth } from "../lib/firebase";
import { FiEdit } from "react-icons/fi";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import kebabCase from "lodash.kebabcase";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";
export default function Drag({ post }) {
  const [links, updateLinks] = useState(post);
  const [addNew, setAddNew] = useState(false);
  const postRef = firestore.collection("users").doc(auth.currentUser.uid);

  useEffect(() => {
    postRef.update({
      links: links,
    });
    // eslint-disable-next-line
  }, [links]);
  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateLinks(items);
  }
  const handleAddNew = (e) => {
    e.preventDefault();
    setAddNew(!addNew);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <div className="add-new-btn">
        <button className="text-btn" onClick={handleAddNew}>
          {!addNew ? (
            <>
              <AiFillPlusCircle style={{ marginRight: "5px" }} />
              Add New Link
            </>
          ) : (
            <>
              <AiFillCloseCircle style={{ marginRight: "5px" }} />
              Cancel
            </>
          )}
        </button>
      </div>
      {addNew && <AddNewForm updateLinks={updateLinks} />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {links.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="admin-card"
                      >
                        <PostItem
                          item={item}
                          index={index}
                          updateLinks={updateLinks}
                          links={links}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
function AddNewForm({ updateLinks }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { title: "", url: "" },
  });
  const onSubmit = (data) => {
    const id = encodeURI(kebabCase(data.title));
    var newItem = data;
    newItem.id = id;
    console.log(newItem);
    updateLinks((prev) => {
      var newState = [...prev];
      newState.push(newItem);
      return newState;
    });
    reset({ defaultValues: { title: "", url: "" } });
  };

  return (
    <form
      className="form-wrapper"
      onSubmit={handleSubmit(onSubmit)}
      style={{ marginBottom: "25px" }}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <p className="form-title">Title</p>
      <input className="form-input" defaultValue="" {...register("title")} />
      <p className="form-title">URL</p>
      <input className="form-input" defaultValue="" {...register("url")} />

      <button className="submit-btn" type="submit">
        {" "}
        Add
      </button>
    </form>
  );
}
function PostItem({ item, index, updateLinks, links }) {
  const [edit, setEdit] = useState(false);
  const editPost = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  return (
    <>
      <div onClick={editPost} className="admin-card-edit-wrapper">
        <div className="admin-card-title-url">
          <p className="link-title">{item.title}</p>
          <p className="link-url">{item.url}</p>
        </div>
        <div>
          <button className="edit-button">
            <FiEdit />
          </button>
        </div>
      </div>
      <div>
        {edit && (
          <EditForm
            defaultValues={item}
            index={index}
            updateLinks={updateLinks}
            links={links}
          />
        )}
      </div>
    </>
  );
}
function EditForm({ defaultValues, index, updateLinks }) {
  const { register, errors, handleSubmit, formState, reset, watch, getValues } =
    useForm({
      defaultValues,
      mode: "onChange",
    });
  const updateLink = () => {
    const values = getValues();
    updateLinks((prev) => {
      var newLinks = [...prev];
      newLinks[index].title = values.title;
      newLinks[index].url = values.url;
      return newLinks;
    });
  };
  const deleteLink = () => {
    updateLinks((prev) => {
      var newLinks = [...prev];
      newLinks.splice(index, 1);
      return newLinks;
    });
  };

  return (
    <form className="edit-form-wrapper" onSubmit={handleSubmit(updateLink)}>
      <p className="form-title">Title</p>
      <input className="form-input" name="title" {...register("title")}></input>
      <p className="form-title">URL</p>

      <input className="form-input" name="url" {...register("url")}></input>
      <div className="edit-buttons-wrapper">
        <button type="submit" className="submit-btn">
          Save
        </button>

        <button onClick={deleteLink} className="text-btn">
          Delete
        </button>
      </div>
    </form>
  );
}
