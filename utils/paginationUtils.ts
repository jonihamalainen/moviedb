import { Elokuva } from "@/lib/elokuva_collection";

export const paginationUtils = (elokuvat: Elokuva[], sivu: string): any => {
  const totalData: number = elokuvat.length;
  const dataPerPage: number = 40;

  const totalPages: number = Math.ceil(totalData / dataPerPage);

  let currentPage: number = 1;

  if (Number(sivu) >= 1) {
    currentPage = Number(sivu);
  }

  let sliceStart: number = (currentPage - 1) * dataPerPage;

  let sliceEnd: number = currentPage * dataPerPage;

  return [totalPages, sliceStart, sliceEnd]
};
