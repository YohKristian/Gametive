export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ paddingTop: "50px" }}>
      <i
        className="fa-solid fa-magnifying-glass"
        style={{
          color: "#FF7F3F",
          position: "absolute",
          paddingTop: "6px",
          paddingLeft: "5px",
          fontSize: "25px",
        }}
      ></i>
      <input
        style={{
          width: "800px",
          padding: "8px 0 8px 40px",
          boxShadow: "0 0 10px grey",
          borderRadius: 5,
          outline: "none",
          border: "none",
        }}
        type="text"
        placeholder="Search Here..."
        name="query"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
