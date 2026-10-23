import './CategoryTabs.scss'

interface CategoryTabsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

// O JSON não tem campo de categoria, então as abas mantêm o estado selecionado
// sem filtrar a lista. Ver README.
export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <nav className="abas" aria-label="Categorias de produtos">
      <ul>
        {categories.map((category) => {
          const ativa = category === active

          return (
            <li key={category}>
              <button
                type="button"
                className={ativa ? 'ativa' : ''}
                aria-current={ativa ? 'true' : undefined}
                onClick={() => onChange(category)}
              >
                {category}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
