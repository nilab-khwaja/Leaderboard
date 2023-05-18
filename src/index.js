import './style.css';

const gameId = 'kNNyqMjEaTbbcG78RkKA';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`;


// fetching the gameID from server


// fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ name: 'My cool new game' })
// })
// .then(response => response.json())
// .then(data => console.log(data.result));

// const scoreItem = document.getElementById('display-scores');
// const form = document.getElementById('form');
// const refresh = document.getElementById('refresh');

const form = document.getElementById('form');
const refresh = document.getElementById('refresh');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);

    // Add new score to scoreboard list
    const scoresList = document.getElementById('display-scores');
    const listItem = document.createElement('li');
    listItem.innerText = `${data.user}: ${data.score}`;
    scoresList.appendChild(listItem);
    listItem.classList.add('listItem');
  } catch (error) {
    console.error(error);
  }
});

// refresh btn

refresh.addEventListener('click', async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const scoresList = document.getElementById('display-scores');

    // Clear existing list items
    scoresList.innerHTML = '';

    data.result.forEach((score) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${score.user}: ${score.score}`;
      scoresList.appendChild(listItem);
      listItem.classList.add('listItem');
    });
  } catch (error) {
    console.error(error);
  }
});
