import "./components.scss"
import Avatar from "@mui/material/Avatar";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CustomizedDialogs from "./GroupMode";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "./Redux/Auth/action";
import React, { useState } from "react";
import ProfileUserPanel from "./MiniComponents/ProfileUserPanel";
import { ColorModeContext } from "../Helpers/useTheme";
import { useTheme } from '@mui/material/styles';
import { Box } from "@mui/material";

export default function SideNavbar() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  console.log(theme.palette.mode);

  const [openUserProfile, setUserProfile] = useState(false);
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        bgcolor: "sideBarBg.default",
        color: "iconSideBar.default",
      }}
      className="side-nav"
    >
      <div>
        <Avatar
          onClick={() => { setUserProfile(true) }}
          src={user?.avatar}
        />
      </div>
      <div className="bottom-icon">
        <LightTooltip
          placement="top"
          title="Dark/Light Mode"
          onClick={colorMode.toggleColorMode}
        >
          <DarkModeOutlinedIcon />
        </LightTooltip>
        <LogoutIcon
          onClick={() => dispatch(logout())}
        />
      </div>

      <ProfileUserPanel
        open={openUserProfile}
        setOpen={setUserProfile}
      />
    </Box >
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
