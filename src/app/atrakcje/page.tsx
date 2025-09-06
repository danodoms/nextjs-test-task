import { TourList } from "@/components/tour-list";

import { BASE_URL } from "@/lib/api";
import Link from "next/link";

export default async function AtrakcjePage() {
    let data: any = null

    try {
        const response = await fetch(`${BASE_URL}/atrakcjes?populate=*`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();
        console.log("data list fetched", data);
    } catch (error) {
        console.error("Failed to fetch attractions:", error);
    }

    return (
        <div className="min-h-screen max-w-7xl m-auto p-4 gap-4">
            <Link href="/" className="text-xl p-4 rounded-md bg-red-400">Return Home</Link>
            <TourList tours={data.data} />
        </div>

    )
}