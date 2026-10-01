import type { ReactNode } from "react"
import {
    useForm,
    type DefaultValues,
    type FieldValues,
    type UseFormReturn
} from "react-hook-form"
import { FormHeadings } from "../Forms/FormHeadings"
import { usePostInsatnce } from "../CustomHooks/usePostInstance"

type BaseFormType<TValues extends FieldValues> = {
    action: "Add" | "Edit"
    title: string
    onClose: () => void
    endpoint: string
    queryKeys: string[][]            // match whatever MutationVariables expects
    defaultValues?: DefaultValues<TValues>
    children: (form: UseFormReturn<TValues>) => ReactNode
}

export function BaseForm<TValues extends FieldValues>({
    action,
    title,
    onClose,
    endpoint,
    queryKeys,
    defaultValues,
    children
}: BaseFormType<TValues>){

    const form = useForm<TValues>({ defaultValues })
    const mutation = usePostInsatnce<TValues>()

    const onSubmit = (values: TValues) => {
        mutation.mutate(
            { endpoint, values, queryKeys },
            {
                onSuccess: () => {
                    form.reset()
                    onClose()
                }
            }
        )
    }

    return(
        <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white w-[95%] h-[80%] self-center rounded overflow-y-auto"
        >
            <FormHeadings
                action={action}
                title={title}
                onClose={onClose}
            />

            <div className="py-4 px-80">
                {children(form)}

                {mutation.error &&
                    <p className="text-red-600 mb-4">{mutation.error.message}</p>
                }

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-green-800 text-white px-4 rounded h-12 w-30 cursor-pointer disabled:opacity-50"
                >
                    {mutation.isPending ? "Saving..." : `${action} ${title}`}
                </button>
            </div>
        </form>
    )
}