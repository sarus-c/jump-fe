import React, { useState } from "react";
import Icon from "../icon";
import Info from "../info";
import Item from "./item";

const Accordion = ({
  list,
  termIds,
  handleDelete,
  handleCheckCollector
}: {
  list: any;
  termIds: string[];
  handleDelete: (id: string, item: string) => void;
  handleCheckCollector: (e:any) => void;
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
            <div className="accordion-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={x._id}
                onChange={handleCheckCollector}
                checked={termIds.indexOf(x._id) > -1}
              />
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => handleDelete(x._id, "list")}
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
                  <Info msg={'No items for this search term'} />
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
