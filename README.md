# Website FX Payout

## Gambaran umum sistem
Frontend website dikembangkan menggunakan ReactJs, Typescript, Tailwind CSS. Website dideploy menggunakan platform Vercel dan telah terhubung dengan domain resmi milik klien yang dikelola melalui Hostinger. Vercel digunakan sebagai layanan hosting frontend dengan sistem deployment otomatis dari repository GitHub.

## Cara menjalankan project secara lokal
1. **Instal Node.js dan npm** (jika belum terinstal)
   - Anda bisa mengunduh dan menginstalnya dari [Node.js](https://nodejs.org/).

2. **Download file proyek** dari repository github.
   - Unduh atau clone repository proyek dari GitHub.
   - Simpan proyek di direktori lokal komputer.

3. **Buka terminal** dan arahkan ke direktori proyek.
   - Di Windows: Buka Command Prompt atau PowerShell dan gunakan perintah `cd` untuk masuk ke direktori proyek.
   - Di MacOS/Linux: Buka Terminal dan gunakan perintah `cd` untuk masuk ke direktori proyek.

4. **Instal dependensi:**
   - Jalankan perintah berikut di terminal:
     ```
     npm install
     ```

   Perintah ini akan mengunduh semua dependensi yang diperlukan yang tercantum dalam file `package.json`.

5. **Jalankan Website secara lokal dengan menjalankan perintah berikut di terminal:**
     ```
     npm run dev
     ```

   Website dapat diakses secara lokal melalui http://localhost:5173

6. **Untuk melakukan build website dari React:**
     ```
     npm run build
     ```

## Deployment Website
Website di hosting melalui platform vercel yang dihubungkan dengan domain yang disediakan oleh Hostinger. Setiap perubahan pada branch production akan otomatis dideploy oleh Vercel.
### Domain Website
- Dikelola melalui Hostinger
- Dihubungkan ke Vercel menggunakan pengaturan DNS
### Production & Preview
- Domain Production: Domain production adalah domain resmi yang digunakan oleh pengguna. (https://fxpayout.com)
- Domain Preview: Domain preview hanya digunakan untuk keperluan pengujian dan pengembangan. (https://fxpayout-demo.vercel.app/)
