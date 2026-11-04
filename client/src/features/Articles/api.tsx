import { fetchAllInstances, postInstance } from "../../api/client";
import type { AllArtciles, PostArticle } from "./types";

export const fetchAdminArticles = () => fetchAllInstances<AllArtciles[]>("/api/admin/articles")

export const fetchAllArticles = () => fetchAllInstances<AllArtciles[]>("/api/articles")

export const fetchSpecificArticle = (id: number) => fetchAllInstances<AllArtciles>(`/api/articles/${id}`)

export const postArticle = (newArticle: PostArticle) =>
    postInstance<PostArticle, AllArtciles>("/api/admin/articles", newArticle) 