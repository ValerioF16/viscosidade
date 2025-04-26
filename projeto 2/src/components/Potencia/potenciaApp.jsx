import { useState } from 'react';
import styleP from"./potenciaStyle.module.css";
import { Link } from 'react-router-dom';







function PotenciaApp() {
  
  

  const [po, setPO] = useState("")
  const [eta, setEta] = useState(''); // SENDO ETA - VISCOSIDADE
  const [n, setN] = useState(''); // N - > QUANTIDADE DE RPM
  const [h, setH] = useState(''); // H - > ESPESSURA DO CAMADA DE LUBRIFICANTE
  const [d, setD] = useState(''); // DIAMETRO DO EIXO
  const [P, setP] = useState(null); // POTENCIA DISSIPADA
  const [F, setF] = useState(null)
  const [l, setL] = useState(''); //TAMANHO DA LUVA
// FUNCAO DE CALCULO
  const handleCalculate = () => {
    //TRATAMENTO DAS VARIAVEIS
    const poNum = parseFloat(po);
    const etaNum = parseFloat(eta);
    const nNum = parseFloat(n);
    const hNum = parseFloat(h);
    const dNum = parseFloat(d);
    const lNum = parseFloat(l)

    if (isNaN(etaNum) || isNaN(nNum) || isNaN(hNum) || isNaN(dNum) || isNaN (lNum) || isNaN(poNum)) {
      alert('Por favor, insira valores numéricos para todos os parâmetros.');
      return;
    }
    if (poNum === 0)  {
      alert("A potência nominal nâo pode ser zero")
    }
    
    if (hNum === 0) {
      alert('A espessura da película (h) não pode ser zero.');
      return;
    }
    if (lNum === 0){
      alert("O tamanho da Luva nao pode ser zero")
    }
    if (etaNum <= 0 || nNum <= 0 || hNum <= 0 || dNum <= 0 || lNum <= 0) {
      alert("Os valores devem ser positivos");
      return;
    }
    //CONVERTENDO LUVA DE MILIMETRO PARA METRO
    const convLuva = lNum * 0.001
    const raioEixo = dNum / 2
    //CONVERTENDO ROTAÇÃO PARA RADS
    const convRads = nNum * 2 * Math.PI / 60
    //ACHANDO A VELOCIDADE TANGECIAL
    const velocidadeTangencial = convRads * raioEixo
    //CONVERTENDO ESPESSURA DO LUBRIFICANTE PARA METRO
    const convEspessura = hNum * 0.001
    //TENSAO DE CISALHAMENTO
    const tensaoCisalhamento = etaNum * 0.1 * velocidadeTangencial / convEspessura
    //AREA DE CONTATO 
    const areaContato = 2 * Math.PI * raioEixo * convLuva
    //FORÇA DE CISALHAMENTO
    const forcaCisalhamento = areaContato * tensaoCisalhamento
    // POTENCIA DISSIPADA
    const P = (forcaCisalhamento * velocidadeTangencial);
    //POTENCIA UTIL
    const pUtil = (poNum - P);
    const F = (pUtil / poNum) * 100;
  
    setP(P);
    setF(F);

     

  };

  const handleClear = () => {
    setEta('');
    setN('');
    setH('');
    setD('');
    setL("");
    setP(null);
    setPO("")
    setF(null)
  };

  return (
    <div className={styleP.AppPotencia}>
      <div>
      </div>
      <div className={styleP.container} >
        <header>
          <h1>Cálculo de Potência Dissipada</h1>
        </header>
        <section className= {styleP.inputsP} >
          <h2>Parâmetros de Entrada</h2>
          <div>
            <label>
              Potência nominal (Watts) <span title="Insira a potência nominal ">?</span>
            </label>
            <input
              type="number"
              value={po}
              onChange={(e) => setPO(e.target.value)}
              step="any"
            />
          </div>
          <div>
          </div>
          <div>
            <label>
              Viscosidade dinâmica (poise) <span title="Insira a viscosidade dinâmica">?</span>
            </label>
            <input
              type="number"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Velocidade de rotação (rpm) <span title="Insira a velocidade de rotação">?</span>
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Espessura da película (mm) <span title="Insira a espessura da película">?</span>
            </label>
            <input
              type="number"
              value={h}
              onChange={(e) => setH(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Diâmetro do eixo (m) <span title="Insira o diâmetro do eixo">?</span>
            </label>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Tamanho da Luva (mm) <span title="Insira o tamanho da luva">?</span>
            </label>
            <input
              type="number"
              value={l}
              onChange={(e) => setL(e.target.value)}
              step="any"
            />
          </div>
        </section>
        <section className={styleP.buttonsP}>
          <button className= {styleP.btnP1} onClick={handleCalculate}>Calcular</button>
          <button className= {styleP.btnP2} onClick={handleClear}>Limpar</button>
          <Link to={"/"} >
                <button className= {styleP.btnP2} >
                  Voltar
                </button>
                </Link>
        </section>
        <section className={styleP.result}>
          <h2>Resultado:</h2>
          
          <p>
            Potência Dissipada = {P ? `${P.toFixed(2)} Watts` : ''}
          </p>
          <p>
            Eficiência = {F ? `${F.toFixed(2)} %` : ''}
          </p>

        </section>
      </div>
    </div>
  );
}

export default PotenciaApp;
