// --- Inisialisasi Data Default ---
let selectedPackage = {
    name: "",
    price: 0,
    robux: 0
};

// --- 1. Logika Pemilihan Paket Robux ---
function selectPack(element, name, robuxAmount, priceValue) {
    // Hapus class 'active' dari semua paket sebelumnya
    const allPackages = document.querySelectorAll('.package-item');
    allPackages.forEach(pkg => pkg.classList.remove('active'));

    // Tambahkan class 'active' pada paket yang diklik
    element.classList.add('active');

    // Update data paket terpilih
    selectedPackage.name = name;
    selectedPackage.robux = robuxAmount;
    selectedPackage.price = priceValue;

    // Update tampilan Rincian Pembelian secara real-time
    updateSummary();
}

// --- 2. Update Tampilan Rincian (Summary) ---
function updateSummary() {
    const summPack = document.getElementById('summPack');
    const summPrice = document.getElementById('summPrice');
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (selectedPackage.name !== "") {
        summPack.innerText = `${selectedPackage.robux} Robux (${selectedPackage.name})`;
        summPrice.innerText = `Rp ${selectedPackage.price.toLocaleString('id-ID')}`;
    }
}

// --- 3. Event Listener untuk Perubahan Metode Pembayaran ---
document.getElementById('paymentMethod').addEventListener('change', function() {
    updateSummary();
});

// --- 4. Logika Konfirmasi Pembayaran ---
function confirmOrder() {
    const robloxId = document.getElementById('robloxId').value;
    
    // Validasi Input
    if (!robloxId) {
        alert("⚠️ Maaf, ID Roblox tidak boleh kosong!");
        return;
    }

    if (selectedPackage.price === 0) {
        alert("⚠️ Silakan pilih paket Robux terlebih dahulu!");
        return;
    }

    const method = document.getElementById('paymentMethod').value;
    
    // Simulasi Proses (Bisa diarahkan ke WhatsApp Admin)
    const confirmMsg = `Konfirmasi Pesanan:
--------------------------
ID Roblox: ${robloxId}
Paket: ${selectedPackage.robux} Robux
Metode: ${method}
Total: Rp ${selectedPackage.price.toLocaleString('id-ID')}

Apakah data sudah benar?`;

    if (confirm(confirmMsg)) {
        // Contoh mengarahkan ke WhatsApp otomatis
        const waNumber = "628123456789"; // Ganti dengan nomor Anda
        const text = encodeURIComponent(`Halo BUXUP, saya ingin beli ${selectedPackage.robux} Robux untuk ID: ${robloxId} via ${method}`);
        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    }
}

// --- 5. Logika Contact Us & Logout ---
function sendMessage() {
    const message = document.querySelector('textarea').value;
    if (message.trim() === "") {
        alert("Tuliskan pesan Anda terlebih dahulu.");
    } else {
        alert("Pesan Anda telah terkirim ke tim BUXUP. Terima kasih!");
        document.querySelector('textarea').value = "";
    }
}

function handleLogout() {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
        alert("Anda telah keluar dari sesi BUXUP.");
        window.location.reload(); // Reset halaman
    }
}