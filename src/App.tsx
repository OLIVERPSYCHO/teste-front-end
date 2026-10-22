import Showcase from './components/Showcase/Showcase'

export default function App() {
  return (
    <main>
      {/*
        A página só possui a seção da vitrine por enquanto, então o h1 fica
        acessível a leitores de tela e buscadores sem interferir no layout.
      */}
      <h1 className="apenas-leitor-de-tela">Vitrine de produtos Econverse</h1>
      <Showcase />
    </main>
  )
}
