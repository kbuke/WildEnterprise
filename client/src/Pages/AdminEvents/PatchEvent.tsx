import { useMutation } from "@tanstack/react-query";
import { patchEvent } from "../../features/Events/api";
import type { PostEvent, SpecificEvent } from "../../features/Events/types";
import { queryClient } from "../../ReactQuery/queryClient";
import { PopUp } from "../../components/ui/Popup";
import { EventForm } from "./EventForm";
import { eventToFormValues } from "../../features/Events/helpers";

type PatchEventProps = {
  event: SpecificEvent,
  onClose: () => void
}

export function PatchEvent({event, onClose}: PatchEventProps){
  const {id} = event

  const update = useMutation({
    mutationFn: (changes: Partial<PostEvent>) => patchEvent(id, changes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] }) // also covers ["events", id]
      onClose()
    },
  })

  if (!event) return null // or a spinner

  return (
    <PopUp
      child={
        <EventForm
          mode="Patch"
          defaultValues={eventToFormValues(event)}
          onSubmit={update.mutate}
          onClose={onClose}
          isPending={update.isPending}
          errorMessage={update.error?.message}
        />
      }
    />
  )
}