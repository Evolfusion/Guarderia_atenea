export default function LoadingOverlay({
  title = "Enviando formulario...",
  message = "Esto puede tardar unos segundos. Por favor esperá."
}) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="spinner"></div>

        <h3 className="loading-title">
          {title}
        </h3>

        <p className="loading-message">
          {message}
        </p>
      </div>
    </div>
  );
}