const avatars = [
  'cat1.jpg',
  'cat2.jpg',
  'cat3.jpg',
  'cat4.jpg',
  'cat5.jpg',
  'cat7.jpg',
  'cat8.jpg',
  'cat9.jpg',
  'cat10.jpg',
  'dog1.jpg',
  'dog2.jpg',
  'dog3.jpg',
  'dog4.jpg',
  'dog5.jpg',
  'dog6.jpg',
];

//loop through images array and add styling via bootstrap classes then add each image onto page with a click event that passes to avatarHandler
avatars.forEach((src) => {
  const img = document.createElement('img');
  img.classList.add('rounded-circle');
  img.classList.add('border');
  img.classList.add('border-info');
  img.src = `images/${src}`;
  img.title = src;
  img.width = 150;
  img.height = 150;
  img.id = src;
  window['card-deck'].appendChild(img);
  img.addEventListener('click', () => {
    avatarHandler();
  });
});

// logic adding avatars to modal selection instead of bottom page


// avatars.forEach((src) => {
//   const img = document.createElement('img');
//   img.classList.add('rounded-circle');
//   img.classList.add('border');
//   img.classList.add('border-info');
//   img.src = `images/${src}`;
//   img.title = src;
//   img.width = 150;
//   img.height = 150;
//   img.id = src;
//   window['modal-avatar'].appendChild(img);
//   img.addEventListener('click', () => {
//     avatarHandler();
//   });
// });

//put request to pass clicked image value to logged in user class on the back end.
const avatarHandler = async () => {
  if (event.target.hasAttribute('id')) {
    const avatar_file = event.target.getAttribute('id');
    console.log(avatar_file);

    if (avatar_file) {
      const response = await fetch(`/api/users/:id`, {
        method: 'PUT',
        body: JSON.stringify({ avatar_file }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.getElementById('modalbtn').click();
      } else {
        alert('Failed to update post');
      }
    }
  }
};

//new tweet form post method
const newFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#project-desc').value.trim();

  if (content) {
    const response = await fetch(`/api/tweets`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

//delete method for tweet button clicked
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/tweets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete howl');
    }
  }
};


document.getElementById('howlBtn').addEventListener('click', newFormHandler);

const delbtn = document.querySelectorAll('.del-howl');
for (let i = 0; i < delbtn.length; i++) {
  delbtn[i].addEventListener('click', delButtonHandler)
};

