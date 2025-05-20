<!-- 🚀 MedSync README 🚀 -->


# 📋 Daftar Isi

1. [Deskripsi Singkat](#deskripsi-singkat)  
2. [Tim Pengembang](#tim-pengembang)  
3. [Fitur Utama](#fitur-utama)  
4. [Arsitektur & Alur Kerja](#arsitektur--alur-kerja)  


---

## 🔎 Deskripsi Singkat

**MedSync** adalah platform web yang dirancang untuk **menyimpan**, **mengelola**, dan **berbagi** rekam medis pasien secara **aman**.  
Pasien dapat mengunggah data kesehatan, melihat riwayat lengkap, dan mengizinkan dokter atau rumah sakit untuk mengakses informasi terkini — memperlancar proses diagnosis dan perawatan.

---

## 👥 Kelompok 25 SBD

| Nama                          | NPM           |
| ----------------------------- | ------------- |
| Isyana Trevia Pohaci          | 2306250592             |
| Salim                         | —             |
| Matthew Immanuel Sitorus      | 2306221024    |
| Jeremy Wijanarko Mulyono      | 2306267132    |

---

## 🚀 Fitur Utama

| Modul                      | Operasi CRUD                          | Deskripsi Singkat                                      |
| -------------------------- | ------------------------------------- | ------------------------------------------------------- |
| **User & Auth**            | Register, Login, Read, Update, Delete | Manajemen akun pasien dan dokter dengan validasi email |
| **Patient**                | Create, Read, Update, Delete          | Simpan data dasar pasien (nama, usia, alamat)          |
| **Doctor**                 | Create, Read, Update, Delete          | Data dokter lengkap untuk rujukan dan diagnosa         |
| **Hospital**               | Create, Read, Update, Delete          | Info rumah sakit (nama, alamat, layanan)               |
| **Appointment**            | Create, Read, Update, Delete          | Jadwal pertemuan dokter–pasien                         |
| **Appointment Detail**     | Create, Read, Update, Delete          | Catatan rinci saat konsultasi (diagnosis, resep, dsb.) |
| **Medical Records**        | (Terintegrasi)                         | Hubungan diagnosis dengan riwayat medis pasien         |

✨ **Keunggulan**  
- 🔒 Enkripsi dan keamanan data  
- 📱 Responsive & user-friendly UI  
- 🔗 Hubungan langsung antar modul (mis. detail janji → rekam medis)  
- ⚡️ Performa cepat dengan arsitektur RESTful API

---

## 🏗️ Arsitektur & Alur Kerja

1. **Client (Front-end)**  
   - Antarmuka web (React/Vue/HTML–CSS) yang memanggil endpoint RESTful  
2. **Server (Back-end)**  
   - Express.js sebagai framework  
   - Setiap modul (`user`, `patient`, `doctor`, `hospital`, `appointment`, `appointmentDetail`) memiliki _controller_ dan _repository_  
   - _Controller_ menangani request/response dan menormalisasi respons via `baseResponse`  
   - _Repository_ berinteraksi dengan database (CRUD)  
3. **Database**  
   - Penyimpanan data relasional (MySQL/PostgreSQL)  
   - Skema terhubung: pasien ←→ janji ←→ detail janji ←→ diagnosa  
4. **Alur Contoh**  
   - Pasien mendaftar → membuat janji → dokter menambahkan detail konsultasi → data langsung tersedia di riwayat medis pasien.

---


