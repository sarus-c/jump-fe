import React, { useCallback, useEffect, useState } from "react";
import Accordion from "./accordion";
import NoItems from "./noItems";
import Spinner from "../spinner";
import Error from "../error";
import "./list.css";

const List = ({
  handleInfo,
  reload,
}: {
  handleInfo: () => void;
  reload: boolean;
}) => {
  const [list, setList] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [termIds, setTermIds] = useState<string[]>([]);

  const getData = (loading: boolean) => {
    if (loading) setLoading(true);
    // GET request using fetch with error handling
    fetch(process.env.REACT_APP_API_SEARCH || "")
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setList(data);
        if (loading) setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log("There was an error!", error);
      });
  };

  const handleCheckCollector = useCallback(
    (e) => {
      const terms = new Set(termIds);
      const el = e.target;

      if (el.checked) {
        terms.add(el.value);
      } else {
        terms.delete(el.value);
      }
      const termsArr = Array.from(terms);

      setTermIds(termsArr);
      console.log(termsArr);
    },
    [termIds]
  );

  const handleError = useCallback(() => {
    setError(false);
  }, []);

  const handleDelete = useCallback(
    (id: string, item: string) => {
      const url =
        item === "item"
          ? process.env.REACT_APP_API_ITEMS_DELETE
          : process.env.REACT_APP_API_SEARCH_DELETE;
      // DELETE request using fetch with error handling
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          handleInfo();
        })
        .catch((error) => {
          setError(true);
          console.error("There was an error!", error);
        });
    },
    [handleInfo]
  );

  const handleCollectors = () => {
    const termsUrl = list.searches.map((x: any) =>
      termIds.indexOf(x._id) > -1 ? `${x.url}##${x._id}` : null
    );

    handleScraping(termsUrl.filter(Boolean));
  };

  const handleScraping = (urls: string[]) => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_SCRAP}`, {
      method: "POST",
      body: JSON.stringify({ search_urls: urls }),
    })
      .then(async (response) => {
        // const data = await response.json();

        // check for error response
        if (!response.ok) {
          setError(true);
        } else {
          handleInfo();
        }

        setLoading(false);
        setTermIds([]);
      })
      .catch((error) => {
        setError(true);
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getData(true);
  }, []);

  useEffect(() => {
    if (reload) {
      setLoading(true);
      getData(false);
    } else {
      setLoading(false);
    }
  }, [reload]);

  return (
    <>
      {error && !loading && <Error handleError={handleError} />}
      {loading && !error && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
      {list.count === 0 && !loading && !error && <NoItems />}
      {list.count > 0 && !error && (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCollectors}
              disabled={termIds.length < 1}
            >
              Run collector for selected terms
            </button>
          </div>

          <Accordion
            list={list}
            termIds={termIds}
            handleDelete={handleDelete}
            handleScraping={handleScraping}
            handleCheckCollector={handleCheckCollector}
          />
        </>
      )}
    </>
  );
};

export default List;
