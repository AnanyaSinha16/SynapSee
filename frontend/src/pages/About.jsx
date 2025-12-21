export default function About() {
  return (
    <div style={pageStyle}>
      <h1>About SynapSee ✨</h1>

      <p>
        SynapSee is an intelligent AI-powered vision platform designed to simplify accessibility.
        By combining computer vision, OCR, and contextual AI understanding, SynapSee aims to make
        technology more human, intuitive, and inclusive.
      </p>

      <button>← Back to Home</button>
    </div>
  );
}

const pageStyle = {
  paddingTop: "120px",   // pushes content below navbar
  paddingLeft: "80px",   // left indentation
  paddingRight: "80px",
  maxWidth: "900px",     // keeps text readable
};
