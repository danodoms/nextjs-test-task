
import { BASE_URL } from "@/lib/api"
import { Tour } from "@/lib/types"
import { notFound } from "next/navigation";

export default async function TourPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {


    let data: Tour | null = null
    const { slug } = await params

    try {
        const response = await fetch(`${BASE_URL}/atrakcjes?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json()
        data = result.data[0]

        console.log("tour slug data fetched", data)

    } catch (error) {
        console.error("Failed to fetch attractions:", error);
        if (!data) {
            notFound();
        }
    }


    if (!data) {
        notFound();
    }


    return (

        <div className="min-h-screen p-4 max-w-7xl m-auto">
            <h1 className="text-2xl font-bold tracking-tight">
                {data.title}
            </h1>
            <p>
                {/* {data.} */}
            </p>
        </div>
    )
}