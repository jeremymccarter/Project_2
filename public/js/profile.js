
const newFavoriteHandler = async (event) => {
  event.preventDefault();

  

  const artistName = document.querySelector('#artist-name').value.trim();
  
  const favoriteSong = document.querySelector('#song-name').value.trim();

  if (artistName && favoriteSong) {
    const response = await fetch(`/api/favorites`, {
      method: 'POST',
      body: JSON.stringify({ artistName, favoriteSong}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const searchFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();
  const searchTerm = document.querySelector('#search-form input').value.trim();
  const page = 0
  console.log(searchTerm);
  const response = await fetch(`/api/albums/spotify?q=${searchTerm}&p=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  });
  
  if (response.ok) {
    response.text().then((spotifyResults)=>{
      const searchResults = document.querySelector('.search-results')
      const doc = document.createElement('div')
      doc.innerHTML = spotifyResults.trim()
      if (searchResults) {
        searchResults.removeChild(searchResults.firstChild)
        searchResults.appendChild(doc.firstChild)
      }
    })
  }
  //still need to get the text content of the search and pass that into a fetch post to an api endpoint
}

const newProjectForm = document.querySelector('.new-project-form')
if (newProjectForm) {
  newProjectForm.addEventListener('submit', newFavoriteHandler);
}

const projectList = document.querySelector('.project-list')
if (projectList) {
  projectList.addEventListener('click', delButtonHandler);
}

const searchForm = document.querySelector('#search-form')
if (searchForm) {
  searchForm.addEventListener('submit', searchFormHandler);
}
