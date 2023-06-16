"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
type updateBlogParams = {
  title: string;
  description: string;
  id: string;
};

const updateBlog = async (data: updateBlogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getBlogbyId = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  console.log(params.id);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    toast.loading("featching blog details...", { id: "1" });
    getBlogbyId(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("featching Complete");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });

    // toast.custom((t) => (
    //     <div
    //       className={`bg-white px-6 py-4 shadow-md rounded-full ${
    //         t.visible ? 'animate-enter' : 'animate-leave'
    //       }`}
    //     >
    //       Hello TailwindCSS! 👋
    //     </div>
    //   ))
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending request...🔃🔃🔃", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Blog Posted Successfully...📝📝📝", { id: "1" });
      router.push("/");
    }
    // Clear the input fields
    //@ts-ignore
    titleRef.current.value = "";
    //@ts-ignore
    descriptionRef.current.value = "";
  };

  const handleDelete = async (e: any) => {
    toast.loading("Deleting Blog....", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blod Deleted....", { id: "2" });
    router.push("/");
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit the Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              type="text"
              placeholder="Enter Title"
              className="rounded-md px-4 py-2 my-2 w-full "
            ></input>
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto my-2 hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto mt-2 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
