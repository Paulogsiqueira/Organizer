import kanban from '/home/kanban.png';
import '@/style/home/home.sass'

const Home = () => {
  return (
    <div className='home'>
      <section className='home-title__section'>
        <h2>Sobre</h2>
        <p className="home-text">O Organizer foi concebido com o objetivo de aplicar eficazmente os princípios da metodologia Kanban, proporcionando uma maneira intuitiva e eficiente de gerenciar as atividades dos usuários. Inspirado na filosofia japonesa de gestão visual, o Kanban busca otimizar fluxos de trabalho, proporcionando uma visão clara e organizada das tarefas em andamento. Com essa abordagem, o Organizer visa simplificar e acelerar o gerenciamento de atividades, proporcionando uma experiência mais eficaz para seus usuários.</p>
        <p className="home-text">Ao adotar o Kanban, o Organizer permite que os usuários visualizem suas tarefas em diferentes estágios, representados por colunas como "A Fazer", "Em Andamento" e "Concluído". Essa organização facilita o acompanhamento do progresso, identificação de gargalos e ajuste constante para melhorar a eficiência. Além disso, a facilidade de arrastar e soltar tarefas entre as colunas reflete a flexibilidade inerente ao Kanban, proporcionando uma experiência de gerenciamento de tarefas intuitiva e personalizável.</p>
        <p className="home-text">Com o Organizer, os usuários podem desfrutar de uma abordagem ágil para o gerenciamento de suas atividades diárias, promovendo a produtividade e a colaboração. Ao combinar a praticidade do Kanban com uma interface amigável, o Organizer torna-se uma ferramenta valiosa para aqueles que buscam simplificar e aprimorar seu processo de organização e produtividade.</p>
      </section>
      <section className='home-subsection'>
        <h2>Implatanção do Kanban</h2>
        <p className='home-text'>A adoção do Kanban em empresas representa uma transição estratégica para um método de gestão visual que busca otimizar a eficiência operacional e aprimorar a colaboração entre equipes.</p>
        <p className='home-text'>A simplicidade do Kanban, com seus quadros visuais e colunas representando diferentes estágios do processo, facilita a adaptação por parte dos colaboradores, promovendo uma transição suave para práticas mais eficientes. Além disso, a metodologia Kanban incentiva uma cultura de melhoria contínua, estimulando a equipe a refletir sobre seu desempenho e implementar ajustes constantes para aprimorar a produtividade.</p>
        <div className='home-subsection__kanban'>
          <div className='kanban__part'>
            <img src={kanban} alt="Tabela do Kanban" />
          </div>
          <div className='kanban__part'>
            <div className='kanban-benefits'>
              <h3>Melhorias obtidas com Kanban</h3>
              <ul>
                <li>Visibilidade Total do Trabalho</li>
                <li>Gestão de Fluxo Eficiente</li>
                <li>Priorização Transparente</li>
                <li>Resposta Ágil a Mudanças</li>
                <li>Redução de Desperdícios</li>
                <li>Melhoria Contínua</li>
                <li>Colaboração Aprimorada</li>
                <li>Entrega Preditiva</li>
                <li>Engajamento da Equipe</li>
                <li>Adaptação à Demanda</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home