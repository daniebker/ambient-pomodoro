const isActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
const owner = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[0] : ''
const isUserSite = repo && owner && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export as a static site so it can be hosted on GitHub Pages
  output: 'export',

  // Disable the image optimizer for static export
  images: { unoptimized: true },

  // When building in GitHub Actions for a project site, set the base path
  basePath: isActions && !isUserSite ? `/${repo}` : '',
  assetPrefix: isActions && !isUserSite ? `/${repo}/` : undefined,

  // Trailing slashes make static hosting friendlier on GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig