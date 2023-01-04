import { Box, Button, Grid, Paper, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Redirect, useHistory, useParams } from "react-router-dom";

import {
  EndPoint,
  Paths,
  BoxLoading,
  SignUpTextField,
  DescriptionTextField,
  SellerSkeleton,
  useHttp,
} from "LojaUniversal";

export default function SellerEditProduct() {
  const [submitAction, setSubmitAction] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState("");

  const { isLoading, sendRequest } = useHttp();
  const history = useHistory();
  const { pid, storeName } = useParams();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const imageChangeHandler = (event) => {
    setImage(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
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
    const newProduct = {
      name: name,
      image: image,
      category,
      description: description,
      amount: amount,
      value: value,
    };

    const responseData = await sendRequest(
      EndPoint.seller.storeWithId(storeName, pid),
      false,
      "PATCH",
      JSON.stringify(newProduct)
    );

    console.log(responseData);
    setSubmitAction(true);
  };

  const handleDeleteButton = async (event) => {
    event.preventDefault();

    await sendRequest(
      EndPoint.seller.storeWithId(storeName, pid),
      false,
      "DELETE"
    );

    setSubmitAction(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const responseData = await sendRequest(
        EndPoint.seller.storeWithId(storeName, pid),
        false
      );

      const { name, image, description, category, amount, value } =
        responseData.product;

      setName(name);
      setImage(image);
      setCategory(category);
      setDescription(description);
      setAmount(amount);
      setValue(value);
    };
    fetchProduct();
  }, [sendRequest, pid, storeName, history]);

  return (
    <>
      {submitAction && <Redirect to={Paths.SellerProducts(storeName)} />}
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

                    <SignUpTextField
                      name="Categoria"
                      label="Categoria"
                      margin="normal"
                      value={category}
                      onChange={categoryChangeHandler}
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
    </>
  );
}
