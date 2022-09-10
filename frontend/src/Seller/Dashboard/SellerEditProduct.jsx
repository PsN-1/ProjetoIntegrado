import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { EndPoint, getStoreName, Paths } from "../../Routes";
import Loading from "../../shared/components/Loading";
import SignUpTextField, {
  DescriptionTextField,
} from "../components/SignUpTextField";
import SellerSkeleton from "./SellerSkeleton";

export default function SellerEditProduct(props) {
  const [submitAction, setSubmitAction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  let { pid } = useParams();

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

    const response = await fetch(EndPoint.storeWithId(productId), {
      method: "PATCH",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    setIsLoading(false);
    setSubmitAction(true);
  };

  const handleDeleteButton = async (event) => {
    event.preventDefault();

    await fetch(EndPoint.storeWithId(productId), {
      method: "DELETE",
    });

    setSubmitAction(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch(EndPoint.storeWithId(pid));
      const responseData = await response.json();
      const { _id, name, image, description, amount, value } =
        responseData.product;

      setProductId(_id);
      setName(name);
      setImage(image);
      setDescription(description);
      setAmount(amount);
      setValue(value);
      setIsLoading(false);
    };
    fetchProduct();
  }, [pid]);

  return (
    <React.Fragment>
      {isLoading && <Loading />}
      {!isLoading && (
        <SellerSkeleton>
          {submitAction && (
            <Redirect to={Paths.SellerProducts(getStoreName())} />
          )}
          <Typography
            sx={{
              paddingLeft: 5,
              textAlign: "left",
              fontStyle: "italic",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "29px",
            }}
          >
            Editar Produto
          </Typography>
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
                      mt: 3,
                    }}
                  >
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
                    <SignUpTextField
                      name="Quantidade"
                      label="Quantidade"
                      margin="normal"
                      value={amount}
                      onChange={amountChangeHandler}
                    />
                    <SignUpTextField
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
        </SellerSkeleton>
      )}
    </React.Fragment>
  );
}
