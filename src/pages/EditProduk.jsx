import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    harga: "",
    id_kategori: "",
    nama_file: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // AMBIL DATA PRODUK
  // =========================
  useEffect(() => {
    const getProduk = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/produk/${id}`
        );

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Gagal mengambil data produk");
          return;
        }

        setFormData(data[0]);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data produk");
      } finally {
        setLoading(false);
      }
    };

    getProduk();
  }, [id]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE FOTO
  // =========================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // =========================
  // SIMPAN PERUBAHAN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const yakin = window.confirm(
      "Yakin mau menyimpan perubahan ini?"
    );

    if (!yakin) {
      return;
    }

    try {
      // Ambil token login
      const token = localStorage.getItem("token");

      // Cek token
      if (!token) {
        alert("Silakan login terlebih dahulu.");
        navigate("/login");
        return;
      }

      // FormData untuk mengirim data + foto
      const data = new FormData();

      data.append("judul", formData.judul);
      data.append("deskripsi", formData.deskripsi);
      data.append("harga", formData.harga);
      data.append("id_kategori", formData.id_kategori);

      // Foto hanya dikirim kalau memilih foto baru
      if (file) {
        data.append("file", file);
      }

      const res = await fetch(
        `http://localhost:3001/produk/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await res.json();

      // =========================
      // TOKEN TIDAK VALID
      // =========================
      if (res.status === 401 || res.status === 403) {
        alert(
          result.message ||
            "Token tidak valid. Silakan login kembali."
        );

        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // =========================
      // BERHASIL
      // =========================
      if (res.ok) {
        alert(
          result.message ||
            "Produk berhasil diperbarui!"
        );

        navigate("/produk");
        return;
      }

      // =========================
      // ERROR LAIN
      // =========================
      alert(
        result.message ||
          result.error ||
          "Gagal memperbarui produk"
      );
    } catch (err) {
      console.error("Error update produk:", err);
      alert("Gagal terhubung ke server");
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="container mt-4">
        Loading...
      </div>
    );
  }

  // =========================
  // FORM
  // =========================
  return (
    <div className="container mt-4">

      <h2>Edit Produk</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-3"
      >

        {/* JUDUL PRODUK */}
        <div className="mb-3">
          <label className="form-label">
            Nama Produk
          </label>

          <input
            type="text"
            name="judul"
            value={formData.judul || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* DESKRIPSI */}
        <div className="mb-3">
          <label className="form-label">
            Deskripsi
          </label>

          <textarea
            name="deskripsi"
            value={formData.deskripsi || ""}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        {/* HARGA */}
        <div className="mb-3">
          <label className="form-label">
            Harga
          </label>

          <input
            type="number"
            name="harga"
            value={formData.harga || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* ID KATEGORI */}
        <div className="mb-3">
          <label className="form-label">
            ID Kategori
          </label>

          <input
            type="number"
            name="id_kategori"
            value={formData.id_kategori || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* FOTO */}
        <div className="mb-3">
          <label className="form-label">
            Foto Produk
          </label>

          <input
            type="file"
            name="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />

          <small className="text-muted">
            Kosongkan jika tidak ingin mengganti foto lama.
          </small>
        </div>

        {/* TOMBOL */}
        <button
          type="submit"
          className="btn btn-success me-2"
        >
          Simpan Perubahan
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/produk")}
        >
          Batal
        </button>

      </form>
    </div>
  );
}