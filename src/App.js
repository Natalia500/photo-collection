import React, { useEffect, useState } from "react";
import "./app.scss";
import Main from "./components/Main/Main";
import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";

export const SearchContext = React.createContext();

function App() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";
    const pageLimit = `page=${page}`;

    fetch(
      `https://635e92eb03d2d4d47af1db93.mockapi.io/photos?${pageLimit}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <SearchContext.Provider
        value={{
          searchValue,
          setSearchValue,
          categoryId,
          setCategoryId,
          page,
          setPage,
        }}
      >
        <Header
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <div className="content">
          {isLoading ? (
            <Loading />
          ) : (
            collections
              .filter((obj) => {
                return obj.name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
              })
              .map((obj, index) => (
                <Main key={index} name={obj.name} images={obj.photos} />
              ))
          )}
        </div>
        <Pagination page={page} setPage={setPage} />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
