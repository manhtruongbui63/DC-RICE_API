import { customAlphabet } from 'nanoid'

export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const generateSKU = () => {
  const nanoid = customAlphabet('0123456789', 6)
  return nanoid()
}
