const container = document.querySelector('.container');

const fragment = document.createDocumentFragment();

const titanContent = [];

const addDom = () => {
  titanContent.forEach((element) => {
    const nameTitan = document.createElement('p');

    nameTitan.textContent = element.nombre;

    fragment.appendChild(nameTitan);
  });

  container.appendChild(fragment);
};

const getDataGames = async () => {
  try {
    const response = await fetch('https://api.attackontitanapi.com/');
    const result = await response.json();

    const resTitan = await fetch(result.titans);
    const resultTitan = await resTitan.json();

    const data = await resultTitan.results.map((element) => {
      return {
        nombre: element.name,
        altura: element.height,
        lealtad: element.allegiance,
        image: element.img,
      };
    });

    titanContent.push(...data);

    addDom();
  } catch (error) {
    console.log(error);
  }
};

getDataGames();
