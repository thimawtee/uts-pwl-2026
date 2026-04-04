import { render } from "../config/viewEngine";
import * as model from "../models/mahasiswaModel";

// LIST
export const index = async (c) => {
  const data = await model.getAll();
  const success = c.req.query("success");
  const error = c.req.query("error");
  return c.html(
    await render("mahasiswa/index", {
      title: "Data Mahasiswa",
      mahasiswa: data,
      success,
      error,
    }, c)
  );
};

// FORM CREATE
export const createForm = async (c) => {
  return c.html(
    await render("mahasiswa/create", {
      title: "Tambah Mahasiswa",
    }, c)
  );
};

// STORE (Tambah Data)
export const store = async (c) => {
  try {
    const body = await c.req.parseBody();
    
    // Validasi dasar
    if (!body.nama || !body.nim || !body.jurusan || !body.angkatan) {
      return c.redirect("/mahasiswa/create?error=Semua field wajib diisi");
    }

    await model.create({
      nama: body.nama,
      nim: body.nim,
      jurusan: body.jurusan,
      // KONVERSI KE INTEGER
      angkatan: parseInt(body.angkatan), 
    });
    
    return c.redirect("/mahasiswa?success=Data berhasil ditambahkan");
  } catch (error) {
    console.error("Gagal simpan mahasiswa:", error);
    return c.redirect("/mahasiswa/create?error=Gagal simpan data (NIM mungkin duplikat)");
  }
};

// FORM EDIT
export const editForm = async (c) => {
  const id = c.req.param("id");
  const data = await model.getById(id);
  
  if (!data) {
    return c.redirect("/mahasiswa?error=Data tidak ditemukan");
  }

  return c.html(
    await render("mahasiswa/edit", {
      title: "Edit Mahasiswa",
      mhs: data,
    }, c)
  );
};

// UPDATE (Simpan Perubahan)
export const updateData = async (c) => {
  const id = c.req.param("id");
  try {
    const body = await c.req.parseBody();

    if (!body.nama || !body.nim || !body.jurusan || !body.angkatan) {
      return c.redirect(`/mahasiswa/edit/${id}?error=Field tidak boleh kosong`);
    }

    await model.update(id, {
      nama: body.nama,
      nim: body.nim,
      jurusan: body.jurusan,
      // KONVERSI KE INTEGER
      angkatan: parseInt(body.angkatan), 
    });

    return c.redirect("/mahasiswa?success=Data berhasil diupdate");
  } catch (error) {
    console.error("Gagal update mahasiswa:", error);
    return c.redirect(`/mahasiswa/edit/${id}?error=Gagal update data`);
  }
};

// DELETE
export const destroy = async (c) => {
  try {
    const id = c.req.param("id");
    await model.remove(id);
    return c.redirect("/mahasiswa?success=Data berhasil dihapus");
  } catch (error) {
    console.error("Gagal hapus mahasiswa:", error);
    return c.redirect("/mahasiswa?error=Gagal hapus data");
  }
};