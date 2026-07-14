const common = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function BracesIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M8 4c-2 0-3 1-3 3v3c0 1.2-1 2-2 2 1 0 2 .8 2 2v3c0 2 1 3 3 3" />
      <path d="M16 4c2 0 3 1 3 3v3c0 1.2 1 2 2 2-1 0-2 .8-2 2v3c0 2-1 3-3 3" />
    </svg>
  )
}

export function UploadIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg {...common} width={14} height={14} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function SunIcon(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export function CheckCircleIcon(props) {
  return (
    <svg {...common} width={15} height={15} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg {...common} width={11} height={11} strokeWidth={2.5} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon(props) {
  return (
    <svg {...common} width={11} height={11} strokeWidth={2.5} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function WrapTextIcon(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 6h16M4 12h12a3 3 0 0 1 0 6h-3M4 18h6M13 15l3 3-3 3" />
    </svg>
  )
}
