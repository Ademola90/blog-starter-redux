import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "./blogsSlice";
import { selectAllUsers } from "../users/usersSlice";




const initialState = {
  title: "",
  body: "",
  userId: "",
};










const AddBlogForm = () => {
  const users = useSelector(selectAllUsers)


  const [form, setForm] = useState(initialState);

  const dispatch = useDispatch()

  const { title, body, userId } = form;

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUser = (e) => {
    const { value } = e.target;
    setForm({ ...form, userId: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      dispatch(addBlog(title, body, userId))
      setForm({ title: "", body: "", userId: "" });
    }
  };

  const isFill = Boolean(title) && Boolean(body) && Boolean(userId)

  return (
    <section className=" bg-[#007232] text-white px-5 py-10 rounded-md shadow-md">

      <h2 className=" mb-5">Add Blog</h2>
      <form onSubmit={onSubmit}>



        <label htmlFor="userId">User:</label>
        <select className="border-b-2 bg-transparent outline-none border-black text-black rounded-md px-2" id="userId" value={userId} onChange={handleUser}>
          <option value=""></option>
          {usersOption}
        </select>
        <label htmlFor="title" className=" mb-3">Title:</label>
        <input
          placeholder="Enter your blog title"
          className=" border-b-2 bg-transparent outline-none text-white border-black rounded-md px-2"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <label htmlFor="body" className="mb-3">Body:</label>
        <textarea placeholder="Enter your message" className=" text-white bg-transparent border-b-2 outline-none border-black rounded-md px-2" id="body" name="body" value={body} onChange={handleChange} />
        <button disabled={!isFill} type="submit" className="bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddBlogForm;
