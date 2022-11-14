import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { EndPoint, Paths } from "../../Routes";
import { BoxLoading } from "../../shared/components/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import SignUpTextField, {
  DescriptionTextField,
} from "../components/SignUpTextField";
import SellerSkeleton from "./SellerSkeleton";

export default function SellerEditProduct(props) {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  const auth = useContext(AuthContext);
  const history = useHistory();
  const { pid } = useParams();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const handleButtonAction = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newProduct = {
      name: name,
      image: image,
      description: description,
      amount: amount,
      value: value,
    };

    const response = await fetch(
      EndPoint.seller.storeWithId(auth.storeName, pid),
      {
        method: "PATCH",
        body: JSON.stringify(newProduct),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    if (response.status < 200 || response.status > 299) {
      history.push(Paths.ErrorModal);
      return;
    }

    const responseData = await response.json();
    console.log(responseData);
    setIsLoading(false);
    setSubmitAction(true);
  };

  const handleDeleteButton = async (event) => {
    event.preventDefault();

    const response = await fetch(
      EndPoint.seller.storeWithId(auth.storeName, pid),
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );

    if (response.status < 200 || response.status > 299) {
      history.push(Paths.ErrorModal);
      return;
    }

    setSubmitAction(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(
        EndPoint.seller.storeWithId(auth.storeName, pid),
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      if (response.status < 200 || response.status > 299) {
        history.push(Paths.ErrorModal);
        return;
      }

      const responseData = await response.json();
      const { name, image, description, amount, value } = responseData.product;

      setName(name);
      setImage(image);
      setDescription(description);
      setAmount(amount);
      setValue(value);
      setIsLoading(false);
    };
    fetchProduct();
  }, [pid, auth.storeName, auth.token]);

  return (
    <React.Fragment>
      {submitAction && <Redirect to={Paths.SellerProducts(auth.storeName)} />}
      <SellerSkeleton>
        {isLoading && <BoxLoading />}
        {!isLoading && (
          <Grid container>
            <Grid item xs={8}>
              <Paper
                sx={{
                  background: "#F2F2F2",
                  borderRadius: "20px",
                }}
              >
                <Container>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleButtonAction}
                    sx={{
                      p: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        textAlign: "left",
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "24px",
                        lineHeight: "29px",
                      }}
                    >
                      Editar Produto
                    </Typography>
                    <SignUpTextField
                      name="Nome"
                      label="Nome"
                      margin="normal"
                      value={name}
                      onChange={nameChangeHandler}
                    />
                    <SignUpTextField
                      name="Imagem"
                      label="Imagem"
                      margin="normal"
                      value={image}
                      onChange={imageChangeHandler}
                    />
                    <DescriptionTextField
                      name="Descricao"
                      label="Descricao"
                      margin="normal"
                      multiline
                      rows={4}
                      value={description}
                      onChange={descriptionChangeHandler}
                    />

                    <NumericFormat
                      customInput={SignUpTextField}
                      allowNegative={false}
                      name="Quantidade"
                      label="Quantidade"
                      margin="normal"
                      value={amount}
                      onChange={amountChangeHandler}
                    />
                    <NumericFormat
                      customInput={SignUpTextField}
                      prefix={"R$ "}
                      thousandSeparator="."
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
                      name="Valor"
                      label="Valor"
                      margin="normal"
                      value={value}
                      onChange={valueChangeHandler}
                    />
                    {amount === "0" && (
                      <Button
                        type="button"
                        onClick={handleDeleteButton}
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          height: "48px",
                          borderRadius: "10px",
                          backgroundColor: "red",
                          "&:hover": {
                            backgroundColor: "#631740",
                          },
                        }}
                      >
                        REMOVER
                      </Button>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: "48px",
                        borderRadius: "10px",
                        backgroundColor: "#EB445A",
                        "&:hover": {
                          backgroundColor: "#631740",
                        },
                      }}
                    >
                      Atualizar Produto
                    </Button>
                  </Box>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        )}
      </SellerSkeleton>
    </React.Fragment>
  );
}
