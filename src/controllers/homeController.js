import { render } from "../config/viewEngine.js";
import prisma from "../config/prisma.js";

export const home = async (c) => {
  const totalMahasiswa = await prisma.mahasiswa.count();
  const mahasiswa = await prisma.mahasiswa.findMany({
    orderBy: { id: "desc" },
    take: 10, // tampilkan 10 terbaru
  });

  const html = await render("home", {
    title: "Dashboard Bun MVC",
    totalMahasiswa,
    mahasiswa,
  });
  return c.html(html);
};