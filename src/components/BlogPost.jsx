import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BlogPost = () => {
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(false);
  const allBlog = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-blog`,
        //{},
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        setLoading(false);
        setBlogData(response?.data?.data);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        setLoading(false);
        // handle error
        //setLoading(false);
        //   setMessage(error?.response?.data?.message);
        //   openSnackbar(error?.response?.data?.message);
        console.log(error);
      });
  };
  useEffect(() => {
    allBlog();
  }, []);
  return (
    <>
      {loading && (
        <div className="text-2xl font-bold text-center px-56 pt-24">
          <h1>LOADING.....</h1>
        </div>
      )}
      <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
          {blogData?.map((blog) => (
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article class="overflow-hidden rounded-lg shadow-lg">
                <a href={`/detail/${blog.id}`}>
                  <img
                    alt="Placeholder"
                    class="block h-72 w-full"
                    src={blog?.image}
                  />
                </a>

                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                  <h1 class="text-lg">
                    <a
                      class="no-underline hover:underline text-black"
                      href={`/detail/${blog.id}`}
                    >
                      {blog.title}
                    </a>
                  </h1>
                  <p class="text-grey-darker text-sm">
                    {new Date(blog?.CreatedAt).toLocaleString()}
                  </p>
                </header>

                <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    class="flex items-center no-underline hover:underline text-black"
                    href={`/detail/${blog.id}`}
                  >
                    <img
                      alt="Placeholder"
                      class="block rounded-full w-5 h-5"
                      src={blog?.image}
                    />
                    <p class="ml-2 text-sm">
                      {blog?.user?.first_name} {blog?.user?.last_name}
                    </p>
                  </a>
                  <a
                    class="no-underline text-grey-darker hover:text-red-dark"
                    href="#"
                  >
                    <span class="hidden">Like</span>
                    <i class="fa fa-heart"></i>
                  </a>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default BlogPost;
