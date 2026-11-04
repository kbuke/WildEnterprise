import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Inputs } from "../../components/ui/Inputs"
import { TextAreas } from "../../components/ui/TextAreas"
import { PopUp } from "../../components/ui/Popup"
import { GenericForm } from "../../components/form/GenericForm"
import { LocalCheckbox } from "../../components/ui/Checkbox"
import { ToggleList } from "../../components/ui/ToggleList"
import { postArticle } from "../../features/Articles/api"
import { fetchAllEvents } from "../../features/Events/api"
import { fetchAllParks } from "../../features/Parks/api"
import type { ArticleStatus } from "../../features/Articles/types"
import { queryClient } from "../../ReactQuery/queryClient"
import { fetchAllProjects } from "../../features/Projects/api"
import { RelationSelector } from "../../components/ui/RelationSelector"

type Props = { openClose: () => void }
type FormValues = { title: string; img: string; text: string }

const toggle = (list: number[], id: number) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id]

export function AddArticle({ openClose }: Props) {
    const [addParks, setAddParks] = useState(false)
    const [addEvents, setAddEvents] = useState(false)
    const [addProjects, setAddProjects] = useState(false)
    const [parkIds, setParkIds] = useState<number[]>([])
    const [eventIds, setEventIds] = useState<number[]>([])
    const [projectIds, setProjectIds] = useState<number[]>([])

    // Which button was pressed. A ref (not state) so validation sees it immediately.
    const intent = useRef<ArticleStatus>("Draft")

    const { data: allEvents } = useQuery({ queryKey: ["events"], queryFn: fetchAllEvents })
    const { data: allParks } = useQuery({ queryKey: ["parks"], queryFn: fetchAllParks })
    const { data: allProjects } = useQuery({queryKey: ["projects"], queryFn: fetchAllProjects})

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

    // Drafts only need a title; publishing needs everything
    const requiredToPublish = (message: string) => (v: string) =>
        intent.current === "Draft" || !!v?.trim() || message

    const createArticle = useMutation({
        mutationFn: postArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["articles"] })
            openClose()
        },
    })

    const submit = handleSubmit((v) => {
        createArticle.mutate({
            title: v.title.trim(),
            // empty strings are left out so a draft saves with these as null
            img: v.img?.trim() || undefined,
            text: v.text?.trim() || undefined,
            status: intent.current,
            parkIds,
            eventIds,
            projectIds
        })
    })

    // Publish button, or pressing Enter in an input
    const publish = (e: FormEvent<HTMLFormElement>) => {
        intent.current = "Published"
        return submit(e)
    }

    // Save as Draft button
    const saveDraft = () => {
        intent.current = "Draft"
        submit()
    }

    const inputs = (
        <div>
            <Inputs
                label="Article Title"
                placeholder="Please enter article title"
                type="text"
                error={errors.title?.message}
                {...register("title", { required: "A title is required, even for a draft" })}
            />

            <Inputs
                label="Article Image"
                placeholder="Please enter article image url"
                type="text"
                error={errors.img?.message}
                {...register("img")}
            />

            <TextAreas
                label="Article Text"
                placeholder="Please enter article here"
                rows={10}
                error={errors.text?.message}
                {...register("text", { validate: requiredToPublish("Article text is required to publish") })}
            />

            <RelationSelector
                variableName="addParks"
                label="Is this article associated with any parks?"
                checked={addParks}
                onCheckedChange={(on) => {
                    setAddParks(on)
                    if (!on) setParkIds([])
                }}
                items={allParks ?? []}
                selected={parkIds}
                onToggle={(id) => setParkIds((l) => toggle(l, id))}
                emptyText="No parks yet."
            />

            <RelationSelector
                variableName="addEvents"
                label="Is this article associated with any events?"
                checked={addEvents}
                onCheckedChange={(on) => {
                    setAddEvents(on)
                    if (!on) setEventIds([])
                }}
                items={allEvents ?? []}
                selected={eventIds}
                onToggle={(id) => setEventIds((l) => toggle(l, id))}
                emptyText="No events yet."
            />

            <RelationSelector
                variableName="addProjects"
                label="Is this article associated with any projects?"
                checked={addProjects}
                onCheckedChange={(on) => {
                    setAddProjects(on)
                    if (!on) setProjectIds([])
                }}
                items={allProjects ?? []}
                selected={projectIds}
                onToggle={(id) => setProjectIds((l) => toggle(l, id))}
                emptyText="No projects yet."
            />

            {/* <LocalCheckbox
                variableName="addParks"
                label="Is this article associated with any parks?"
                checked={addParks}
                onChange={(on: boolean) => {
                    setAddParks(on)
                    if (!on) setParkIds([])      // unticking clears the selection
                }}
            />
            {addParks && (
                <ToggleList
                    items={allParks}
                    selected={parkIds}
                    onToggle={(id) => setParkIds((l) => toggle(l, id))}
                    emptyText="No parks yet."
                />
            )}

            <LocalCheckbox
                variableName="addEvents"
                label="Is this article associated with any events?"
                checked={addEvents}
                onChange={(on: boolean) => {
                    setAddEvents(on)
                    if (!on) setEventIds([])
                }}
            />
            {addEvents && (
                <ToggleList
                    items={allEvents}
                    selected={eventIds}
                    onToggle={(id) => setEventIds((l) => toggle(l, id))}
                    emptyText="No events yet."
                />
            )} */}
        </div>
    )

    return (
        <PopUp
            child={
                <GenericForm
                    postOrPatch="Post"
                    instance="Article"
                    title="New Article"
                    submitLabel="Publish"
                    inputs={inputs}
                    onSubmit={publish}
                    onClose={openClose}
                    isPending={createArticle.isPending}
                    errorMessage={createArticle.error?.message}
                    draft={true}
                    onSaveDraft={saveDraft}
                />
            }
        />
    )
}