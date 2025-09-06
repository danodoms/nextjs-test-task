import { TourList } from "@/components/tour-list";

export default async function Home({
    params,
}: {
    params: Promise<{ slug: string }>
}) {


    const BASE_URL = "https://api.expeditionlapland.com/api/atrakcjes?populate=*"

    let data: any = null

    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json(); // <-- parse JSON
        console.log("data list fetched", data);
    } catch (error) {
        console.error("Failed to fetch attractions:", error);
    }

    return (
        <div className="min-h-screen max-w-7xl m-auto p-4">
            <TourList tours={data.data} />
        </div>

    )
}