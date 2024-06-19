const template = document.getElementById('template');

const content = document.querySelector('.content-grid');

const fragment = document.createDocumentFragment();

const searchInput = document.getElementById('search-engine');

const searchButton = document.querySelector('.button');

const personajes = [];

const getNameCharacter = () => {
  const elementName = document.querySelectorAll('.element-nombre');

  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    for (const item of elementName) {
      if (item.textContent === searchInput.value) {
        console.log(item.textContent);
      } else {
        console.log('error');
      }
    }
  });
};

const domElements = () => {
  content.textContent = '';

  personajes.slice(0, 5).forEach((element) => {
    const cloneTemplate = template.content.cloneNode(true);

    cloneTemplate.querySelector('.element-image').src = element.imagen;

    cloneTemplate.querySelector('.element-nombre').textContent = element.nombre;

    cloneTemplate.querySelector(
      '.element-genero'
    ).textContent = `Gender :  ${element.genero}`;

    cloneTemplate.querySelector(
      '.element-especie'
    ).textContent = `Specie :  ${element.especie}`;

    cloneTemplate.querySelector(
      '.element-estado'
    ).textContent = `State :  ${element.estado}`;

    cloneTemplate.querySelector(
      '.element-tipo'
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
    const arrayCharacters = await result.results.map((element) => {
      // retorno un objeto con los elemento que quiero
      return {
        imagen: element.image,
        nombre: element.name,
        estado: element.status,
        especie: element.species,
        genero: element.gender,
        tipo: element.type,
      };
    });

    personajes.push(...arrayCharacters);

    // Si hay una api dentro de la api characters entonces cambio el parametro por esa nueva api, entonces se realizará otra vez el fetch con esa nueva api
    if (result.info.next) {
      fetchCharacters(result.info.next);
    } else {
      //Si ya no hay mas apis se ejecuta estas funciones
      domElements();
      getNameCharacter();
    }
  } catch (error) {
    console.log(error);
  }
};
