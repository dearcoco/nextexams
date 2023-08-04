'use client'
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props {
    value: string;
}

const Button = ({value}: Partial<Props>) => {
    const {pending} = useFormStatus();
    return (
        <button disabled={pending} >
            {pending ? 'loading...' : value }
        </button>
    );
}

// const Button = ({value, ...props}) => {
//     const {pending} = useFormStatus();
//     return (
//         <button {...props} disabled={pending} >
//             {pending ? 'loading...' : value }
//         </button>
//     );
// }

export default Button;