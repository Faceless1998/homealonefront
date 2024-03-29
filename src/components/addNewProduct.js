import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  MuiThemeProvider,
  TextField,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import env from "./../env.json";

const theme = createTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
      margin: "dense",
    },
    MuiFormControl: {
      variant: "outlined",
      margin: "dense",
    },
  },
});

export default function AddNewProduct() {
  const [name, setName] = useState("");
  const [nameRU, setNameRU] = useState("");
  const [nameGE, setNameGE] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionRU, setDescriptionRU] = useState("");
  const [descriptionGE, setDescriptionGE] = useState("");

  const [thumbImg, setThumbImg] = useState();
  const [productImg, setProductImg] = useState();
  const [feature, setFeature] = useState("");
  const [featureGE, setFeatureGE] = useState("");
  const [featureRU, setFeatureRU] = useState("");

  const [selectType, setSelectType] = useState();
  const [type, setType] = useState("false");

  const [unicProd, setunicProd] = useState("");
  useEffect(() => {
    axios.get(`${env.URL}/api/getallprodtype`).then((result) => {
      if (result.data.success) {
        console.log(result.data.data);
        setSelectType(result.data.data);
      }
    });
  }, []);
  
  const handleFileRead = (fileReader, index) => {
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setProductImg(prevImages => [...prevImages, fileURL]);
    };
  };

  const onChange = (e) => {
    let x = [];
    if (e.target.files.length > 1) {
      for (let i = 0; i < e.target.files.length; i++) {
        let fileReader = new FileReader();
        handleFileRead(fileReader, i);
        fileReader.readAsDataURL(e.target.files[i]);
      }
    } else {
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let fileURL = fileReader.result;
        setThumbImg(fileURL);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const check = () => {
    const data = { name, description, feature, thumbImg, productImg };
    const dataRU = { nameRU, descriptionRU, featureRU };
    const dataGE = { nameGE, descriptionGE, featureGE };
    if (type === "false") {
      alert("აირჩიეთ პროდუქტის ტიპი");
    } else {
      axios
        .post(`${env.URL}/products/add`, {
          type,
          data,
          dataRU,
          dataGE,
          unicProduct: unicProd,
        })
        .then((response) => {
          if (response.data.success) {
            alert("პროდუქტი წარმატებით დაემატა");
          } else {
            alert("პროდუქტის დამატება ვერ მოხერხდა");
          }
        });
    }
  };
  
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    if (event.target.checked) {
      setunicProd("");
    }
    setChecked(event.target.checked);
  };

  return (
    <>
      {console.log(checked, unicProd)}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
          <Box p={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link to="/" style={{ fontSize: 30, textAlign: "center" }}>
                <i class="far fa-arrow-circle-left"></i>
              </Link>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selectType && (
                  <>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="false" defaultChecked>
                        აირჩიეთ პროდუქტის ტიპი
                      </option>
                      {selectType.map((item) => {
                        return (
                          <>
                            <option value={item}>{item}</option>
                          </>
                        );
                      })}
                    </select>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3>ინგლისური</h3>
                <TextField
                  placeholder="დასახელება(EN)"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="აღწერა(EN)"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></TextField>
                <TextareaAutosize
                  placeholder="მახასიათებლები(EN)"
                  minRows={4}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  value={feature}
                  onChange={(e) => {
                    setFeature(e.target.value);
                  }}
                />
                <h3>მთავარი ფოტო</h3>
                <input type="file" onChange={onChange} />
                <h3>პროდუქტის ფოტოები</h3>
                <input type="file" onChange={onChange} multiple />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 20,
                }}
              >
                <h3>ქართული</h3>

                <TextField
                  placeholder="დასახელება(GE)"
                  value={nameGE}
                  onChange={(e) => {
                    setNameGE(e.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="აღწერა(GE)"
                  value={descriptionGE}
                  onChange={(e) => {
                    setDescriptionGE(e.target.value);
                  }}
                ></TextField>
                <TextareaAutosize
                  placeholder="მახასიათებლები(GE)"
                  minRows={4}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  value={featureGE}
                  onChange={(e) => {
                    setFeatureGE(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3>რუსული</h3>

                <TextField
                  placeholder="დასახელება(RU)"
                  value={nameRU}
                  onChange={(e) => {
                    setNameRU(e.target.value);
                  }}
                ></TextField>
                <TextField
                  placeholder="აღწერა(RU)"
                  value={descriptionRU}
                  onChange={(e) => {
                    setDescriptionRU(e.target.value);
                  }}
                ></TextField>
                <TextareaAutosize
                  placeholder="მახასიათებლები(RU)"
                  minRows={4}
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 5,
                    marginTop: 5,
                  }}
                  value={featureRU}
                  onChange={(e) => {
                    setFeatureRU(e.target.value);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <FormControlLabel
                label="გამორჩეული პროდუქტი"
                control={<Checkbox checked={checked} onChange={handleChange} />}
              />
              {checked && (
                <>
                  <TextField
                    placeholder="პროდუქტის კოდი"
                    value={unicProd}
                    onChange={(e) => {
                      setunicProd(e.target.value);
                    }}
                  ></TextField>
                </>
              )}
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  check();
                }}
              >
                პროდუქტის დამატება
              </Button>
            </div>
          </Box>
        </Container>
      </MuiThemeProvider>
    </>
  );
}