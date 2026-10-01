import { useState } from "react"
import { AdminPgHeader } from "../../../../CustomComponents/AppAdminComponents/AdminPgHeader"
import { AdminHomeButton } from "../../../../CustomComponents/AppAdminComponents/AdminHomeButton"
import { useAllParks } from "../../../../FetchInstances/FetchParks"
import { AdminCard } from "../../../../CustomComponents/AppAdminComponents/AdminCards"
import { PopUp } from "../../../../CustomComponents/Popup"
import { ParkInfoForm } from "../../../../Forms/ParkInfoForm"
import { AdminPopUpInfo } from "../../../../CustomComponents/AppAdminComponents/AdminInfoPopUpInfo"
import { SpecificParkInfoPopUp } from "./AdminSpecificPark/SpecificParkInfoPopUp"
import { RenderIcon } from "../../../../CustomComponents/Icons"

const parkCats = ["Info", "Img", "Activities", "Events", "Hotels", "Finance"] as const
type ParkCatType = typeof parkCats[number]

export function AppAdminAllParks() {
  const [parkAction, setParkAction] = useState<
    null | "Post" | "Patch" | "Delete" | "Info"
  >()
  const [selectedParkId, setSelectedParkId] = useState<number>()
  const [selectedParkName, setSelctedParkName] = useState<string>()
  const [selectedInfoCat, setSelectedInfoCat] = useState<ParkCatType>("Info")

  const { data: parks, isLoading, error } = useAllParks()

  if (isLoading) return <p>Fetching Parks...</p>
  if (error) return <p>Error fetching Parks</p>

  return (
    <section>
      <AdminPgHeader
        header="Parks"
        addButtonHeader="Parks"
        setAddInstance={() => setParkAction("Post")}
      />

      <AdminHomeButton />

      {parks && (
        <AdminCard
          cardArray={parks}
          onEdit={(id, name) => {
            setSelectedParkId(id)
            setParkAction("Patch")
            setSelctedParkName(name)
          }}
          onDelete={(id, name) => {
            setSelectedParkId(id)
            setParkAction("Delete")
            setSelctedParkName(name)
          }}
          onInfo={(id, name) => {
            setSelectedParkId(id)
            setParkAction("Info")
            setSelctedParkName(name)
          }}
        />
      )}

      {parkAction === "Post" && (
        <PopUp
          children={
            <ParkInfoForm onClose={() => setParkAction(null)} action="Post" />
          }
        />
      )}

      {parkAction === "Info" && selectedParkId && selectedParkName && (
        <PopUp>
          children=
          {
            <AdminPopUpInfo<ParkCatType>
              navs={parkCats.map((cat) => RenderIcon(cat))}
              title={selectedParkName}
              onClose={() => setParkAction(null)}
              onNavSelect={setSelectedInfoCat}
              navSelect={selectedInfoCat}
          >
              <SpecificParkInfoPopUp id={selectedParkId} cat={selectedInfoCat} />
          </AdminPopUpInfo>
          }
        </PopUp>
      )}
    </section>
  )
}
