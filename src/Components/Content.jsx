import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import validation from "./Validation";

const Content = () => {
  const alert = useAlert();
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    let myArray = text.split("");
    if (myArray && myArray.length !== 0) {
      for (const item of myArray) {
        let val = validation(item);
        setData((prev) => [...prev, val]);
      }
    }
  }, [text]);
  useEffect(() => {
    if (data.length >= 200) {
      setData([]);
      alert.error("   کد نامعتبره!  ");
    }
  }, [data]);

  const _handleInputChenge = (e) => {
    let val = e.target.value;
    setText(val.trim());
  };
  const _handleInputClick = async () => {
    const nav = navigator.clipboard;
    const value = (await nav.readText()).trim();
    if (nav && value && value !== text) {
      setText(value);
      setData([]);
      alert.success("برای کپی کردن روی متن کلیک کنید");
    } else if (value === text) {
      alert.error("   تکراری!  ");
    } else {
      alert.error("   کد نامعتبره!  ");
    }
  };

  const _updateClipboard = async (e) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(
        " اسپل کد فعالسازی از چپ به راست  : " + data
      );
      alert.success("کپی شد");
      setData([]);
      setText("");
    } else {
      alert.error("   مشکلی پیش اومده !  ");
    }
  };

  return (
    <>
      <div id="content">
        <input
          id="pastehere"
          data-paste="#pastehere"
          type="text"
          onClick={() => _handleInputClick()}
          onChange={(e) => _handleInputChenge(e)}
          value={text}
          placeholder="کلیک کنید"
        />

        <div
          className="data"
          data-copy="#mysection"
          data-done="section copied"
          onClick={(e) => _updateClipboard(e)}
        >
          {text && data.length ? <h3>{text.trim()}</h3> : null}
          {text && data.length ? (
            <>
              <p>👇 اسپل کد فعالسازی از چپ به راست 👇</p>
            </>
          ) : null}
          <ul>
            {data && data.length
              ? data.map((item, index) => (
                  <li key={index}>
                    {item}
                    {"  ,  "}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Content;
