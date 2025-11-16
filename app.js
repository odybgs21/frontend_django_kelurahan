document.addEventListener('DOMContentLoaded', () => {
    const wargaListContainer = document.getElementById('warga-list-container');
    const formWarga = document.getElementById('form-warga');

    const apiUrl = 'http://127.0.0.1:8000/api/warga/';

    // Fungsi render tampilan 1 warga
    function renderWarga(warga) {
        const wargaDiv = document.createElement('div');
        wargaDiv.style.border = '1px solid #ccc';
        wargaDiv.style.padding = '10px';
        wargaDiv.style.marginBottom = '10px';

        const nama = document.createElement('h3');
        nama.textContent = warga.nama_lengkap;

        const nik = document.createElement('p');
        nik.textContent = `NIK: ${warga.nik}`;

        const alamat = document.createElement('p');
        alamat.textContent = `Alamat: ${warga.alamat}`;

        const telp = document.createElement('p');
        telp.textContent = `No Telepon: ${warga.no_telepon}`;

        wargaDiv.appendChild(nama);
        wargaDiv.appendChild(nik);
        wargaDiv.appendChild(alamat);
        wargaDiv.appendChild(telp);

        return wargaDiv;
    }

    // Load data warga dari API (GET)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            wargaListContainer.innerHTML = '';
            data.results.forEach(warga => {
                wargaListContainer.appendChild(renderWarga(warga));
            });
        })
        .catch(error => {
            wargaListContainer.innerHTML = '<p>Gagal memuat data.</p>';
            console.error(error);
        });

    formWarga.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const nilaiNik = document.getElementById('nik').value;
        const nilaiNama = document.getElementById('nama_lengkap').value;
        const nilaiAlamat = document.getElementById('alamat').value;
        const nilaiTelp = document.getElementById('no_telepon').value;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 43d9fee86aacecbf70615928c71ed70ec8828888' // Jika nanti pakai token
            },
            body: JSON.stringify({
                nik: nilaiNik,
                nama_lengkap: nilaiNama,
                alamat: nilaiAlamat,
                no_telepon: nilaiTelp
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal menyimpan data");
            }
            return response.json();
        })
        .then(wargaBaru => {
            wargaListContainer.appendChild(renderWarga(wargaBaru));

            formWarga.reset();
        })
        .catch(error => {
            alert("Gagal menambah data. Lihat console.");
            console.error(error);
        });
    });
});
