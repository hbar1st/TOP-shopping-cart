import "../styles/App.css";
import PosterSlider from "./PosterSlider.jsx";

function Home() {
  return (
    <>
      <header>
        <h1>Welcome to Hanazon! The randomest shopping experience ever!</h1>
      </header>
      <PosterSlider onClick={handleClick} />
    </>
  );
}

function handleClick() {
  alert("You clicked me!");
}

export default Home;
