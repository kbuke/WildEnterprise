import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { CardForm, type CardFields, type RequiredRule } from "../../components/form/CardInstance"
import { GenericForm } from "../../components/form/GenericForm"
import { PopUp } from "../../components/ui/Popup"
import { LocalCheckbox } from "../../components/ui/Checkbox"
import { ToggleList } from "../../components/ui/ToggleList"
import { postProject } from "../../features/Projects/api"
import type { ProjectStatus } from "../../features/Projects/types"
import { fetchAdminArticles } from "../../features/Articles/api"
import { queryClient } from "../../ReactQuery/queryClient"

type Props = { onClose: () => void }

const toggle = (list: number[], id: number) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id]

export function AddProject({ onClose }: Props) {
    const [addArticles, setAddArticles] = useState(false)
    const [articleIds, setArticleIds] = useState<number[]>([])

    // Which button was pressed. A ref so validation sees it immediately.
    const intent = useRef<ProjectStatus>("Draft")

    const { data: articles } = useQuery({
        queryKey: ["articles", "admin"],
        queryFn: fetchAdminArticles,
    })

    const { register, handleSubmit, formState: { errors } } = useForm<CardFields>({
        shouldUnregister: true,   // hidden pI3-5 inputs aren't sent or validated
    })

    // Drafts skip these; publishing needs them
    const rule: RequiredRule = (message) => ({
        validate: (v) => intent.current === "Draft" || !!String(v ?? "").trim() || message,
    })

    const createProject = useMutation({
        mutationFn: postProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            onClose()
        },
    })

    const submit = handleSubmit((v) => {
        const clean = (s?: string) => s?.trim() || undefined
        createProject.mutate({
            name: v.name.trim(),
            img: clean(v.img),
            info: clean(v.info),
            cardInfo: clean(v.cardInfo),
            pI1: clean(v.pI1),
            pI2: clean(v.pI2),
            pI3: clean(v.pI3),
            pI4: clean(v.pI4),
            pI5: clean(v.pI5),
            status: intent.current,
            articleIds,
        })
    })

    const publish = (e: FormEvent<HTMLFormElement>) => {
        intent.current = "Published"
        return submit(e)
    }

    const saveDraft = () => {
        intent.current = "Draft"
        submit()
    }

    return (
        <PopUp
            child={
                <GenericForm
                    postOrPatch="Post"
                    instance="Project"
                    title="New Project"
                    submitLabel="Publish"
                    inputs={
                        <>
                            <CardForm
                                register={register}
                                errors={errors}
                                entityName="Project"
                                rule={rule}
                            />

                            <LocalCheckbox
                                variableName="addArticles"
                                label="Is this project covered by any articles?"
                                checked={addArticles}
                                onChange={(on: boolean) => {
                                    setAddArticles(on)
                                    if (!on) setArticleIds([])
                                }}
                            />
                            {addArticles && (
                                <ToggleList
                                    items={articles?.map((a) => ({ id: a.id, name: a.title }))}
                                    selected={articleIds}
                                    onToggle={(id) => setArticleIds((l) => toggle(l, id))}
                                    emptyText="No articles yet."
                                />
                            )}
                        </>
                    }
                    onSubmit={publish}
                    onClose={onClose}
                    isPending={createProject.isPending}
                    errorMessage={createProject.error?.message}
                    draft={true}
                    onSaveDraft={saveDraft}
                />
            }
        />
    )
}