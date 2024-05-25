const dataAkun = Array(1000).fill().map(() => ({ username: '', password: '' }));

function hashFunction(key) {
    const charCodeSum = key.toLowerCase().charCodeAt(0) - 97;
    return charCodeSum >= 0 && charCodeSum < 26 ? charCodeSum : -1;
}

function isUsernameUnique(username) {
    return !dataAkun.some(account => account.username.toLowerCase() === username.toLowerCase());
}

function findEmptySlot(startIndex) {
    let index = startIndex;
    while (dataAkun[index].username !== '') {
        index = (index + 1) % 1000;
        if (index === startIndex) return -1;
    }
    return index;
}

function cekDaftar(username, password) {
    const startIndex = hashFunction(username);

    if (startIndex === -1) {
        document.getElementById('output').innerText = 'Username tidak valid!!';
        return false;
    }

    if (!isUsernameUnique(username)) {
        document.getElementById('output').innerText = 'Username sudah ada!!';
        return false;
    }

    let index = findEmptySlot(startIndex);

    if (index === -1) {
        document.getElementById('output').innerText = 'Slot kosong tidak ditemukan!!';
        return false;
    }

    dataAkun[index].username = username;
    dataAkun[index].password = password;
    document.getElementById('output').innerText = 'Selamat, akun Anda telah terdaftar!!';
    return true;
}

function cekLogin(username, password) {
    const index = hashFunction(username);
    return index !== -1 && dataAkun[index].username === username && dataAkun[index].password === password;
}

function cekHapusAkun(username) {
    const index = hashFunction(username);

    if (index === -1) {
        document.getElementById('output').innerText = 'Username tidak valid!!';
        return false;
    }

    let startIndex = index;
    while (dataAkun[index].username !== username) {
        index = (index + 1) % 26;
        if (index === startIndex) {
            document.getElementById('output').innerText = 'Data akun tidak ada!!';
            return false;
        }
    }

    dataAkun[index].username = '';
    dataAkun[index].password = '';
    document.getElementById('output').innerText = 'Data akun berhasil dihapus!!';
    return true;
}

function printDataAkun() {
    let output = '\nData Akun : \n';
    output += '| Index\t - Username - Password |\n';
    dataAkun.forEach((account, i) => {
        output += `| ${i}\t - ${account.username || '(kosong)'} - ${account.password || '(kosong)'} |\n`;
    });
    document.getElementById('output').innerText = output;
}

function viewDaftar() {
    let username = document.getElementById('daftarUsername').value.trim();
    let password = document.getElementById('daftarPassword').value.trim();

    if (cekDaftar(username, password)) {
        showMenu('menu');
    }
}

function viewLogin() {
    let username = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value.trim();

    if (cekLogin(username, password)) {
        showMenu('menu');
    } else {
        document.getElementById('output').innerText = 'Login Gagal!!';
    }
}

function showTambahAkun() {
    showMenu('daftar');
}

function showDataAkun() {
    printDataAkun();
    showMenu('dataAkun');
}

function viewHapusAkun() {
    let username = prompt('Isi username akun yang ingin dihapus : ').trim();

    if (cekHapusAkun(username)) {
        document.getElementById('output').innerText = 'Data akun berhasil dihapus!!';
    } else {
        document.getElementById('output').innerText = 'Data akun gagal dihapus!!';
    }
}

function logout() {
    showMenu('welcome');
    document.getElementById('output').innerText = 'Anda berhasil logout';
}

function showMenu(menuId) {
    const menus = ['welcome', 'daftar', 'login', 'menu', 'dataAkun'];
    menus.forEach(menu => {
        document.getElementById(menu).style.display = menu === menuId ? 'block' : 'none';
    });
}
