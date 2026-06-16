import { projects } from './projects'

const MAX = 10

/**
 * Round-robin across projects so each gets its most-representative images first.
 * image[0] from every project, then image[1], etc., until MAX is reached.
 */
export function getCarouselImages() {
  const withImages = projects.filter((p) => p.images.length > 0)
  if (withImages.length === 0) return []

  const result = []
  let round = 0

  while (result.length < MAX) {
    let added = false
    for (const project of withImages) {
      if (round >= project.images.length) continue
      const image = project.images[round]
      result.push({
        preview: image.preview,
        full: image.full,
        slug: project.slug,
        title: project.title,
      })
      added = true
      if (result.length >= MAX) break
    }
    if (!added) break
    round++
  }

  return result
}

export const carouselImages = getCarouselImages()
