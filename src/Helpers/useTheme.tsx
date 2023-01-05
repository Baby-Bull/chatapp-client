import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import React, { useState, useMemo } from "react";

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ToggleColorMode({ children }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
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
