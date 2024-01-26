import linkedin from '/footer/linkedin.png'
import github from '/footer/github.png'
import '@/style/footer/footer.sass'

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-links'>
        <a href="https://www.linkedin.com/in/paulogusiqueira/"><img src={linkedin} alt="Icone LinkedIn"/></a>
        <a href="https://github.com/Paulogsiqueira"><img src={github} alt="Icone GitHub"/></a>
      </div>
      <h4>© 2024 Copyright Paulo Gustavo Siqueira</h4>
    </div>
  )
}

export default Footer