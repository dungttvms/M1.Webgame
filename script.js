const API_URL = 'https://steam-api-dot-cs-platform-306304.et.r.appspot.com';

const getAllGame = async () => {
  try {
    const url = `${API_URL}/games?page=1&limit=40`;
    // console.log (url)
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("error", error.message);
  } 
};

const getGamesByGenre = async (genreId,page=1,limit=20) => {
  try {
    const url = `${API_URL}/games?page=${page}&limit=${limit}&genres=${genreId}`;
    // console.log (url);
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("error", error.message);
  } 
};

const gamesList = document.querySelector('.games-list');

const renderGame = (game) => {
  const gameItem = document.createElement('li');
  gameItem.classList.add('game-item');

  const img = document.createElement('img');
  img.src = game.header_image;
  img.alt = game.title;
  gameItem.appendChild(img);

  const title = document.createElement('h3');
  title.classList.add('game-title');
  title.textContent = game.name;
  gameItem.appendChild(title);

  const price = document.createElement('span');
  price.classList.add('game-price');
  price.textContent = '$'+ game.price;
  gameItem.appendChild(price);

  gamesList.appendChild(gameItem);
};

const clearGamesList = () => {
  gamesList.innerHTML = '';
};

const filterByGenre = async (genreId) => {
  clearGamesList();
  const games = await getGamesByGenre(genreId);
  games.forEach((game) => {
    renderGame(game);
  });
};

const genreId = document.querySelectorAll('a[data-genre-id]');
genreId.forEach((a) => {
  // console.log (a);
  a.addEventListener('click', async (event) => {
    clearGamesList ();
    // console.log(a.dataset.genreId);
    // getGamesByGenre(a.dataset.genreId);
    const result = await filterByGenre(a.dataset.genreId);
    // console.log(result);
    // renderGame(result);
  });
});



const genreButtons = document.querySelectorAll('.tag-button');

genreButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const genreId = event.target.dataset.genreId;
    filterByGenre(genreId);
  });
});

const searchForm = document.querySelector('#search-form');

const searchGameByName = async (name) => {
  try {
    const url = `${API_URL}/games?q=${name}`;
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("error", error.message);
  }
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchTerm = event.target.querySelector('input').value;
  clearGamesList();
  const games = await searchGameByName(searchTerm);
  games.forEach((game) => {
    renderGame(game);
  });
});

(async function () {
  const games = await getAllGame();
  games.forEach((game) => {
    renderGame(game);
  });
})();
