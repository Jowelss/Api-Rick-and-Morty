const coso = [];

const domElements = () => {
  console.log(coso);
};

const fetchApi = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api'); //Fetch a la Api principal
    const result = await response.json(); //Api principal convertida en json

    //Parametro de la funcion asincrona es la Api 'characters' de result
    const fetchCharacters = async (url) => {
      try {
        const response = await fetch(url); // Hago un fetch a la Api 'characters'
        const result = await response.json(); // La convierto en json

        //Hago un mapeo del array de personajes
        const arrayCharacters = await result.results.map((element) => {
          // retorno un objeto con los elemento que quiero
          return {
            nombre: element.name,
            estado: element.status,
            especie: element.species,
            genero: element.gender,
            tipo: element.type,
            imagen: element.image,
          };
        });

        // Si hay una api dentro de la api characters entonces cambio el parametro por esa nueva api, entonces se realizará otra vez el fetch con esa nueva api
        if (result.info.next) {
          fetchCharacters(result.info.next);
        }

        coso.push(...arrayCharacters); // Hago un push al array vacio de todos los elementos de arrayCharacters
        domElements();
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters(result.characters); //Primer parametro que se ve al inicio
  } catch (error) {
    console.log(error);
  }
};

fetchApi(); // Llamada a la funcion
