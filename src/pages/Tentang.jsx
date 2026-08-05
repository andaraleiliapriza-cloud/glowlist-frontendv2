export default function Tentang() {
  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Tentang Saya</h2>
        </div>

        <div className="card-body">
          <h4 className="card-title">👋 Halo, Saya Andara Leili Apriza</h4>

          <p className="card-text">
            Perkenalkan, nama saya <strong>Andara Leili Apriza</strong>. Saya
            biasa dipanggil <strong>Leli</strong>.
          </p>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Nama</th>
                <td>Andara Leili Apriza</td>
              </tr>
              <tr>
                <th>Nama Panggilan</th>
                <td>Leli</td>
              </tr>
              <tr>
                <th>Jurusan</th>
                <td>Rekayasa Perangkat Lunak (RPL)</td>
              </tr>
              <tr>
                <th>Sekolah</th>
                <td>SMKN 1 Ponorogo</td>
              </tr>
            </tbody>
          </table>

          <p>
            Saya adalah siswi jurusan Rekayasa Perangkat Lunak (RPL) di
            <strong> SMKN 1 Ponorogo</strong>. Saya senang mempelajari
            pemrograman dan sedang belajar membuat aplikasi web menggunakan
            React, Bootstrap, dan JavaScript.
          </p>

          <div className="alert alert-info">
            <strong>Terima kasih</strong> telah mengunjungi halaman tentang
            saya. 😊
          </div>
        </div>
      </div>
    </div>
  );
}