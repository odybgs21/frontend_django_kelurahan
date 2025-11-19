document.addEventListener('DOMContentLoaded', () => {
    const wargaListContainer = document.getElementById('warga-list-container');
    const formWarga = document.getElementById('form-warga');

    const apiUrl = 'http://127.0.0.1:8000/api/warga/';

    // Fungsi render tampilan 1 warga
    function renderWarga(warga) {
    const wargaDiv = document.createElement('div');
    wargaDiv.classList.add("warga-card");

    // Header (Nama)
    const nama = document.createElement('h3');
    nama.textContent = warga.nama_lengkap;

    // Tabel
    const table = document.createElement('table');
    table.style.width = "100%";
    table.style.marginTop = "10px";
    table.style.borderCollapse = "collapse";

    // Helper untuk membuat baris tabel
    function row(label, value) {
        const tr = document.createElement('tr');

        const td1 = document.createElement('td');
        td1.textContent = label;
        td1.style.padding = "6px 0";
        td1.style.color = "#a8b0b8";
        td1.style.width = "130px";
        td1.style.fontWeight = "600";

        const td2 = document.createElement('td');
        td2.textContent = value;
        td2.style.padding = "6px 0";
        td2.style.color = "#e6e6e6";

        tr.appendChild(td1);
        tr.appendChild(td2);
        return tr;
    }

    // Isi tabel
    table.appendChild(row("NIK", warga.nik));
    table.appendChild(row("Alamat", warga.alamat));
    table.appendChild(row("No Telepon", warga.no_telepon));

    // Susun ke dalam card
    wargaDiv.appendChild(nama);
    wargaDiv.appendChild(table);

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
