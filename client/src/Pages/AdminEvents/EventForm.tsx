import { useForm } from "react-hook-form"
import { GenericForm } from "../../components/form/GenericForm"
import { AddEvent } from "./AddEvent"
import { cleanEventPayload, pickDirty } from "../../features/Events/helpers"
import type { PostEvent } from "../../features/Events/types"

type EventFormProps = {
  mode: "Post" | "Patch"
  defaultValues?: Partial<PostEvent>
  onSubmit: (data: Partial<PostEvent>) => void
  onClose: () => void
  isPending: boolean
  errorMessage?: string
}

export function EventForm({
  mode, defaultValues, onSubmit, onClose, isPending, errorMessage,
}: EventFormProps) {
  const {
    register, handleSubmit, watch,
    formState: { errors, dirtyFields },
  } = useForm<PostEvent>({ defaultValues })

  const submit = handleSubmit((data) => {
    const clean = cleanEventPayload(data)
    onSubmit(mode === "Patch" ? pickDirty(clean, dirtyFields) : clean)
  })

  return (
    <GenericForm
      postOrPatch={mode}
      instance="Events"
      inputs={<AddEvent register={register} errors={errors} watch={watch} />}
      onSubmit={submit}
      onClose={onClose}
      isPending={isPending}
      errorMessage={errorMessage}
    />
  )
}