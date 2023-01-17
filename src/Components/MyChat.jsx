import "./components.scss"
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Badge, Grid, List, ListItem, ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeSearchApi } from "./Redux/Searching/action";
import { useSelector } from "react-redux";
import { accessChat, makeRecentChatApi } from "./Redux/RecentChat/action";
import { selectChat } from "./Redux/Chatting/action";
import { removeSeenMsg } from "./Redux/Notification/action";
import { getAllUsersByName } from "../Services/auth";
import { Box } from "@mui/system";
import CustomizedDialogs from "./GroupMode";
import { LightTooltip } from "./SideNavbar";

export const MyChat = () => {
  const dispatch = useDispatch();
  const { recent_chat, loading: chat_loading } = useSelector(
    (store) => store.recentChat
  );

  const { user } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const { notification, unseenmsg } = useSelector(
    (store) => store.notification
  );
  const [resultChatroom, setResultChatroom] = useState([])

  const debounce = (fn) => {
    let time;
    return (...args) => {
      const context = undefined;
      if (time) clearTimeout(time);
      time = setTimeout(() => {
        time = null;
        fn.apply(context, args);
      }, 500);
    };
  };

  const handleChangeInput = async (value) => {
    const resTemp = await getAllUsersByName({ string: value });
    (value === "") ? setResultChatroom([]) : setResultChatroom(resTemp);
  }

  const optimizedFn = useCallback(
    debounce(handleChangeInput),
    [],
  )

  useEffect(() => {
    dispatch(makeRecentChatApi(user?._id));
  }, [user]);

  const submitCreateNewChat = (friend) => {
    const payload = {
      lastest_message: "Chatroom has been created",
      members: [friend, user],
      type: "personal"
    };
    setResultChatroom([])
    dispatch(accessChat(payload, recent_chat));
  }


  return (
    <Box
      className="mychat-cont"
      sx={{
        bgcolor: "myChatBg.default",
        color: "text.primary",
      }}
    >

      <Box className="notification">
        <h2>Chats</h2>
        <LightTooltip placement="top" title="Groups">
          <CustomizedDialogs />
        </LightTooltip>
        <Badge badgeContent={notification} color="error">
          <Notificationcomp />
        </Badge>
        {/* <AddIcon /> */}
      </Box>
      <Box
        className="search_zone"
        sx={{
          position: "relative"
        }}>
        <Box
          className="search-cont"
          sx={{
            bgcolor: "myChatInputBg.default"
          }}
        >
          <SearchIcon />
          <input
            onChange={(e) => {
              optimizedFn(e.target.value);
            }}
            type="text"
            placeholder="Search users"
          />
        </Box>
        {resultChatroom?.length ?
          <Box className="search_res" >
            <List>
              {resultChatroom.map((u) => (
                <ListItem
                  onClick={() => submitCreateNewChat(u)}
                >
                  <ListItemButton>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar
                          src={u?.avatar}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography>
                          {u?.username}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </ListItem>
              ))
              }
            </List>
          </Box> : null}
      </Box>

      <div className="recent-chat">
        <p className="Recent">Recent</p>
        <div className="recent-user">
          {recent_chat.map((el, index) => (
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
    </Box>
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
            <Typography
              key={index}
              sx={{ p: 2, width: 170 }}
            >
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
  const currentFriend = members?.find((el) => (el?._id !== user?._id));

  return (
    <Box
      onClick={handleSelectChat}
      className={chatting?._id == _id ? "user selectUser" : "user"}
      sx={{
        bgcolor: chatting?._id == _id ? "myChatUserBgHover.default" : "myChatUserBg.default",
        '&:hover': {
          bgcolor: "myChatUserBgHover.default",
        },
      }}
    >
      <Box className="history-cont">
        {(type === "group") ? (
          <Box>{<Avatar src={profile_picture} />}</Box>
        ) : (
          <Box>{<Avatar src={currentFriend?.avatar} />}</Box>
        )}
        <Box
          sx={{
            color: "myChatUserText.default"
          }}
        >
          {(type === "group") ? (
            <Typography
              className="name"
            >{chatroom_title || "No Name"}</Typography>
          ) : (
            <Typography
              className="name"
            >{members.find((el) => el._id != user?._id)?.username}</Typography>
          )}
          <p className="chat">
            {lastest_message
              ? lastest_message?.length > 8
                ? lastest_message?.substring(0, 15) + " ..."
                : lastest_message
              : ""}
          </p>
        </Box>
      </Box>
      <Box>
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
      </Box>
    </Box>
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