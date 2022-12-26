import { Modal } from '@mui/material'
import { styled } from "@mui/material/styles";

const ModalCutom = styled(Modal)({
    outline: "none",
    "&:focus": {
        outline: "none"
    },
    '& .Mui-selected': {
        outline: 'none',
        "&:focus": {
            outline: "none"
        },
    }
})
export default ModalCutom;
