import prisma from "../config/prisma";

// Ambil semua data
export const getAll = async () => {
  return await prisma.mahasiswa.findMany({
    orderBy: { id: 'desc' } // Opsional: urutkan dari yang terbaru
  });
};

// Tambah data baru
export const create = async (data) => {
  return await prisma.mahasiswa.create({
    data: data,
  });
};

// Cari satu data berdasarkan ID
export const getById = async (id) => {
  return await prisma.mahasiswa.findUnique({
    where: { 
      id: parseInt(id) // KONVERSI ID KE INTEGER
    },
  });
};

// Update data
export const update = async (id, data) => {
  return await prisma.mahasiswa.update({
    where: { 
      id: parseInt(id) // KONVERSI ID KE INTEGER
    },
    data: data,
  });
};

// Hapus data
export const remove = async (id) => {
  return await prisma.mahasiswa.delete({
    where: { 
      id: parseInt(id) // KONVERSI ID KE INTEGER
    },
  });
};