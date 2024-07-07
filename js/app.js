const template = document.getElementById('template');

const dataContainer = document.querySelector('.data-container');

const fragment = document.createDocumentFragment();

const characters = [];

const domElements = () => {
  dataContainer.textContent = '';

  characters.forEach((info) => {
    const cloneTemplate = template.content.cloneNode(true);

    cloneTemplate.querySelector('.data-image').src = info.imagen;

    cloneTemplate.querySelector('.data-nombre').textContent = info.nombre;

    cloneTemplate.querySelector(
      '.data-genero'
    ).textContent = `Gender :  ${info.genero}`;

    cloneTemplate.querySelector(
      '.data-especie'
    ).textContent = `Specie :  ${info.especie}`;

    cloneTemplate.querySelector(
      '.data-estado'
    ).textContent = `State : ${info.estado}`;

    let typeContent = cloneTemplate.querySelector('.data-tipo');

    if (info.tipo === '') {
      typeContent.textContent = `Type : Undifined`;
    } else {
      typeContent.textContent = `Type : ${info.tipo}`;
    }

    fragment.appendChild(cloneTemplate);
  });
  dataContainer.appendChild(fragment);
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

    characters.push(...arrayCharacters);

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
