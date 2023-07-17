import { paginationGenreUtils } from "@/utils/paginationGenreUtils";
import Link from "next/link";

interface Props {
  currentPage: number;
  totalPages: number;
  genre: string;
}

function Paginationbtn({
  currentPage,
  totalPages,
  genre,
}: Props): React.ReactElement {

  const fixedGenre: string = paginationGenreUtils(genre);
  return (
    <>
      <div className="join">
        {currentPage > 1 ? (
          <Link href={`/${fixedGenre}/${currentPage - 1}`}>
            <button className="join-item btn">«</button>
          </Link>
        ) : (
          <button className="join-item btn btn-disabled">«</button>
        )}
        <button className="join-item btn">
          {currentPage + "/" + totalPages}
        </button>
        {totalPages !== currentPage ? (
          <Link href={`/${fixedGenre}/${currentPage + 1}`}>
            <button className="join-item btn">»</button>
          </Link>
        ) : (
          <button className="join-item btn btn-disabled">»</button>
        )}
      </div>
    </>
  );
}

export default Paginationbtn;
