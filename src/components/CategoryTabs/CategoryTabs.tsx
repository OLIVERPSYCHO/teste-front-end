import './CategoryTabs.scss'

interface CategoryTabsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

/**
 * Abas de categoria da vitrine.
 *
 * Limitação conhecida: o JSON de produtos da Econverse não traz nenhum campo de
 * categoria (apenas productName, descriptionShort, photo e price), então não há
 * dado para filtrar a lista. As abas reproduzem o layout e mantêm o estado
 * selecionado, sem alterar os produtos exibidos. O comportamento está
 * documentado no README.
 */
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
