
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect} from "react";
import {useTranslation} from "react-i18next"

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  const {i18n, t} = useTranslation(["new"])
  const [newInputs, setNewInputs] = useState(inputs)

  useEffect(() => { 
    if(inputs[0].label === "Username"){
      setNewInputs(prev => prev.map((input) => {
        switch(input.id){
          case 1:
            return {...input, label: t("username")}
          case 2:
            return {...input, label: t("name")}
          case 3:
            return {...input, label: t("email")}
          case 4:
            return {...input, label: t("phone")}
          case 5:
            return {...input, label: t("password")}
          case 6:
            return {...input, label: t("address")}
          case 7:
            return {...input, label: t("country")}
          default: 
            return input 
        }
      }))
    } else if (inputs[0].label === "Title"){
      setNewInputs(prev => prev.map((input) => {
        switch(input.id){
          case 1:
            return {...input, label: t("title")}
          case 2:
            return {...input, label: t("description")}
          case 3:
            return {...input, label: t("category")}
          case 4:
            return {...input, label: t("price")}
          case 5:
            return {...input, label: t("stock")}
          default: 
            return input 
        }
      }))
    }


  }, [i18n, t, inputs])
  


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          {title === "user" && (<h1>{t("addNewUser")}</h1>)}
          {title === "product" && (<h1>{t("addNewProduct")}</h1>)}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  {t("image")}: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {newInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>{t("send")}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;