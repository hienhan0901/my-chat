import React from "react";
import { format } from "timeago.js";
export default function Message({ message, mine }) {
  return (
    <div className={`message ${mine ? "mineMsg" : ""}`}>
      <span className="messageContent">{message.content}</span>
      <span className="messageInfo">{format(message.createdAt)}</span>
    </div>
  );
}
