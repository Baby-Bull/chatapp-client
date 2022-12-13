import Avatar from "@mui/material/Avatar";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useSelector } from "react-redux";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "@emotion/styled";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CustomizedDialogs from "./GroupMode";
import { logout } from "./Redux/Auth/action";
export default function SideNavbar() {
  const { user, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="side-nav">
      <div>
        <Avatar src={user.pic} />
      </div>
      <div className="mid-icon">
        <LightTooltip title="Profile" placement="top">
          <AccountCircleOutlinedIcon />
        </LightTooltip>
        <LightTooltip placement="top" title="Chats">
          <ChatOutlinedIcon />
        </LightTooltip>
        {/* <LightTooltip placement="top" title="Groups"> */}
        <CustomizedDialogs />
        {/* </LightTooltip> */}
        <LightTooltip placement="top" title="Contacts">
          <AssignmentIndOutlinedIcon />
        </LightTooltip>
        <LightTooltip placement="top" title="Settings">
          <SettingsOutlinedIcon />
        </LightTooltip>
      </div>
      <div className="bottom-icon">
        <LanguageOutlinedIcon />
        <LightTooltip placement="top" title="Dark/Light Mode">
          <DarkModeOutlinedIcon />
        </LightTooltip>
        <LogoutIcon onClick={() => logout()} />
      </div>
    </div>
  );
}

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    fontSize: 13,
  },
}));
