import React, { useEffect, useState, useRef } from "react";
import "./dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import io from "socket.io-client";

import { actionCreators } from "../../redux/action-creators/index";
import instance from "../../utils/api";

import Message from "../../components/message";
import Conversation from "../../components/conversation";
import AddConversation from "../../components/addConversation";

io.connect(`${process.env.REACT_APP_BE}`);

export default function Dashboard(props) {
  const authState = useSelector((state) => state.auth);
  const changeState = useSelector((state) => state.change.count);
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({});
  const [currentOther, setCurrentOther] = useState("");
  const [userSearchList, setUserSearchList] = useState([]);

  const socket = useRef();
  const searchInput = useRef();
  const chatInput = useRef();
  const newest = useRef();

  const { conversationId } = useParams();

  const loginHandler = (e) => {
    e.preventDefault();

    socket.current.emit("disconnectSocket");

    logout(null);
  };

  const changeHandler = async (e) => {
    try {
      const { data } = await instance.get(
        `api/users/${searchInput.current.value}/${username}`
      );
      console.log(data);
      setUserSearchList(data);

      if (data === []) setUserSearchList([]);
    } catch (e) {
      setUserSearchList([]);
    }
  };

  const messageSendHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: authState.user.id,
      conversationId: conversationId,
      content: chatInput.current.value,
    };

    const receiverId = currentConversation.members.find(
      (member) => member !== authState.user.id
    );

    try {
      const { data } = await instance.post("/api/messages", message);
      setMessages([...messages, data]);
      chatInput.current.value = "";

      socket.current.emit("sendMessage", { data, receiverId });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    !authState.isAuthenticated && navigate("/login");
  }, [authState.isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const { data } = await instance.get(
          `api/users/get-username/${authState.user.id}`
        );
        setUsername(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUsername();
  }, [authState.user.id]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data } = await instance.get(
          `api/conversations/find/${authState.user.id}`
        );
        setConversations(data);

        const currCon = data.find((c) => c._id === conversationId);
        setCurrentConversation(currCon);

        searchInput.current.value = "";
        setUserSearchList([]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchConversations();
  }, [conversationId, changeState, authState.user.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await instance.get(`api/messages/${conversationId}`);

        const otherUser = currentConversation.members.find(
          (m) => m !== authState.user.id
        );
        const { data: otherName } = await instance.get(
          `api/users/get-username/${otherUser}`
        );

        setCurrentOther(otherName);
        setMessages(data);

        newest.current.scrollIntoView();
      } catch (e) {
        console.log(e);
      }
    };
    conversationId && fetchMessages();
  }, [authState.user.id, conversationId, conversations, currentConversation]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BE);
    socket.current.emit("addUser", authState.user.id);
  }, [authState.user.id]);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setMessages([...messages, data]);
    });

    newest.current.scrollIntoView();
  }, [messages]);

  return (
    <>
      <div className="dashboardContainer">
        <nav className="dashboardNavBar">
          <span>{username} |&nbsp;</span>
          <Link to="/login" onClick={loginHandler}>
            Log Out
          </Link>
        </nav>
        <nav className="dashboardNav">
          <img className="dashboardNavImg" src="/icon1.png" alt="logo" />
          <div className="dashboardNavSearch">
            <input
              type="text"
              className="dashboardNavSearchBar"
              placeholder="Add people"
              ref={searchInput}
              onChange={changeHandler}
            />
            <ul className="dashboardSearchList">
              {userSearchList
                ? userSearchList.map((u) => (
                    <AddConversation
                      key={u._id}
                      userItem={u}
                      me={authState.user.id}
                    />
                  ))
                : ""}
            </ul>
            <ul className="dashboardNavUl">
              {conversations.map((c) => (
                <Conversation
                  key={c._id}
                  conversation={c}
                  me={authState.user.id}
                  current={conversationId}
                />
              ))}
            </ul>
          </div>
        </nav>
        <div className="dashboardContent">
          <div className="dashboardChatTitle">
            <img src="/user-icon.png" alt="user" width="32px" />
            <span>{"" || currentOther}</span>
          </div>
          <div className="dashboardChatZone">
            {messages.map((m) => (
              <Message
                key={m._id}
                message={m}
                mine={authState.user.id === m.sender ? true : false}
              />
            ))}
            <div ref={newest} style={{ height: 0 }}></div>
          </div>
          <div className="dashboardChat">
            <form className="dashboardChatForm">
              <input
                type="text"
                className="dashboardChatInput"
                placeholder="Aa"
                ref={chatInput}
              />
              <button
                className="dashboardChatButton"
                onClick={messageSendHandler}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
