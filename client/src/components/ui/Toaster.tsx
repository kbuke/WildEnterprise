import { Toaster } from "react-hot-toast";

export function Toast(){
    return(
        <Toaster 
            position="top-right"
            reverseOrder={false}
            toastOptions={{
                duration: 4000
            }}
        />
    )
}