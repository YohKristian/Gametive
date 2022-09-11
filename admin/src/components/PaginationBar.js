export default function PaginationBar({
  next,
  previous,
  current,
  totalPages,
  toPage,
}) {
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={previous}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li className="page-item pagination">
          {totalPages.map((x, i) => {
            return (
              <a
                key={i}
                className={current === x ? "page-link active" : "page-link"}
                onClick={() => toPage(x)}
              >
                {x}
              </a>
            );
          })}
        </li>
        <li className="page-item">
          <a className="page-link" onClick={next}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
