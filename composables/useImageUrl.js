import { useRuntimeConfig } from '#app'

export const useImageUrl = () => {
  const config = useRuntimeConfig()
  const assetsBase = config.public.assetsBase

  const buildImageUrl = (profile, fallback) => {
    const placeholder = fallback || 'https://placehold.co/150x150/0d6efd/ffffff?text=Profile'
    if (!profile) return placeholder
    if (/^https?:\/\//.test(profile)) return profile
    return `${assetsBase}${profile.startsWith('/') ? '' : '/'}${profile}`
  }

  return { buildImageUrl }
}
