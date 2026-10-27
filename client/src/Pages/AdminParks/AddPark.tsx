import type { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import type { PostPark } from "../../features/Parks/types"
import { CardForm } from "../../components/form/CardInstance"
import { Select } from "../../components/ui/Select"
import { Checkbox } from "../../components/ui/Checkbox"
import { Inputs } from "../../components/ui/Inputs"

const PROVINCES = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Western Cape",
] as const

type AddParkProps = {
  register: UseFormRegister<PostPark>
  errors: FieldErrors<PostPark>
  watch: UseFormWatch<PostPark>
}

export function AddPark({ register, errors, watch }: AddParkProps) {

  const availableAccomodation = watch("accomodation")

  return (
    <div>
      <CardForm register={register} errors={errors} entityName="Park" />

      <Select
        label="Location"
        error={errors.location?.message}
        {...register("location", { required: "Select a province" })}
      >
        <option value="">Select a province</option>
        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
      </Select>

      <Checkbox 
        variableName="accomodation"
        register={register}
        label="Available Accomodation?"
      />

      {availableAccomodation &&
        <>
          <Inputs 
            label="Email Address"
            placeholder="Please enter accomodation email address"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email address is required for the accomodation"
            })}
          />

          <Inputs 
            label="Password"
            placeholder="Please enter accomodation password"
            type="password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required for accomodation"
            })}
          />
        </>
      }
    </div>
  )
}
