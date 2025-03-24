// Configuração do Firebase (crie um projeto gratuito em https://firebase.google.com)
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID"
};
firebase.initializeApp(firebaseConfig);

// Salvar posts no banco de dados
function addPost() {
    const postText = document.getElementById('postInput').value;
    firebase.database().ref('posts').push().set({
        text: postText,
        date: new Date().toLocaleString()
    });
    document.getElementById('postInput').value = "";
}

// Carregar posts
firebase.database().ref('posts').on('value', (snapshot) => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        postsDiv.innerHTML += `<p>${post.date}: ${post.text}</p><hr>`;
    });
});