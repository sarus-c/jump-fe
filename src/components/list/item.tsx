import React from "react";
import Icon from "../icon";

const Item = ({
  info,
  handleDeleteItem,
}: {
  info: any;
  handleDeleteItem: (id: string, item: string) => void;
}) => (
  <div className="col-sm-4">
    <div className="card">
      <div className="row">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img className="thumb" src={info.img} alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body px-0">
            <h6 className="card-title">{info.title}</h6>
            <p className="card-text">
              <strong>Price:</strong> {info.price} lei
            </p>
            <button
              type="button"
              className="btn btn-warning me-2"
              onClick={() => handleDeleteItem(info._id, 'item')}
            >
              <Icon icon="trash" />
            </button>
            <a href={info.url} target="blank" className="btn btn-info">
              <Icon icon="link" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Item;
