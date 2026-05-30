#!/usr/bin/env node
/**
 * Generates gallery previews (max 960px) and recompresses full images (max 1600px).
 * Run: node scripts/optimize-project-images.mjs
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const projectsDir = path.join(root, 'public/projects')
const PREVIEW_MAX = 960
const FULL_MAX = 1600
const JPEG_QUALITY = 82

const dirs = fs.readdirSync(projectsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'previews')
  .map((d) => path.join(projectsDir, d.name))

function run(cmd) {
  execSync(cmd, { stdio: 'pipe' })
}

function ext(name) {
  return path.extname(name).toLowerCase()
}

for (const dir of dirs) {
  const previewsDir = path.join(dir, 'previews')
  fs.mkdirSync(previewsDir, { recursive: true })

  const files = fs.readdirSync(dir).filter((f) => {
    const e = ext(f)
    return (e === '.jpeg' || e === '.jpg' || e === '.png') && f !== 'previews'
  })

  for (const file of files) {
    const src = path.join(dir, file)
    const previewOut = path.join(previewsDir, file)
    const e = ext(file)

    if (e === '.jpeg' || e === '.jpg') {
      run(
        `sips -Z ${FULL_MAX} "${src}" --out "${src}"`,
      )
      run(
        `sips -Z ${PREVIEW_MAX} "${src}" -s format jpeg -s formatOptions ${JPEG_QUALITY} --out "${previewOut}"`,
      )
    } else {
      run(`sips -Z ${FULL_MAX} "${src}" --out "${src}"`)
      run(`sips -Z ${PREVIEW_MAX} "${src}" --out "${previewOut}"`)
    }

    const fullKb = (fs.statSync(src).size / 1024).toFixed(0)
    const prevKb = (fs.statSync(previewOut).size / 1024).toFixed(0)
    console.log(`${path.relative(root, src)} → full ${fullKb}KB, preview ${prevKb}KB`)
  }
}
