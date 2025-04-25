import AOS from 'aos';
import 'aos/dist/aos.css';
import style from "./styleHome.module.css"
import foto from "./icon/image.png"
import { Link } from 'react-router-dom';

AOS.init({
  offset: 120,
  delay: 0,
  duration: 400,
  easing: 'ease',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

function PagPrincipal() {
  return (
    <section  className={style.about }>
        <div className={style.containerAbout}>
            <div className={style.headline} data-aos="fade-up">
                <strong><span className={style.destaque}>Fenomeno</span></strong>
                <h1>Transporte</h1>
            </div>
            <div className={style.contentAbout}>
                <div className={style.contentAboutleft} data-aos="faderight">
                    <h1>Aplicação Industrial: Sistema de Lubrificação em <br/>uma Planta de Manufatura

</h1>
                    <p>Em uma planta de manufatura de alta precisão, um eixo rotativo é usado em um sistema crítico de usinagem, onde uma lubrificação consistente e confiável é essencial para minimizar o desgaste e a perda de energia. 
                         

                    </p>
                    
                    
                    <p>O eixo, com diâmetro de 0,4 metros, é suportado por um mancal com luva lubrificada e gira a uma velocidade constante de 190 rotações por minuto (rpm).</p>
               
                    <p>O óleo lubrificante utilizado no sistema possui uma viscosidade dinâmica de 6 poise, garantindo a formação adequada de filme lubrificante nas condições operacionais. 
                       </p>
                        <div className={style.ctaAbout} >
                        <div className={style.btnAbout}  data-aos="fade-up">
                            
                            <Link to={"/trabalho/potencia"}>
                            <button className={style.btn}>Calculadora <br/>  Pôtencia dissipada
                            </button>
                            </Link>
                            <Link to={"/trabalho/testando"}>
                            <button className={style.btn}>Teste  <br/>  Aplicação
                            </button>
                            </Link>
                            
                        </div>

                        <div className={style.aboutSocial}  data-aos="fade-up">
                            <a href="" target="_blank"><img src="" alt="" /><i className={style.aboutSocial}></i></a>
                            <a href="" target="_blank"><img src="" alt="" /><i className={style.aboutSocial}></i></a>
                            <a href="" target="_blank"><img src="" alt="" /><i className={style.aboutSocial}></i></a>
                            
                        </div>
                    </div>

                </div>
                <div className={style.contentAboutRight} data-aos="fade-left">
                    <div className= {style.imgAbout}>
                        <img src={foto} alt="Imagem"/>
                    </div>
                </div>
            </div>
        </div>
        <br />
        <br />
        <br />
    </section>
    
     
  
  

    
    
  );
}

export default PagPrincipal;
