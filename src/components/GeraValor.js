import firebase from 'firebase';
import 'firebase/database';
import React, { useState, Fragment } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from '../image/logo.png';


export default function GerarValor() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [newPix, setPix] = useState();
  const [newTextId, setTextId] = useState('');
  const [newMessage, setMessage] = useState('');
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const { value = "" } = e.target;
  //   const parsedValue = value.replace(/[^\d.]/gi, "");
  //   setPix(parsedValue);
  // };
  // const handleOnBlur = () => setPix(Number(newPix).toFixed(2));

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const { value = "" } = e.target;
  //   const parsedValue = value.replace(/[^\d.]/gi, "");
  //   setPix(parsedValue);
  // };
  
  // const handleOnBlur = () => {
  //   // Formatação para garantir que o zero seja mantido antes do valor de centavos
  //   const formattedValue = newPix
  //     ? newPix.replace(/^0+(\d+\.\d{0,2})?$/, "$1") // Remover zeros à esquerda, exceto antes do ponto
  //     : "0.00"; // Valor padrão se vazio
  
  //   setPix(formattedValue);
  // };

  const handleChange = (e) => {
    if (e && e.target) {
        const { value = "" } = e.target;
        // Substituir vírgula por ponto
        const valueWithPoint = value.replace(/,/g, ".");
        // Remover caracteres não numéricos, exceto o ponto decimal
        const parsedValue = valueWithPoint.replace(/[^\d.]/g, "");
        setPix(parsedValue);
    }
};


  const handleOnBlur = () => {
    if (typeof newPix === 'string' && newPix !== '') {
      setPix(Number(newPix).toFixed(2));
    }
  };
  
  
  
  
  
  //logout incio 
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Falha para fazer logout")
    }
  }
  //Criar pix realtime 
  const user = firebase.auth().currentUser;
  async function handCreatPix(event) {
    event.preventDefault()

    const firebaseClient = {
      valorPix: newPix,
      authorId: currentUser.uid,
      textId: newTextId,
      message: newMessage,
      // date utc create 
      date: new Date().toUTCString()
    };
   const created =  await firebase.database().ref(`clients/${user?.uid}/PixCreated/`).push(firebaseClient);
   console.log(created.key);
   
   
    history.push("/QRCode/" + created.key);
  };
 
  return (
    <Fragment>
      <Card className="text-white  shadow  bg-secondary rounded mb-2">
        <div className="w-100 text-right">
          <Button className="mr-03 badge badge-secondary" variant="link" onClick={handleLogout}>
            SAIR
          </Button>
        </div>
        <Card.Body>
          <div className="text-center">
            <img src={logo} alt="Gera pix" width="200" />
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
        </Card.Body>
      </Card>
      <Card.Footer className="shadow p-3 mb-5 bg-dark text-white rounded p-3 mb-2">
        <div className="user-info text-center mb-4">
          <Form>
            <Form.Group className="mb-4" id="chave">
              <Form.Label className="mb-0"><h4>Valor da conta</h4></Form.Label>
              <small className="form-text text-muted">R${newPix} Digite o valor do PIX </small>
              <CurrencyFormat
                className="form-control"
                name="newPix"
                id="newPix"
                value={newPix}
                decimalScale={2}
                prefix="R$"
                onChange={handleChange}
                onBlur={handleOnBlur}
                placeholder="R$ 0,00"
              />


              <small className="form-text text-right text-muted">Digite um Identificador da venda (txid) </small>
              <Form.Control type="text" name="newTextId" required placeholder="Digite um Identificador da venda"
                onChange={(event) => setTextId(event.target.value)} />

              <small className="form-text text-right text-muted">Informações adicionais (opcional) </small>
              <Form.Control type="text" name="newMessage" required placeholder="Mensagem para o cliente"
                onChange={(event) => setMessage(event.target.value)} />
            </Form.Group>
            <Button onClick={handCreatPix} className="w-100" type="submit">
              CRIAR QR-CODE
            </Button>
          </Form>
        </div>
        <div className="pl-3 pr-3 row justify-content-between mt-4">
          <Link className="btn btn-primary btn-sm" to="/UpData">Atualizar chave</Link>
          <Link to="/update-profile" className="btn btn-primary btn-sm mt-8">
            Atualizar senha
          </Link>
        </div>
      </Card.Footer>
    </Fragment>
  )
}
