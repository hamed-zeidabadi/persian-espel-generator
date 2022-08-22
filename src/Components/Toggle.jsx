import { useState, useEffect } from "react";

const ToogleButton = () => {
  const [toggle, setToggle] = useState("light");

  useEffect(() => {
    const black = "#2C3333";
    const white = "#F1F1F1";
    if (toggle === "dark") {
      _document("--background", black);
      _document("--btn", white);
      _document("--font", white);
    }
    if (toggle === "light") {
      _document("--background", white);
      _document("--btn", black);
      _document("--font", black);
    }
  }, [toggle]);

  const _OnChengeColor = () => {
    toggle === "light" ? setToggle("dark") : setToggle("light");
  };
  const _document = (name, color) =>
    document.documentElement.style.setProperty(name, color);

  return (
    <>
      <section id="toggle">
        <ul className="tg-list">
          <li className="tg-list-item">
            <input
              className="tgl tgl-ios"
              id="cb2"
              type="checkbox"
              onClick={() => _OnChengeColor()}
            />
            <label className="tgl-btn" htmlFor="cb2"></label>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ToogleButton;
