
import styleT from "./testeStyle.module.css"
import imageTeste from "./img/logo.png"
import imageHome from "./img/visco.png"
import imageTan from "./img/TanCO2.png"
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
                       <Link to={"/potencia"} >
                        <button className={styleT.estiloBotao}>
                            Calcular Potencia
                        </button>
                        </Link>
                        <Link to={"/viscosidade"} >
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
            <section>
                <div className={styleT.containerPai}>
                    <div className={styleT.imagEconteudo}>
                    <div className= {styleT.conteudo} data-aos="faderight">
                    <h1>Cenário Industrial: Pressurização de um Tanque de <br/>Armazenamento de CO₂ em uma Fábrica de Bebidas:

</h1>
                    <p>Em uma unidade de produção de bebidas, o dióxido de carbono (CO₂) é armazenado em tanques e utilizado para carbonatação durante 
                        as operações de engarrafamento. Para atender à crescente demanda de produção, CO₂ adicional está sendo injetado em um dos tanques de armazenamento. 
                        Monitorar a relação entre pressão 
                        e temperatura durante esse processo é essencial para garantir a pressurização segura e evitar falhas no sistema.
                         

                    </p>
                    <br/>
                    
                    <p>Inicialmente, o tanque contém CO₂ a uma pressão absoluta de 200 kPa e a uma temperatura de 50 °C.
                         À medida que o gás é adicionado de forma constante, a pressão dentro do tanque aumenta a uma taxa constante de 25 kPa por minuto. 
                        Os engenheiros devem analisar como esse aumento de pressão se correlaciona com a temperatura ao longo do tempo.</p>
                    <br/>
                    <p> Como engenheiro de controle de processos, trace a variação da pressão (eixo vertical) em função da temperatura dentro do tanque durante os primeiros 10 minutos de injeção de gás. 
                        Suponha que a temperatura aumente proporcionalmente com a pressão devido aos efeitos de compressão e aquecimento.
                       </p>
                       <br />
                       <br />
                       <div className={styleT.botaoConteudo}>
                        <Link to={"/pressao"} >
                        <button className={styleT.estiloBotao}>
                        <strong>Gráfico</strong>
                        </button>
                        </Link>

                       </div>
                        
                    </div>
                    <img className= {styleT.imgTan} src={imageTan} alt="Imagem da Pagina Inicial" data-aos="fade-left" />
                    
                    </div>
                </div>
            </section>
            <section>
                <div className={styleT.containerPai}>
                    <div className={styleT.imagEconteudo}>
                    <div className= {styleT.conteudo} data-aos="faderight">
                    <h1>Cenário Industrial: Monitoramento da Variação de <br/> Pressão em um Tanque de Suprimento de Oxigênio:

</h1>
                    <p>Em uma instalação de soldagem de precisão, um tanque compacto de oxigênio de alta pressão é usado para operações de soldagem móveis. 
                        Entender como a pressão interna do tanque varia com a temperatura é fundamental para garantir a segurança em diferentes condições ambientais e operacionais — especialmente quando o tanque é transportado entre locais de trabalho internos e externos.
                         

                    </p>
                    <br/>
                    
                    <p>O tanque tem um volume de 0,12 metros cúbicos e é inicialmente preenchido com oxigênio a uma pressão absoluta de 8 MPa e a uma temperatura de 20 °C. 
                        Para auxiliar a análise de segurança e o projeto do sistema, os engenheiros precisam prever como a pressão dentro do tanque muda com o aumento da temperatura.</p>
                    <br/>
                    <p> Como engenheiro de controle de processos, trace a variação da pressão (eixo vertical) em função da temperatura dentro do tanque durante os primeiros 10 minutos de injeção de gás. 
                        Suponha que a temperatura aumente proporcionalmente com a pressão devido aos efeitos de compressão e aquecimento.
                       </p>
                       <br />
                       <br />
                       <div className={styleT.botaoConteudo}>
                        <Link to={"/temperatura"} >
                        <button className={styleT.estiloBotao}>
                            <strong>Gráfico</strong> <br />
                            
                        </button>
                        </Link>

                       </div>
                        
                    </div>
                    <img className= {styleT.imgTan} src={imageTan} alt="Imagem da Pagina Inicial" data-aos="fade-left" />
                    
                    </div>
                </div>
            </section>
            <section>
                <div className={styleT.containerPai}>
                    <div className={styleT.imagEconteudo}>
                    <div className= {styleT.conteudo} data-aos="faderight">
                    <h1>Cenário Industrial: Monitoramento da Variação de <br/> Pressão em um Tanque de Suprimento de Oxigênio:

</h1>
                    <p>Em uma instalação de soldagem de precisão, um tanque compacto de oxigênio de alta pressão é usado para operações de soldagem móveis. 
                        Entender como a pressão interna do tanque varia com a temperatura é fundamental para garantir a segurança em diferentes condições ambientais e operacionais — especialmente quando o tanque é transportado entre locais de trabalho internos e externos.
                         

                    </p>
                    <br/>
                    
                    <p>O tanque tem um volume de 0,12 metros cúbicos e é inicialmente preenchido com oxigênio a uma pressão absoluta de 8 MPa e a uma temperatura de 20 °C. 
                        Para auxiliar a análise de segurança e o projeto do sistema, os engenheiros precisam prever como a pressão dentro do tanque muda com o aumento da temperatura.</p>
                    <br/>
                    <p> Como engenheiro de controle de processos, trace a variação da pressão (eixo vertical) em função da temperatura dentro do tanque durante os primeiros 10 minutos de injeção de gás. 
                        Suponha que a temperatura aumente proporcionalmente com a pressão devido aos efeitos de compressão e aquecimento.
                       </p>
                       <br />
                       <br />
                       <div className={styleT.botaoConteudo}>
                        <Link to={"/monometro"} >
                        <button className={styleT.estiloBotao}>
                            <strong>Gráfico</strong> <br />
                            
                        </button>
                        </Link>

                       </div>
                        
                    </div>
                    <img className= {styleT.imgTan} src={imageTan} alt="Imagem da Pagina Inicial" data-aos="fade-left" />
                    
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Teste;
 