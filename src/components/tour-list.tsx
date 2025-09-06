import { Tour } from "@/lib/types"
import { formatDate, formatPrice, getActivityColor } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface TourListProps {
    tours: Tour[]
}

export function TourList({ tours }: TourListProps) {

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
                            <Link href={`/atrakcje/${encodeURIComponent(tour.slug)}`} className="font-semibold text-lg leading-tight line-clamp-2">{tour.title}</Link>
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
                            <Link href={`/atrakcje/${encodeURIComponent(tour.slug)}`} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
