export default function Theme({ imageSource }) {
  return (
    <img
      src={imageSource}
      style={{
        height: "40%",
        width: "90%",
        margin: "16px",
        borderRadius: "8px",
      }}
    />
  );
}
