import { fetchAllInstances } from "../../api/client";
import type { AllWeHotels, SpecificWeHotel } from "./types";

export const fetchAllHotels = () => fetchAllInstances<AllWeHotels[]>("/api/hotels/wildenterprise")
export const fetchSpecificHotel = (id: number) => fetchAllInstances<SpecificWeHotel>(`/api/hotels/wildenterprise/${id}`)