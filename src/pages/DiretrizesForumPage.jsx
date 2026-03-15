import React from "react";
import { Link } from "react-router-dom";

export default function DiretrizesForumPage() {
  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <Link to="/criar-forum" className="btn mb-5" style={{ backgroundColor: "#7C3AED", color: "#ffffff", fontWeight: "500" }}>
            <i className="bi bi-arrow-left me-1"></i>
            Voltar ao Fórum
          </Link>

          <div className="text-center mb-5">
            <h2 className="azul fw-bold">
              Tentando construir um pedaço de internet mais massa
            </h2>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <p>
                Não sei se você compartilha da visão de que a internet, pelo
                menos em sites onde a mídia principal é o texto, deixou de ser
                um lugar "massa" recentemente. O ruído está ensurdecedor. É tanta
                propaganda e oferta que, ao navegar, muitas vezes surge a
                sensação de sermos presas cercadas por predadores, enquanto
                tentamos extrair algum valor no meio dessa confusão.
              </p>
              <p>
                Mas, para deixar claro desde o início: não temos nada contra
                marketing, ofertas ou propagandas. Produtos e serviços precisam
                de visibilidade, e projetos na internet precisam ser
                financeiramente viáveis. Caso contrário, é apenas uma questão de
                tempo até sumirem do mapa.
              </p>
              <p>
                O problema é quando isso ofusca a informação. E é isso que nos
                leva ao principal objetivo do BlogGuide:
              </p>
            </div>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <h4 className="azul fw-bold mb-3">Conteúdos com Valor Concreto e Confiável</h4>
              <p>
                Quem trabalha com tecnologia de forma séria precisa consumir
                conteúdos de fontes confiáveis e com valor concreto. Acreditamos
                que chegou a hora de dar um cavalo de pau de 180 graus na
                contramão das redes sociais atuais e resgatar o espírito
                colaborativo dos fóruns de antigamente.
              </p>
              <p>
                Aqui, a ideia é criar tópicos (threads) que entreguem
                informações valiosas tanto na postagem principal quanto nas
                respostas (que, muitas vezes, são ainda mais ricas que o post
                original). Para isso acontecer, a plataforma dá o mesmo espaço e
                destaque para quem cria o conteúdo e para quem responde. Faça o
                teste: clique em responder e compare o espaço que você tem aqui
                para elaborar sua ideia com o de outras redes.
              </p>
              <p>
                Tudo no BlogGuide é tratado como conteúdo de primeira classe,
                possuindo um link exclusivo — seja a postagem original, a
                resposta, ou a resposta da resposta. Por isso, temos uma mecânica
                importante: desestimulamos comentários superficiais (como um
                simples "ah, valeu!" ou "up") em favor de comentários que
                devolvam algum valor concreto à discussão.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <h4 className="azul fw-bold mb-3">Participação e Sustentabilidade (Revenue Share)</h4>
              <p>
                A participação ativa na plataforma gera oportunidades. 
                Isso é extremamente empolgante. Esse "algo" a ser divulgado pode
                ser um produto, um serviço, um repositório seu no GitHub (que
                você talvez não pagasse para divulgar, mas aqui terá a chance),
                seu portfólio, um site pessoal ou uma vaga de emprego. A ideia é
                fazer a conta fechar para você e tornar a sua participação na
                plataforma viável e sustentável.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <h4 className="azul fw-bold mb-3">A Cultura do BlogGuide: Exatidão e Empatia</h4>
              <p>
                <strong>
                  Nós somos pessoas brutalmente exatas e empáticas,
                  simultaneamente.
                </strong>
              </p>
              <p>
                Pare para pensar como esses dois pontos, quando levados ao máximo
                ao mesmo tempo, criam interações incrivelmente valiosas. Não pode
                ser só exatidão técnica, nem só empatia cega — precisam ser os
                dois.
              </p>
              <p>
                O termômetro para saber se estamos no caminho certo é simples: as
                discussões estão aproximando ou afastando as pessoas? Se de um
                tópico as pessoas só se afastam, ou se as respostas contêm apenas
                sarcasmo e posturas negativas, não estamos aplicando a nossa
                cultura. Para quase todos os assuntos de tecnologia, há uma forma
                de debater que consegue unir as pessoas (nem que seja para
                discordar com respeito). Dos poucos assuntos onde isso não é
                possível, talvez o BlogGuide não seja o melhor lugar para eles.
              </p>
            </div>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <h4 className="azul fw-bold mb-3">Tecnologia e Open Source</h4>
              <p>
                O nosso cuidado não é somente com as pessoas, mas também com a
                tecnologia por trás de tudo. O projeto está sendo desenvolvido
                com React + Vite + FastAPI e, o mais massa de tudo, de forma Open Source!
              </p>
              <p>
                O repositório do BlogGuide ficará público em breve para que você
                possa acompanhar todo o desenvolvimento. Fica aqui o nosso enorme
                agradecimento a todos da comunidade que estão ajudando a
                construir isso. Sem vocês — colocando a mão na massa,
                programando, abrindo issues, comentando e apoiando o projeto,
                construir esse pedaço de internet mais massa não seria possível.
                Vocês são sensacionais! 😍
              </p>
            </div>
          </div>

          <div className="mb-5">
            <div style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
              <h4 className="azul fw-bold mb-3">Conclusão</h4>
              <p>
                <strong>Seja extremamente bem-vindo ou bem-vinda!</strong>
              </p>
              <p className="text-muted fst-italic">
                Escrevendo em nome de Guilherme e Pedro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
