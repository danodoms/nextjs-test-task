import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-foreground mb-6">Discover Amazing Tours</h1>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Explore breathtaking landscapes, capture stunning photography, and create unforgettable memories with our
          expertly guided adventure tours.
        </p>

        <Link
          href="/atrakcje"
          className="inline-block bg-foreground text-background px-12 py-6 text-xl font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          View Tours
        </Link>
      </div>
    </div>
  )
}
