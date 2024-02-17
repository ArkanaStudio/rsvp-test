document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.getElementById('commentForm');
  const commentsSection = document.getElementById('comments');
  
  // Fungsi untuk menyimpan data input ke dalam sessionStorage
  function saveDataToSessionStorage(name, comment) {
    let comments = JSON.parse(sessionStorage.getItem('comments')) || [];
    comments.push({ name, comment });
    sessionStorage.setItem('comments', JSON.stringify(comments));
  }
  
  // Fungsi untuk memuat data dari sessionStorage ke dalam formulir
  function loadDataFromSessionStorage() {
    let comments = JSON.parse(sessionStorage.getItem('comments')) || [];
    comments.forEach(function(commentData) {
      const { name, comment } = commentData;
      addCommentToDOM(name, comment);
    });
  }

  // Fungsi untuk menambahkan komentar ke dalam DOM
  function addCommentToDOM(name, comment) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <p><strong>${name}</strong>: ${comment}</p>
      <button class="delete-btn">Hapus</button>
    `;

    commentsSection.prepend(commentElement);

    // Setelah komentar ditambahkan, tambahkan event listener untuk tombol hapus
    const deleteButton = commentElement.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
      commentElement.remove();
      // Hapus komentar dari sessionStorage juga ketika dihapus dari DOM
      removeCommentFromSessionStorage(name, comment);
    });
  }

  // Fungsi untuk menghapus komentar dari sessionStorage
  function removeCommentFromSessionStorage(name, comment) {
    let comments = JSON.parse(sessionStorage.getItem('comments')) || [];
    comments = comments.filter(function(commentData) {
      return !(commentData.name === name && commentData.comment === comment);
    });
    sessionStorage.setItem('comments', JSON.stringify(comments));
  }

  // Ketika halaman dimuat, muat data dari sessionStorage ke dalam formulir
  loadDataFromSessionStorage();

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    const name = nameInput.value;
    const comment = commentInput.value;

    if (name && comment) {
      addCommentToDOM(name, comment);
      saveDataToSessionStorage(name, comment);

      nameInput.value = '';
      commentInput.value = '';
    } else {
      alert('Nama dan komentar tidak boleh kosong!');
    }
  });
});
