import React, { useState, useEffect } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import withLoading from "../withLoading";

const initialState = {
  error: false,
  loading: true,
  posts: []
};
const SortContainer = () => {
  const [sort, setSort] = useQueryParam("sort", StringParam);
  const [order, setOrder] = useQueryParam("order", StringParam);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    async function read() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_sort=${sort}&_order=${order}`
      );
      const posts = await response.json();
      setData({ error: false, loading: false, posts });
    }
    read();
  }, [sort, order]);

  function updateSort(key) {
    setData({ error: false, loading: true, posts: [] });
    if (key === sort) {
      setOrder(cur => (cur === "asc" ? "desc" : "asc"));
    } else {
      setSort(key);
      setOrder("asc");
    }
  }

  return (
    <div>
      <h3>Sort</h3>
      <div>
        <div>Sort by:</div>
        <button type="button" onClick={() => updateSort("id")}>
          ID
        </button>
        <button type="button" onClick={() => updateSort("userId")}>
          User ID
        </button>
        <button type="button" onClick={() => updateSort("title")}>
          Title
        </button>
        <button type="button" onClick={() => updateSort("body")}>
          Body
        </button>
      </div>
      <div>
        Sorting By: {sort} Order: {order}
      </div>
      <ListView
        loading={data.loading}
        loadingFallback={<div>Loading...</div>}
        posts={data.posts}
      />
    </div>
  );
};

const ListViewBase = ({ posts }) => (
  <div>
    {posts.map(node => (
      <div key={node.id}>
        <hr />
        <div>ID: {node.id}</div>
        <div>User ID: {node.userId}</div>
        <div>Title: {node.title}</div>
        <div>Body: {node.body}</div>
      </div>
    ))}
  </div>
);

const ListView = withLoading(ListViewBase);

export default SortContainer;
