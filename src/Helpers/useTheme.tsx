import { PaletteMode } from '@mui/material';
import { useTheme, ThemeProvider, createTheme, Palette } from '@mui/material/styles';
import React, { useState, useMemo } from "react";
import { amber, deepOrange, grey } from '@mui/material/colors';

export const ColorModeContext = React.createContext({
    toggleColorMode: () => { }
});

const getDesignToken = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            ...amber,
            ...(mode === 'dark' && {
                main: "#f5f7fb",
            }),
        },
        sideBarBg: { ...(mode === "dark" ? { default: "#25212c" } : { default: "#ffffff" }) },
        iconSideBar: { ...(mode === "dark" ? { default: "#ffffff" } : { default: "#444444" }) },

        myChatBg: { ...(mode === 'dark' ? { default: "#2a292c" } : { default: '#f5f7fb' }) },
        myChatText: { ...(mode === 'dark' ? { default: "#ffffff" } : { default: '#434445' }) },
        myChatInputBg: { ...(mode === 'dark' ? { default: "#393939" } : { default: '#e6ebf5' }) },
        myChatUserBg: { ...(mode === 'dark' ? { default: "#505050" } : { default: '#e6ebf5' }) },
        myChatUserBgHover: { ...(mode === 'dark' ? { default: "#000000" } : { default: '#cfdbf2' }) },
        myChatUserText: { ...(mode === 'dark' ? { default: "#eaeaea" } : { default: '#495057' }) },

        chattingPageBg: { ...(mode === 'dark' ? { default: "#272727e8" } : { default: '#ffffff' }) },
        chattingPageTopText: { ...(mode === 'dark' ? { default: "#f0eff5" } : { default: '#6f7178' }) },
        chattingPageLeftUserBg: { ...(mode === 'dark' ? { default: "#565656" } : { default: '#f5f7fb' }) },
    },
})

export const ToggleColorMode = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme(getDesignToken(mode)),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode} >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


