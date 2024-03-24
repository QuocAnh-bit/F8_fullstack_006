import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Button({ btnText, link, disabled }) {
  return (
    <>
      {link ? (
        <Link className="btn-style" to={link}>
          {btnText}
        </Link>
      ) : (
        // eslint-disable-next-line react/no-unknown-property
        <button className="btn-style" disabled={disabled}>
          {btnText}
        </button>
      )}
    </>
  );
}
