import Image from "next/image"
import Link from "next/link"

interface Tour {
    id: number
    documentId: string
    title: string
    slug: string
    rating: number
    location: string
    duration: string
    priceSEK: number
    category: string
    availableFrom: string
    availableTo: string
    groupOfPeople: number
    kids: string
    activity: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    coordinates: { DD: { lat: number; lng: number } }
    description: Array<{ type: string; children: Array<{ type: string; text: string }> }>
    shortDesc: string
    imagePoster: { id: number; url: string }
    imageCover: { id: number; url: string }
    images: Array<{ id: number; url: string }>
    localizations: any[]
}

interface TourListProps {
    tours: Tour[]
}

export function TourList({ tours }: TourListProps) {

    const BASE_URL = " https://api.expeditionlapland.com/api"


    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("sv-SE", {
            style: "currency",
            currency: "SEK",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
    }

    const getActivityColor = (activity: string) => {
        switch (activity.toLowerCase()) {
            case "light":
                return "bg-green-100 text-green-800"
            case "moderate":
                return "bg-yellow-100 text-yellow-800"
            case "heavy":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleClick = () => {

    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
                <div
                    key={tour.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="relative h-48 w-full">


                        {tour.imagePoster?.url ? (
                            <Image src={tour.imagePoster?.url || ""} alt={tour.title} fill className="object-cover" />
                        ) : (
                            <div className="bg-slate-500 " />
                        )}

                        <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                                {tour.category}
                            </span>
                        </div>
                        <div className="absolute top-3 right-3">
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityColor(tour.activity)}`}
                            >
                                {tour.activity}
                            </span>
                        </div>
                    </div>

                    <div className="p-6 pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <Link href={ } className="font-semibold text-lg leading-tight line-clamp-2">{tour.title}</Link>
                            <div className="flex items-center gap-1 text-sm font-medium shrink-0">

                                {tour.rating}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            {tour.location}
                        </div>
                    </div>

                    <div className="px-6 pt-0 pb-6">
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tour.shortDesc}</p>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">

                                    <span>{tour.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">

                                    <span>Max {tour.groupOfPeople}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span>
                                    {formatDate(tour.availableFrom)} - {formatDate(tour.availableTo)}
                                </span>
                            </div>

                            {tour.kids && (
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Kids:</span> {tour.kids}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-blue-600">{formatPrice(tour.priceSEK)}</div>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
