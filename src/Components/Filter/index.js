import React, { useState, useEffect } from "react";
import { useQueryParam, StringParam } from "use-query-params";
import { useHistory } from "react-router-dom";
import withEmptyList from "../withEmptyList";
import withLoading from "../withLoading";

const EMPTY_OPTION = "";
const EMPTY_OPTION_TEXT = "Select";
const initialState = {
  error: false,
  loading: true,
  posts: []
};
const FilterContainer = () => {
  const history = useHistory();
  const [userId, setUserId] = useQueryParam("userId", StringParam);
  const [options, setOptions] = useState(null);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    async function read() {
      const response = await fetch(
        userId === undefined || userId === EMPTY_OPTION
          ? "https://jsonplaceholder.typicode.com/posts"
          : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const posts = await response.json();
      setData({
        error: false,
        loading: false,
        posts
      });
    }
    read();
  }, [userId]);

  useEffect(() => {
    async function read() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await response.json();
      let distinctUserIds = [EMPTY_OPTION];
      posts.forEach(post => {
        if (!distinctUserIds.includes(post.userId)) {
          distinctUserIds.push(post.userId);
        }
      });
      setOptions(distinctUserIds);
    }
    read();
  }, []);

  function setFilter(event) {
    const uId = event.target.value;
    setData(current => ({ ...current, error: false, loading: true }));
    if (uId === EMPTY_OPTION) {
      history.push("/filter");
    } else {
      setUserId(uId);
    }
  }

  return (
    <div>
      <h4>Filter</h4>
      {options === null ? null : (
        <>
          <label htmlFor="filter">Filter:</label>
          <select
            name="filter"
            id="filter"
            value={userId || ""}
            onChange={setFilter}
          >
            {options.map(uId => (
              <option key={uId} value={uId}>
                {getSelectText(uId)}
              </option>
            ))}
          </select>
        </>
      )}
      <ListView
        loading={data.loading}
        loadingFallback={<div>Loading...</div>}
        length={data.posts.length}
        emptyFallback={<Empty />}
        posts={data.posts}
      />
    </div>
  );
};

const Empty = () => <div>No posts found.</div>;

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
const ListView = withLoading(withEmptyList(ListViewBase));

function getSelectText(text) {
  return text === EMPTY_OPTION ? EMPTY_OPTION_TEXT : text;
}

export default FilterContainer;
