import type { ReactNode, FormEventHandler } from "react"

type FormProps = {
    postOrPatch: "Post" | "Patch"
    instance: string
    inputs: ReactNode
    onSubmit: FormEventHandler<HTMLFormElement>
    onClose: () => void
    isPending?: boolean
    errorMessage?: string
    title?: string
    submitLabel?: string
    className?: string
    draft?: boolean
    onSaveDraft?: () => void
}

export function GenericForm({
    postOrPatch,
    instance,
    inputs,
    onSubmit,
    onClose,
    isPending = false,
    errorMessage,
    title,
    submitLabel,
    className,
    draft = false,
    onSaveDraft
}: FormProps){
    return(
        <form
            onSubmit={onSubmit}
            className={className ?? "bg-white h-[90%] w-[60%] rounded flex flex-col px-10 py-4 overflow-auto"}
        >
            <h1 className="text-center uppercase font-bold text-3xl mb-4">
                {title ?? `${postOrPatch === "Post" ? "Add" : "Edit"} ${instance}`}
            </h1>

            {inputs}

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <div className="flex gap-10">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-green-800 text-white px-10 py-2 rounded cursor-pointer disabled:opacity-60"
                >
                    {isPending ? "Saving..." : submitLabel ?? (postOrPatch === "Post" ? "Add" : "Edit")}
                </button>

                {draft && (
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onSaveDraft}
                        className="bg-yellow-600 text-white px-10 py-2 rounded cursor-pointer disabled:opacity-60"
                    >
                        Save as Draft
                    </button>
                )}

                <button
                    type="button"
                    onClick={onClose}
                    className="bg-red-800 text-white px-10 py-2 rounded cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}


// import type { FormEventHandler, ReactNode } from "react"

// type FormProps = {
//     postOrPatch: "Post" | "Patch",
//     instance: string,
//     inputs: ReactNode,
//     onSubmit: FormEventHandler<HTMLFormElement>,
//     onClose: () => void,
//     isPending?: boolean,
//     errorMessage?: string
//     title?: string
//     submitLabel?: string
// }

// export function GenericForm({
//     postOrPatch,
//     instance,
//     inputs,
//     onSubmit,
//     onClose,
//     isPending = false,
//     errorMessage
// }: FormProps){
//     return(
//         <form
//             onSubmit={onSubmit}
//             className="bg-white h-[90%] w-[60%] rounded flex flex-col px-10 py-4 overflow-auto"
//         >
//             <h1
//                 className="text-center uppercase font-bold text-3xl mb-4"
//             >
//                 {postOrPatch === "Post" ? "Add" : "Edit"} {instance}
//             </h1>

//             {inputs}

//             {errorMessage && <p className="text-red-600">{errorMessage}</p>}

//             <div
//                 className="flex gap-10"
//             >
//                 <button 
//                     type="submit" 
//                     disabled={isPending}
//                     className="bg-green-800 text-white px-10 py-2 rounded cursor-pointer"
//                 >
//                     {isPending ? "Saving..." : postOrPatch === "Post" ? "Add" : "Edit"}
//                 </button>

//                 <button 
//                     type="button" 
//                     onClick={onClose}
//                     className="bg-red-800 text-white px-10 py-2 rounded cursor-pointer"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     )
// }