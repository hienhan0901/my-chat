import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../utils/api";

export default function Conversation({ conversation, me, current }) {
  const [other, setOther] = useState("");
  const otherUser = conversation.members.find((m) => m !== me);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const { data } = await instance.get(
          `api/users/get-username/${otherUser}`
        );
        setOther(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchName();
  }, [otherUser]);

  return (
    <li>
      <Link to={`/${conversation._id}`} replace>
        <div
          className={current === conversation._id ? "currentConversation" : ""}
        >
          <img src="/user-icon.png" alt="user" width="32px" />
          <div>{other}</div>
        </div>
      </Link>
    </li>
  );
}
