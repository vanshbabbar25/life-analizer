function Card({ title, children }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}

export default Card;
