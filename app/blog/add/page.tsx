"use client";
import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const res = fetch("http://localhost:3000/api/blog", {
    method: "POST",
    body: JSON.stringify({ title, description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending request...🔃🔃🔃", { id: "1" });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
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
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4 ">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add a Wonderful Blog 🚀
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
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;
