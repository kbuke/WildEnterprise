import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form"
import type { PostEvent } from "../../features/Events/types"
import { Inputs } from "../../components/ui/Inputs"
import { fetchAllParks } from "../../features/Parks/api"
import { useQuery } from "@tanstack/react-query"
import { Select } from "../../components/ui/Select"
import { Checkbox } from "../../components/ui/Checkbox"
import { CardForm } from "../../components/form/CardInstance"

type AddEventProps = {
  register: UseFormRegister<PostEvent>
  errors: FieldErrors<PostEvent>
  watch: UseFormWatch<PostEvent>
}

export function AddEvent({ register, errors, watch }: AddEventProps) {
  const { data: allParks } = useQuery({
    queryFn: fetchAllParks,
    queryKey: ["parks"],
  })

  const isMultiDay = watch("multiDayEvent")

  return (
    <div>
      <CardForm register={register} errors={errors} entityName="Event" />

      <Select
        label="Park"
        error={errors.parkId?.message}
        {...register("parkId", {
          required: "Select a park",
          valueAsNumber: true,
        })}
      >
        <option value="">Select a park</option>
        {allParks?.map((park) => (
          <option key={park.id} value={park.id}>
            {park.name}
          </option>
        ))}
      </Select>

      <Inputs
        label="Start Date"
        type="date"
        error={errors.startDate?.message}
        {...register("startDate", { required: "Start date is required" })}
      />

      <Checkbox
        variableName="multiDayEvent"
        register={register}
        label="Multi-day event"
      />

      {isMultiDay && (
        <Inputs
          label="End Date"
          type="date"
          error={errors.endDate?.message}
          {...register("endDate", {
            required: "End date is required for multi-day events",
          })}
        />
      )}

      <Inputs
        label="Start Time"
        type="time"
        error={errors.startTime?.message}
        {...register("startTime", { required: "Start time is required" })}
      />

      <Inputs
        label="End Time"
        type="time"
        error={errors.endTime?.message}
        {...register("endTime", { required: "End time is required" })}
      />

      <Inputs
        label="Number of Tickets"
        type="number"
        min={1}
        error={errors.noOfTickets?.message}
        {...register("noOfTickets", {
          required: "Required",
          valueAsNumber: true,
          min: { value: 1, message: "Must be at least 1" },
        })}
      />

      <Inputs
        label="Ticket Price (ZAR)"
        type="number"
        min={0}
        error={errors.ticketPrice?.message}
        {...register("ticketPrice", {
          required: "Required",
          valueAsNumber: true,
          min: { value: 0, message: "Can't be negative" },
        })}
      />
    </div>
  )
}
