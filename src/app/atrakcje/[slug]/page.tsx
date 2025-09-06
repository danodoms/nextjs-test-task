
import { BASE_URL } from "@/lib/api"
import { Tour } from "@/lib/types";
import { formatDate, getActivityColor } from "@/lib/utils";
import Link from "next/link";
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

        console.log("data slug data fetched", data)

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

        <div className="min-h-screen bg-gray-50">



            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">

                {/* <img src={data.imageCover.url || "/placeholder.svg"} alt={data.title} className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">

                    <div className="container mx-auto px-4 pb-8">
                        <div className="text-white">
                            <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm font-medium mb-4">
                                {data.category}
                            </span>
                            <h1 className="text-4xl font-bold mb-2 text-balance">{data.title}</h1>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">{data.rating} ★</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{data.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <Link href="/atrakcje" className="bg-red-400 px-2 py-1 rounded-sm mb-8">Return to List</Link>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">{data.shortDesc}</p>

                            <div className="prose max-w-none">
                                {/* {data.description.map((block, index) => (
                                    <div key={index}>
                                        {block.children.map((child, childIndex) => (
                                            <p key={childIndex} className="text-gray-700 leading-relaxed">
                                                {child.text}
                                            </p>
                                        ))}
                                    </div>
                                ))} */}
                            </div>
                        </div>

                        {/* data Details */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">Tour Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Duration</span>
                                            <p className="font-semibold">{data.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Group Size</span>
                                            <p className="font-semibold">{data.groupOfPeople} people</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Age Requirement</span>
                                            <p className="font-semibold">{data.kids}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="text-sm text-gray-500">Activity Level</span>
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(data.activity)}`}
                                            >
                                                {data.activity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* {data.images.map((image, index) => (
                                    <div key={image.id} className="aspect-video overflow-hidden rounded-lg">
                                        <img
                                            src={image.url || "/placeholder.svg"}
                                            alt={`${data.title} - Image ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Booking Card */}
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-gray-900 mb-1">{data.priceSEK.toLocaleString()} SEK</div>
                                <div className="text-sm text-gray-500">per person</div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <span className="text-sm font-medium text-gray-700">Available Dates</span>
                                    <div className="mt-1 text-sm text-gray-600">
                                        {formatDate(data.availableFrom)} - {formatDate(data.availableTo)}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Book Now
                            </button>

                            <div className="mt-4 text-center">
                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    Contact for Custom Dates
                                </button>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Location</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">{data.location}</span>
                                </div>
                                {/* <div className="text-xs text-gray-500">
                                    Coordinates: {data.coordinates.DD.lat}, {data.coordinates.DD.lng}
                                </div> */}
                                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Map View</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}