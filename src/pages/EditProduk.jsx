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
  });

  const [loading, setLoading] = useState(true);
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/produk/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3001/kategori")
      .then((res) => res.json())
      .then((data) => setKategori(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const konfirmasi = window.confirm(
      "Yakin mau menyimpan perubahan ini?"
    );

    if (!konfirmasi) return;

    await fetch(`http://localhost:3001/produk/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Produk berhasil diperbarui!");
    navigate("/produk");
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Edit Produk</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            name="id_kategori"
            value={formData.id_kategori}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Kategori --</option>

            {kategori.map((item) => (
              <option
                key={item.id_kategori}
                value={item.id_kategori}
              >
                {item.kategori}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success me-2">
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