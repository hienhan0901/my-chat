import React from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../utils/api";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/action-creators";

export default function AddConversation({ userItem, me }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateChange } = bindActionCreators(actionCreators, dispatch);

  const addHandler = async (e) => {
    e.preventDefault();

    const body = {
      receiver: userItem._id,
    };
    try {
      const { data } = await instance.post(`api/conversations/${me}`, body);
      updateChange();
      data && navigate(`/${data._id}`, { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li>
      <Link onClick={addHandler} to="/">
        <div>
          <div>+ {userItem.username}</div>
        </div>
      </Link>
    </li>
  );
}
