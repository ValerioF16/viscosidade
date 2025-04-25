
import styleT from "./testeStyle.module.css"
import imageTeste from "./img/logo.png"
import imageHome from "./img/image.png"
import { Link } from "react-router-dom";



function Teste() {
    return(
        <div className={styleT.pai}>
            <header className={styleT.cabecalho}>
                <img className= {styleT.imgCabecalho} src={imageTeste} alt="Logo Fenome de transporte" />
                
                

            </header>
            <section>
                <div className={styleT.containerPai}>
                    <div className={styleT.conteudoTopo} data-aos="fade-up">
                        <h1 className={styleT.textoTopo}>Fenomeno de transporte</h1> 
                        <span className={styleT.spanTeste}><strong>Tarefa</strong></span>

                    </div>
                    <div className={styleT.imagEconteudo}>
                    <div className= {styleT.conteudo} data-aos="faderight">
                    <h1>Aplicação Industrial: Sistema de Lubrificação em <br/>uma Planta de Manufatura

</h1>
                    <p>Em uma planta de manufatura de alta precisão, um eixo rotativo é usado em um sistema crítico de usinagem, onde uma lubrificação consistente e confiável é essencial para minimizar o desgaste e a perda de energia. 
                         

                    </p>
                    <br/>
                    
                    <p>O eixo, com diâmetro de 0,4 metros, é suportado por um mancal com luva lubrificada e gira a uma velocidade constante de 190 rotações por minuto (rpm).</p>
                    <br/>
                    <p>O óleo lubrificante utilizado no sistema possui uma viscosidade dinâmica de 6 poise, garantindo a formação adequada de filme lubrificante nas condições operacionais. 
                       </p>
                       <br />
                       <br />
                       <div className={styleT.botaoConteudo}>
                       <Link to={"/viscosidade/potencia"} >
                        <button className={styleT.estiloBotao}>
                            Calcular Potencia
                        </button>
                        </Link>
                        <Link to={"/viscosidade/viscosidades"} >
                        <button className={styleT.estiloBotao}>
                            Viscosidade
                        </button>
                        </Link>

                       </div>
                        
                    </div>
                    <img className= {styleT.imgHome} src={imageHome} alt="Imagem da Pagina Inicial" data-aos="fade-left" />
                    
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Teste;
 