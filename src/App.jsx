import Caixa from "./components/Caixa"

function App() {

  return (// aparencia --> tamanho/espaçamento --> layout/estrutura
    <div className="bg-transparent max-lg:landscape:py-70 w-full h-full flex items-center justify-center "> 
      <Caixa />
    </div>
  )
}

export default App