import './CategoryTabs.scss'

interface CategoryTabsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <nav className="abas">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={category === active ? 'ativa' : ''}
              onClick={() => onChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}