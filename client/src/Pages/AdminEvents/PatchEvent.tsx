import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSpecificEvent, patchEvent } from "../../features/Events/api";
import type { PostEvent } from "../../features/Events/types";
import { queryClient } from "../../ReactQuery/queryClient";
import { PopUp } from "../../components/ui/Popup";
import { EventForm } from "./EventForm";
import { eventToFormValues } from "../../features/Events/helpers";

export function PatchEvent({ id, onClose }: { id: number; onClose: () => void }) {
  const { data: event } = useQuery({
    queryKey: ["events", id],
    queryFn: () => fetchSpecificEvent(id),
  })

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