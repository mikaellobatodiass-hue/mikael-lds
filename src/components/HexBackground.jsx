import { useTheme } from '../context/ThemeContext'

export default function HexBackground({ className = '' }) {
  const { isDark } = useTheme()
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${isDark ? 'hex-pattern' : 'hex-pattern-light'} ${className}`}
      aria-hidden="true"
    />
  )
}
