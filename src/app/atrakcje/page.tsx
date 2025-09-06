import { TourList } from "@/components/tour-list";

import { BASE_URL } from "@/lib/api";

export default async function Home() {
    let data: any = null

    try {
        const response = await fetch(`${BASE_URL}/atrakcjes?populate=*`);

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