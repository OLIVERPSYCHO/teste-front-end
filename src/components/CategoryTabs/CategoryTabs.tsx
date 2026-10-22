import './CategoryTabs.scss'

interface CategoryTabsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export default function CategoryTabs({
  categories,
  active,
  onChange,
}: CategoryTabsProps) {
  return (
    <nav className="category-tabs" aria-label="Categorias de produtos">
      <ul className="category-tabs__list">
        {categories.map((category) => (
          <li key={category} className="category-tabs__item">
            <button
              type="button"
              className={`category-tabs__button${
                category === active ? ' category-tabs__button--active' : ''
              }`}
              aria-current={category === active ? 'true' : undefined}
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
