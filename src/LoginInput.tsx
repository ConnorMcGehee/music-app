import { OutlinedInput } from "@mui/material";

interface LoginInputProps {
    type: string,
    placeholder: string,
}

function LoginInput({ type, placeholder }: LoginInputProps) {
    return (
        <OutlinedInput type={type} placeholder={placeholder} required={true} sx={{
            display: 'block',
            width: "100%",
            paddingRight: "2rem"
        }} />
    );
}

export default LoginInput;