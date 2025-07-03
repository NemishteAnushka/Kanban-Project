
function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className="text-danger mt-1 mb-0 fs-6">{message}</p>;
}

export default ErrorMessage;
