const template = document.getElementById('template');

const content = document.querySelector('.data-container');

const fragment = document.createDocumentFragment();

const personajes = [];

const domElements = () => {
  content.textContent = '';

  personajes.forEach((element) => {
    const cloneTemplate = template.content.cloneNode(true);

    cloneTemplate.querySelector('.data-image').src = element.imagen;

    cloneTemplate.querySelector('.data-nombre').textContent = element.nombre;

    cloneTemplate.querySelector(
      '.data-genero'
    ).textContent = `Gender :  ${element.genero}`;

    cloneTemplate.querySelector(
      '.data-especie'
    ).textContent = `Specie :  ${element.especie}`;

    cloneTemplate.querySelector(
      '.data-estado'
    ).textContent = `State :  ${element.estado}`;

    cloneTemplate.querySelector(
      '.data-tipo'
    ).textContent = `Type :  ${element.tipo}`;

    fragment.appendChild(cloneTemplate);
  });

  content.appendChild(fragment);
};

const fetchApi = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api'); //Fetch a la Api principal
    const result = await response.json(); //Api principal convertida en json

    //Parametro de la funcion asincrona es la Api 'characters' de result
    fetchCharacters(result.characters); //Primer parametro que se ve al inicio
  } catch (error) {
    console.log(error);
  }
};

fetchApi();

const fetchCharacters = async (url) => {
  try {
    const response = await fetch(url); // Hago un fetch a la Api 'characters'
    const result = await response.json(); // La convierto en json

    //Hago un mapeo del array de personajes
    const arrayCharacters = await result.results.map((item) => {
      // retorno un objeto con los elemento que quiero
      return {
        imagen: item.image,
        nombre: item.name,
        estado: item.status,
        especie: item.species,
        genero: item.gender,
        tipo: item.type,
      };
    });

    personajes.push(...arrayCharacters);

    // Si hay una api dentro de la api characters entonces cambio el parametro por esa nueva api, entonces se realizará otra vez el fetch con esa nueva api
    if (result.info.next) {
      fetchCharacters(result.info.next);
    } else {
      //Si ya no hay mas apis se ejecuta esta función
      domElements();
    }
  } catch (error) {
    console.log(error);
  }
};
