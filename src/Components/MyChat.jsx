import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeSearchApi } from "./Redux/Searching/action";
import { useSelector } from "react-redux";
import { accessChat, makeRecentChatApi } from "./Redux/RecentChat/action";
import { selectChat } from "./Redux/Chatting/action";
import { removeSeenMsg } from "./Redux/Notification/action";

export const MyChat = () => {
  const [search, setSearch] = useState(false);
  const { search_result, loading, error } = useSelector(
    (store) => store.search
  );
  const { recent_chat, loading: chat_loading } = useSelector(
    (store) => store.recentChat
  );

  const { user, token } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const { notification, unseenmsg } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(makeRecentChatApi(token, user?._id));
  }, [user]);
  const ref = useRef();
  const handleQuery = (e) => {
    let id;
    return function (e) {
      if (!e.target.value) {
        setSearch(false);
        return;
      }
      if (ref.current) clearTimeout(ref.current);
      setSearch(true);
      ref.current = setTimeout(() => {
        dispatch(makeSearchApi(e.target.value));
      }, 1000);
    };
  };

  return (
    <div className="mychat-cont">
      <div>
        <div className="notification">
          <h2>Chats</h2>
          <NotificationsIcon />
          <Badge badgeContent={notification} color="error">
            <Notificationcomp />
          </Badge>
          {/* <AddIcon /> */}
        </div>
        <div className="search-cont">
          <SearchIcon />
          <input
            onChange={handleQuery()}
            type="text"
            placeholder="Search users"
          />
        </div>
      </div>
      <div className="recent-chat">
        <p className="Recent">Recent</p>
        <div className="recent-user">
          {search
            ? search_result.map((el) => (
              <SearchUserComp
                key={el._id}
                {...el}
                token={token}
                recent_chat={recent_chat}
                setSearch={setSearch}
              />
            ))
            : !chat_loading &&
            recent_chat.map((el, index) => (
              <ChatUserComp
                // key={el._id}
                index={index}
                {...el}
              // chattingwith={chatting._id}
              // id={user._id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default function Notificationcomp() {
  const { unseenmsg } = useSelector((store) => store.notification);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (unseenmsg.length !== 0) dispatch(removeSeenMsg([]));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <NotificationsIcon aria-describedby={id} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {!unseenmsg.length ? (
          <Typography sx={{ p: 2, width: 170 }}>No new messages.</Typography>
        ) : (
          unseenmsg.map((el, index) => (
            <Typography key={index} sx={{ p: 2, width: 170 }}>
              {el.sender.name + " " + el.content.substring(0, 15) + "..."}
            </Typography>
          ))
        )}
      </Popover>
    </div>
  );
}
const ChatUserComp = ({
  type,
  chatroom_title,
  profile_picture,
  members,
  lastest_message,
  _id,
  index
}) => {
  const { user } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const dispatch = useDispatch();
  const handleSelectChat = () => {
    dispatch(
      selectChat({
        type,
        chatroom_title,
        profile_picture,
        members,
        lastest_message,
        _id,
        index
      })
    );
  };
  return (
    <div
      onClick={handleSelectChat}
      className={chatting?._id == _id ? "user selectUser" : "user"}
    >
      <div className="history-cont">
        {(type === "group") ? (
          <div>{<Avatar>G</Avatar>}</div>
        ) : (
          // <div>{<Avatar src={users.find((el) => el._id != id)?.pic} />}</div>
          <div>{<Avatar>P</Avatar>}</div>
        )}
        <div>
          {(type === "group") ? (
            <p className="name">{chatroom_title || "No Name"}</p>
          ) : (
            <p className="name">{members.find((el) => el._id != user?._id)?.username}</p>
          )}
          <p className="chat">
            {lastest_message
              ? lastest_message?.length > 8
                ? lastest_message?.substring(0, 15) + " ..."
                : lastest_message
              : ""}
          </p>
        </div>
      </div>
      <div>
        {/* {lastest_message ? (
          <p className="time">
            {new Date(lastest_message?.updatedAt).getHours() +
              ":" +
              new Date(lastest_message?.updatedAt).getMinutes()}
          </p>
        ) : (
          ""
        )} */}
        <p className="unseen-chat">5</p>
      </div>
    </div>
  );
};

export const SearchUserComp = ({
  _id,
  email,
  name,
  pic,
  token,
  recent_chat,
  setSearch,
}) => {
  const dispatch = useDispatch();
  const handleSubmitForAcceChat = () => {
    dispatch(accessChat(_id, token, recent_chat));
    setSearch(false);
  };
  return (
    <div onClick={handleSubmitForAcceChat} className="user">
      <div className="history-cont">
        <div>{<Avatar src={pic} />}</div>
        <div>
          <p className="name">{name}</p>
          <p className="chat">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};
