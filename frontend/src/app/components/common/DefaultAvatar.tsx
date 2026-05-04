/**
 * DefaultAvatar - Generates a consistent initial-based avatar
 * Uses Edu-Sync palette for backgrounds
 */

interface DefaultAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const AVATAR_COLORS = [
  { bg: '#1E2022', text: '#F0F5F9' },
  { bg: '#52616B', text: '#F0F5F9' },
  { bg: '#C9D6DF', text: '#1E2022' },
  { bg: '#3b82f6', text: '#ffffff' },
  { bg: '#8b5cf6', text: '#ffffff' },
  { bg: '#10b981', text: '#ffffff' },
]

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return parts[0]?.substring(0, 2).toUpperCase() || '?'
}

const sizeMap = {
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-10 h-10', text: 'text-sm' },
  lg: { container: 'w-24 h-24', text: 'text-2xl' },
}

export function DefaultAvatar({ name, size = 'md', className = '' }: DefaultAvatarProps) {
  const colorIdx = hashName(name) % AVATAR_COLORS.length
  const color = AVATAR_COLORS[colorIdx]
  const initials = getInitials(name)
  const sizeClass = sizeMap[size]

  return (
    <div
      className={`${sizeClass.container} rounded-full flex items-center justify-center font-semibold select-none flex-shrink-0 ${className}`}
      style={{ backgroundColor: color.bg, color: color.text }}
      aria-label={`Avatar for ${name}`}
    >
      <span className={sizeClass.text}>{initials}</span>
    </div>
  )
}
