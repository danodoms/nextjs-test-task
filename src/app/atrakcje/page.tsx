import { TourList } from "@/components/tour-list";

import { BASE_URL } from "@/lib/api";
import Link from "next/link";

export default async function AtrakcjePage() {
    let data: any = null

    try {
        // Fetch all attractions from Strapi API
        const response = await fetch(`${BASE_URL}/atrakcjes?populate=*`);

        if (!response.ok) {
            // Throw error if request fails
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        data = await response.json();
        console.log("data list fetched", data);
    } catch (error) {
        // Log fetch errors
        console.error("Failed to fetch attractions:", error);
    }

    return (
        <div className="min-h-screen max-w-7xl m-auto p-4 gap-4">
            {/* Navigation back to home */}
            <Link href="/" className="text-xl p-4 rounded-md bg-red-400">Return Home</Link>

            {/* Render list of tours */}
            <TourList tours={data.data} />
        </div>

    )
}