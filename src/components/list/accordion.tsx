import React, { useState } from "react";
import Icon from "../icon";
import Item from "./item";

const Accordion = ({
  list,
  handleDelete,
  handleScraping,
}: {
  list: any;
  handleDelete: (id: string, item: string) => void;
  handleScraping: (id: string) => void;
}) => {
  const [show, setShow] = useState("");

  return (
    <div className="accordion my-3" id="accordionExample">
      {list.searches.map((x: any, index: number) => (
        <div className="accordion-item" key={x._id}>
          <h2 className="accordion-header d-flex" id={`heading-${x._id}`}>
            <button
              className="accordion-button"
              type="button"
              onClick={() => setShow(x._id)}
            >
              {decodeURI(x.title)}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => handleDelete(x._id, 'list')}
            >
              <Icon icon="trash" />
            </button>
          </h2>
          <div
            id={`collapse-${x._id}`}
            className={`accordion-collapse collapse ${
              show === x._id || (index === 0 && !show) ? "show" : ""
            }`}
          >
            <div className="accordion-body">
              <div className="row">
                {x.items.length > 0 &&
                  x.items.map((y: any) => (
                    <Item
                      key={y._id}
                      info={y}
                      handleDeleteItem={handleDelete}
                    />
                  ))}
                {x.items.length < 1 && (
                  <button
                    type="button"
                    onClick={() => handleScraping(x._id)}
                    className="btn btn-success w-25 m-auto"
                  >
                    Scrap the web 😁
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
