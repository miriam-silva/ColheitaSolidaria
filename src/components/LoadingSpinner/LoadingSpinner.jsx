import styles from "./LoadingSpinner.module.css"

export default function LoadingSpinner({size = 60, color = '#a50000'}) {
  const borderWidth = size * 0.1;

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${borderWidth}px solid rgba(0, 0, 0, 0.1)`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: `${styles.spin} 1s linear infinite`
  };

    return (
      <div className={`${styles.spinner_container}`}>
        <div className={`${styles.loading_spinner}`} role="status" aria-label="Carregando..." style={spinnerStyle}></div>
      </div>
    );
  }