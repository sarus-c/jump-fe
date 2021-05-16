import React, { useState } from "react";
import { isValidUrl } from "../../utils";

const Search = ({ handleInfo }: { handleInfo: () => void }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const canSubmit = title && url ? false : true;

  const handleTitle = (e: any) => {
    const t = e.target.value;
    if (t.trim().length > 0 || title.trim().length > 0) {
      setTitle(t);
    }
  };

  const handleUrl = (e: any) => {
    const u = e.target.value;
    if (u.trim().length > 0) {
      setUrl(u.trim());
    }
  };

  const handleError = () => {
    setError(1);
  };

  const submit = () => {
    if (
      title.trim().length < 5 ||
      title.trim().length > 100 ||
      url.trim().length < 20 ||
      !isValidUrl(url.trim())
    ) {
      setError(1);
    } else {
      setDisabled(true);

      // POST request using fetch inside useEffect React hook
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: encodeURI(title), url: encodeURI(url) }),
      };
      fetch(process.env.REACT_APP_API_SEARCH_CREATE || '', requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          setTitle('');
          setUrl('');
          handleInfo();
          setDisabled(false);
          console.log("Response", data);
        })
        .catch((error) => {
          setError(2);
          setDisabled(false);
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <form className="py-3">
      <fieldset disabled={disabled}>
        {error !== 0 && (
          <div className="row">
            <div className="col">
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <ul className="mb-0">
                  {error === 1 && (
                    <li>
                      Invalid <strong>Title</strong> or invali{" "}
                      <strong>URL</strong> or both
                    </li>
                  )}
                  {error === 2 && <li>There was an error!</li>}
                </ul>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={handleError}
                ></button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-3 row">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Search Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              minLength={5}
              maxLength={100}
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="title"
              value={title}
              onChange={handleTitle}
            />
            <div className="form-text">
              Title: required, min-length:5, max-length:100
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="url" className="col-sm-2 col-form-label">
            Search URL
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              minLength={20}
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="url"
              value={url}
              onChange={handleUrl}
            />
            <div className="form-text">
              URL: required, min-length:20, valid URL
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-sm-10">
            <button
              onClick={submit}
              type="button"
              className="btn btn-primary"
              disabled={canSubmit}
            >
              Add Search Term
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default Search;
