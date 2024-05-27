const postForm = document.getElementById('post-form');
const postList = document.getElementById('post-list');
const categoryFilter = document.getElementById('post-category');

// Array para armazenar os posts (simulando um banco de dados)
let posts = [];

// Função para adicionar um novo post
function addPost(text, category, images) {
    const newPost = {
        id: Date.now(), // ID único para cada post
        text: text,
        category: category,
        images: images,
        date: new Date()
    };
    posts.push(newPost);
    renderPosts();
}

// Função para renderizar os posts na página
function renderPosts() {
    postList.innerHTML = ''; // Limpa a lista de posts antes de renderizar

    // Filtra os posts pela categoria selecionada
    const filteredPosts = categoryFilter.value === 'Todos'
        ? posts
        : posts.filter(post => post.category === categoryFilter.value);

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Adiciona o texto do post
        const postText = document.createElement('p');
        postText.classList.add('post-text');
        postText.textContent = post.text;
        postElement.appendChild(postText);

        // Adiciona as imagens do post
        if (post.images.length > 0) {
            const imagesContainer = document.createElement('div');
            imagesContainer.classList.add('post-images');

            // Cria o carrossel de imagens (implementado em JavaScript)
            const carouselContainer = createCarousel(post.images);
            imagesContainer.appendChild(carouselContainer);

            postElement.appendChild(imagesContainer);
        }

        // Adiciona a categoria e data do post
        const postInfo = document.createElement('div');
        postInfo.classList.add('post-info');

        const categorySpan = document.createElement('span');
        categorySpan.classList.add('post-category');
        categorySpan.textContent = post.category;
        postInfo.appendChild(categorySpan);

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('post-date');
        dateSpan.textContent = post.date.toLocaleDateString();
        postInfo.appendChild(dateSpan);

        postElement.appendChild(postInfo);

        // Adiciona os botões de editar e excluir
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('post-actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editPost(post.id));
        actionsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deletePost(post.id));
        actionsContainer.appendChild(deleteButton);

        postElement.appendChild(actionsContainer);

        postList.appendChild(postElement);
    });
}

// Função para criar o carrossel de imagens
function createCarousel(images) {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    images.forEach((image, index) => {
        const carouselItem = document.createElement('img');
        carouselItem.classList.add('carousel-item');
        carouselItem.src = image;
        carouselItem.alt = `Imagem ${index + 1}`;
        carouselContainer.appendChild(carouselItem);

        if (index === 0) {
            carouselItem.classList.add('active');
        }
    });

    // Cria os botões de navegação
    const navContainer = document.createElement('div');
    navContainer.classList.add('carousel-nav');

    const prevButton = document.createElement('button');
    prevButton.textContent = '❮';
    prevButton.addEventListener('click', () => {
        const activeItem = carouselContainer.querySelector('.carousel-item.active');
        const prevItem = activeItem.previousElementSibling;

        if (prevItem) {
            activeItem.classList.remove('active');
            prevItem.classList.add('active');
        }
    });
    navContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = '❯';
    nextButton.addEventListener('click', () => {
        const activeItem = carouselContainer.querySelector('.carousel-item.active');
        const nextItem = activeItem.nextElementSibling;

        if (nextItem) {
            activeItem.classList.remove('active');
            nextItem.classList.add('active');
        }
    });
    navContainer.appendChild(nextButton);

    carouselContainer.appendChild(navContainer);

    return carouselContainer;
}

// Função para editar um post
function editPost(postId) {
    const postToEdit = posts.find(post => post.id === postId);
    // Implemente a lógica para editar o post (por exemplo, abrir um modal)
    console.log('Editar post:', postToEdit);
}

// Função para excluir um post
function deletePost(postId) {
    if (confirm('Tem certeza de que deseja excluir este post?')) {
        posts = posts.filter(post => post.id !== postId);
        renderPosts();
    }
}

// Evento para o formulário de criação de post
postForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = document.getElementById('post-text').value;
    const category = document.getElementById('post-category').value;
    const images = [
        document.getElementById('post-image-1').value,
        document.getElementById('post-image-2').value,
        document.getElementById('post-image-3').value
    ].filter(image => image !== '');

    addPost(text, category, images);
    postForm.reset();
});

// Evento para o filtro de categoria
categoryFilter.addEventListener('change', renderPosts);

// Renderiza os posts na inicialização
renderPosts();