import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import withError from "../withError";
import withLoading from "../withLoading";

function parseLinks(link) {
  const links = {};
  link.split(",").forEach(tuple => {
    const [url, id] = tuple.split(";");
    const name = id.split("=")[1].replaceAll('"', "");
    const pageNum = parseInt(url.split("=")[1].replaceAll(">", ""));
    links[name] = pageNum;
  });
  return links;
}

function updateData(posts, nav) {
  return { error: false, loading: false, posts, nav };
}

const initialState = {
  error: true,
  loading: true,
  posts: [],
  nav: {
    first: null,
    prev: null,
    next: null,
    last: null
  }
};
const PaginationContainer = () => {
  let { id } = useParams();
  let history = useHistory();
  let [data, setData] = useState(initialState);

  function goToPage(pageNum) {
    history.push(`/pagination/${pageNum}`);
    window.scrollTo(0, 0);
    setData(cur => ({ ...cur, loading: true }));
  }

  useEffect(() => {
    async function read() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${id}`
        );
        const posts = await response.json();
        setData(updateData(posts, parseLinks(response.headers.get("link"))));
      } catch (e) {
        console.log({ e });
        setData({ ...initialState, error: true, loading: false });
      }
    }
    read();
  }, [id]);

  return (
    <PaginationView
      error={data.error}
      errorFallback={<PaginationError />}
      loading={data.loading}
      loadingFallback={<PaginationLoading />}
      id={id}
      posts={data.posts}
      nav={data.nav}
      goToPage={goToPage}
    />
  );
};

const PaginationError = () => (
  <div>
    <p>
      Whoops! Something went wrong. Please make sure you are on a valid page
      number.
    </p>
  </div>
);

const PaginationLoading = () => <div>Loading...</div>;

const PaginationViewBase = ({ id, posts, nav, goToPage }) => (
  <div>
    <h3>Page {id}</h3>
    <h4>Posts</h4>
    <div>
      {posts.map(node => (
        <div key={node.id}>
          <div>ID: {node.id}</div>
          <div>User ID: {node.userId}</div>
          <div>Title: {node.title}</div>
          <div>Body: {node.body}</div>
          <hr />
        </div>
      ))}
    </div>
    {posts.length > 0 ? (
      <PageNav id={id} nav={nav} goToPage={goToPage} />
    ) : null}
  </div>
);
const PaginationView = withError(withLoading(PaginationViewBase));

const PageNav = ({ id, nav, goToPage }) => {
  function isDisabled(key) {
    return nav[key] === null || nav[key] === undefined;
  }
  return (
    <div>
      <button
        type="button"
        disabled={isDisabled("first")}
        onClick={() => goToPage(nav.first)}
      >
        {`First ${nav.first || ""}`}
      </button>
      <button
        type="button"
        disabled={isDisabled("prev")}
        onClick={() => goToPage(nav.prev)}
      >
        {`Prev ${nav.prev || ""}`}
      </button>
      <span>Current: {id}</span>
      <button
        type="button"
        disabled={isDisabled("next")}
        onClick={() => goToPage(nav.next)}
      >
        {`Next ${nav.next || ""}`}
      </button>
      <button
        type="button"
        disabled={isDisabled("last")}
        onClick={() => goToPage(nav.last)}
      >
        {`Last ${nav.last || ""}`}
      </button>
    </div>
  );
};

export default PaginationContainer;
