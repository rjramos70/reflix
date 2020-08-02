import React,  { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
 
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias';
 
function Home() {
  
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });


  }, 
    [ 
      /* 
        ALERTA: se não for colocar estes colchetes as requisições ficarão 
        em loop infinito 
      */
    ]
  );

  return (
    <PageDefault className="App" paddingAll={0} style={ { background: '#141414' } }>

      {dadosIniciais.length === 0 && (<div>Loading...</div>)}

      {dadosIniciais.length !== 0 && (
        
        dadosIniciais.map((categoria, indice) => {
          if(indice === 0){
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={dadosIniciais[0].videos[0].titulo}
                  url={dadosIniciais[0].videos[0].url}
                  videoDescription={"O que é front-end? Trabalhando na área."}
                />

                <Carousel
                  ignoreFirstVideo category={dadosIniciais[0]}
                />
              </div>
            );
          }

          return (
            <Carousel
              key={categoria.id}
              category={categoria}
            />
          );

        })

      )}

    </PageDefault>
  );
}
 
export default Home;