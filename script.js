document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const nameInput = document.getElementById('nameInput');
    const dataInput = document.getElementById('dataInput');
    const saveButton = dataForm.querySelector('button');
    const dataItems = document.getElementById('dataItems');

    // Fungsi untuk menampilkan data dari LocalStorage
    function displayData() {
        const storedData = JSON.parse(localStorage.getItem('dataList')) || [];
        dataItems.innerHTML = '';
        storedData.forEach((item, index) => {
            const li = document.createElement('li');
            
            // Menampilkan nama kode
            const nameElement = document.createElement('div');
            nameElement.className = 'name';
            nameElement.textContent = item.name;

            // Membuat elemen kode
            const codeBlock = document.createElement('pre');
            codeBlock.className = 'code';
            codeBlock.textContent = item.code;

            // Membuat tombol untuk menampilkan/menyembunyikan kode
            const toggleButton = document.createElement('button');
            toggleButton.className = 'toggle-button';
            toggleButton.textContent = 'Tampilkan Kode';
            toggleButton.onclick = () => {
                const isVisible = codeBlock.style.display === 'block';
                codeBlock.style.display = isVisible ? 'none' : 'block';
                toggleButton.textContent = isVisible ? 'Tampilkan Kode' : 'Sembunyikan Kode';
            };

            // Membuat tombol salin
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Salin';
            copyButton.onclick = () => {
                navigator.clipboard.writeText(item.code)
                    .then(() => {
                        alert('Kode berhasil disalin!');
                    })
                    .catch(err => {
                        console.error('Gagal menyalin kode: ', err);
                    });
            };

            // Membuat tombol hapus
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Hapus';
            deleteButton.onclick = () => {
                deleteData(index);
            };

            li.appendChild(nameElement);
            li.appendChild(toggleButton);
            li.appendChild(copyButton);
            li.appendChild(codeBlock);
            li.appendChild(deleteButton);
            dataItems.appendChild(li);
        });
    }

    // Fungsi untuk menghapus data berdasarkan index
    function deleteData(index) {
        const storedData = JSON.parse(localStorage.getItem('dataList')) || [];
        storedData.splice(index, 1); // Menghapus item dari array
        localStorage.setItem('dataList', JSON.stringify(storedData));
        displayData(); // Menampilkan ulang data
    }

    // Fungsi untuk memeriksa validitas input
    function checkInput() {
        if (nameInput.value.trim() !== '') {
            dataInput.disabled = false;
            saveButton.disabled = false;
        } else {
            dataInput.disabled = true;
            saveButton.disabled = true;
            dataInput.value = '';
        }
    }

    // Menampilkan data saat halaman dimuat
    displayData();

    // Menangani perubahan input nama
    nameInput.addEventListener('input', checkInput);

    // Menangani pengiriman formulir
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newName = nameInput.value;
        const newData = dataInput.value;
        const storedData = JSON.parse(localStorage.getItem('dataList')) || [];
        storedData.push({ name: newName, code: newData });
        localStorage.setItem('dataList', JSON.stringify(storedData));
        nameInput.value = '';
        dataInput.value = '';
        dataInput.disabled = true;
        saveButton.disabled = true;
        displayData();
    });
});
