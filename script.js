function beli(produk, harga) {
    localStorage.removeItem('selectedProduk');
    localStorage.setItem('selectedProduk', JSON.stringify({ produk, harga }));
    window.location.href = 'transaksi.html';
}

function submitTransaksi() {
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const produk = document.getElementById('produk').value;
    const jumlah = document.getElementById('jumlah').value;
    const pengambilan = document.querySelector('input[name="pengambilan"]:checked');

    if (!pengambilan) {
        alert('Silakan pilih metode pengambilan.');
        return;
    }

    const selectedProduk = JSON.parse(localStorage.getItem('selectedProduk'));
    if (!selectedProduk) {
        alert('Silakan pilih produk.');
        return;
    }

    let transaksiData = JSON.parse(localStorage.getItem('transaksiData')) || [];
    const newPesanan = {
        nama,
        alamat,
        produk,
        jumlah,
        pengambilan: pengambilan.value,
        total: jumlah * selectedProduk.harga
    };

    transaksiData.push(newPesanan);
    localStorage.setItem('transaksiData', JSON.stringify(transaksiData));
    window.location.href = 'invoice.html';
}

function tambahPesanan() {
    window.location.href = 'transaksi.html';
}

function resetPesanan() {
    localStorage.removeItem('transaksiData');
    location.reload();
}

function bayarPesanan() {
    localStorage.removeItem('transaksiData');
    alert('Pesanan Anda sedang dalam proses.');
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('transaksi.html')) {
        const selectedProduk = JSON.parse(localStorage.getItem('selectedProduk'));
        if (selectedProduk) {
            document.getElementById('produk').value = selectedProduk.produk;
        }
    }

    if (window.location.pathname.endsWith('invoice.html')) {
        const transaksiData = JSON.parse(localStorage.getItem('transaksiData')) || [];
        if (transaksiData.length > 0) {
            const tbody = document.querySelector('#invoiceTable tbody');
            transaksiData.forEach(data => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.nama}</td>
                    <td>${data.alamat}</td>
                    <td>${data.produk}</td>
                    <td>${data.jumlah}</td>
                    <td>${data.pengambilan}</td>
                    <td>Rp ${data.total}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }
});
