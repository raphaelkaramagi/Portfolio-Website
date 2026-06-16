import { Link } from 'react-router-dom'
import { carouselImages } from '../data/carouselImages'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg'

/** ~4s per tile keeps scroll speed consistent regardless of count */
const durationSec = Math.max(28, carouselImages.length * 4)

function CarouselTile({ item, tabHidden = false }) {
  return (
    <Link
      to={`/projects/${item.slug}`}
      aria-label={tabHidden ? undefined : `View project: ${item.title}`}
      tabIndex={tabHidden ? -1 : undefined}
      aria-hidden={tabHidden ? true : undefined}
      className={`carousel-tile group relative z-0 block shrink-0 h-40 sm:h-52 w-[min(72vw,18rem)] sm:w-[min(42vw,22rem)] rounded-2xl ring-1 ring-overlay/10 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.45)] transition-[box-shadow] duration-300 hover:z-30 hover:ring-brand-red/35 hover:shadow-[0_24px_56px_-18px_rgba(220,38,38,0.25)] ${focusRing}`}
    >
      <div className="carousel-tile-media absolute inset-0 origin-center overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105 group-focus-visible:scale-105">
        <img
          src={item.preview}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3 sm:px-4 bg-gradient-to-t from-black/75 via-black/40 to-transparent"
          aria-hidden
        >
          <span className="font-grotesk text-xs sm:text-sm font-semibold text-white/90 line-clamp-2 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 transition-opacity duration-300">
            {item.title}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectCarousel() {
  if (carouselImages.length === 0) return null

  return (
    <section
      aria-label="Featured project work"
      className="relative py-10 sm:py-14 overflow-x-clip"
    >
      <div className="carousel-viewport mx-auto max-w-[100vw] py-3 sm:py-4">
        <div
          className="carousel-track flex w-max gap-4 sm:gap-5 px-4 sm:px-8"
          style={{ animationDuration: `${durationSec}s` }}
        >
          {carouselImages.map((item, i) => (
            <CarouselTile key={`a-${item.slug}-${i}`} item={item} />
          ))}
          <div aria-hidden className="flex gap-4 sm:gap-5">
            {carouselImages.map((item, i) => (
              <CarouselTile key={`b-${item.slug}-${i}`} item={item} tabHidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
