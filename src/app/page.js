"use client";

import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import Button from "@/components/home/button";
import Input from "@/components/home/input";
import Select from "@/components/home/select";
import { SectionTitle } from "@/components/SectionTitle";
import Image from "next/image";
import { useEffect, useState } from "react";

import VMasker from "vanilla-masker";

import QRCode from "react-qr-code";
import eventando from "@/network/eventando";
import Modal from "@/components/home/modal";

const options = [
  { value: "Sem comunidade", label: "Sem comunidade" },
  { value: "AWS User Group Goiânia", label: "AWS User Group Goiânia" },
  { value: "CS Meetup GO", label: "CS Meetup GO" },
  { value: "DevOpsGO", label: "DevOpsGO" },
  { value: "GAMEGO", label: "GAMEGO" },
  { value: "GDG Goiânia", label: "GDG Goiânia" },
  { value: "GOJava", label: "GOJava" },
  { value: "GUOCB", label: "GUOCB" },
  { value: "IxDA", label: "IxDA" },
  { value: "MulheresGO", label: "MulheresGO" },
  { value: "Override .Net Community", label: "Override .Net Community" },
  { value: "PorteraTech", label: "PorteraTech" },
  { value: "Product Camp Goiás", label: "Product Camp Goiás" },
  { value: "React Goiânia", label: "React Goiânia" },
  { value: "StartupGO", label: "StartupGO" },
  { value: "Anapolivre", label: "Anapolivre" },
];

const products = [
  { value: "Com Camisa", label: "Ingresso com camisa - R$ 140,00" },
  { value: "Sem Camisa", label: "Ingresso sem camisa - R$ 120,00" },
];

const tshirtSizes = [
  { value: "XS", label: "Muito pequeno" },
  { value: "S", label: "Pequeno" },
  { value: "M", label: "Médio" },
  { value: "L", label: "Grande" },
  { value: "XL", label: "Muito Grande" },
];

let confirmationPaymentInterval = null;

export default function Home() {
  const [communitySelected, setCommunity] = useState(options[0].value);
  const [productSelected, setProduct] = useState(products[0].value);
  const [tshirtSize, setTShirtSize] = useState(tshirtSizes[0].value);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [paymentResponse, setPaymentResponse] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const checkPayment = async () => {
    try {
      let response = await eventando.payment.detail({
        id: paymentResponse.payment_id,
      });

      console.log("confirmation response: ", [
        response.data.data.attributes,
        response.data.data.attributes.status === "CONFIRMED",
      ]);

      if (response.data.data.attributes.status === "CONFIRMED") {
        setShowModal(false);
        setConfirmModal(true);
        clearInterval(confirmationPaymentInterval);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (paymentResponse) {
      setShowModal(true);

      confirmationPaymentInterval = setInterval(checkPayment, [500]);
    }
  }, [paymentResponse]);

  const submitSignup = async () => {
    if (paymentResponse) {
      return;
    }

    if (!name || !phone || !email) {
      alert("Preencha corretamente todos os campos");

      return;
    }

    const productId = productSelected === "Com Camisa" ? 1 : 2;

    try {
      const response = await eventando.event.signup({
        name,
        email,
        phoneNumber: phone,
        additionalInformation: communitySelected,
        tShirtSize: tshirtSize,
        paymentOption: productId,
      });

      setPaymentResponse(response.data);

      setName("");
      setPhone("");
      setEmail("");

      setCommunity(options[0].value);
      setProduct(products[0].value);
      setTShirtSize(tshirtSizes[0].value);

      console.log("response: ", response);
    } catch (err) {
      alert("Houve um erro ao tentar fazer sua inscrição. Entre em contato.");
    }
  };

  return (
    <Container>
      <Hero />

      <Modal
        visible={confirmModal}
        title={"Pagamento"}
        description={
          "Pagamento recebido com sucesso. Em breve você receberá mais informações no seu email e WhatsApp. Obrigado por nos apoiar. \n Organização Join Community"
        }
        handleVisible={() => {
          setConfirmModal((s) => !s);
        }}
        onClick={() => {
          setConfirmModal(false);
        }}
        buttonTitle={"Ok"}
      />
      <Modal
        visible={showModal}
        title={"Pagamento"}
        description={"Abaixo o QR Code para pagamento"}
        handleVisible={() => {
          setShowModal((s) => !s);
        }}
        onClick={() => {
          if (paymentResponse) {
            navigator.clipboard.writeText(paymentResponse.qr_code);
          }
        }}
        buttonTitle={"Copiar QR Code"}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={paymentResponse?.qr_code || ""}
          viewBox={`0 0 256 256`}
        />
      </Modal>

      <Container>
        <SectionTitle
          preTitle="PRÉ-VENDA ATÉ O DIA 20 DE AGOSTO DE 2024"
          title="Guardaremos um lugar especial para quem acredita no projeto"
        >
          Serão divulgados os nomes de quem fizer a inscrição na pré-venda como
          uma forma de agradecimento por acreditar no projeto e contribuir para
          a construção da comunidade.
        </SectionTitle>

        <div>
          <Input
            title="Nome completo"
            type="text"
            value={name}
            placeholder="Digite seu nome completo"
            onChange={(value) => {
              setName(value);
            }}
          />
          <Input
            title="Email"
            type="email"
            placeholder="Digite seu melhor email"
            value={email}
            onChange={(value) => {
              setEmail(value);
            }}
          />
          <Input
            title="Celular"
            type="phone"
            placeholder="Digite seu número do WhatsApp"
            value={phone}
            onChange={(value) => {
              setPhone(VMasker.toPattern(value, "(99) 99999-9999"));
            }}
          />

          <Select
            onChange={setCommunity}
            title={"Selecione sua comunidade"}
            options={options}
          />
          <Select
            title={"Selecione o ingresso"}
            options={products}
            onChange={setProduct}
          />

          {productSelected === "Com Camisa" ? (
            <Select
              onChange={setTShirtSize}
              title={"Selecione o tamanho da camisa"}
              options={tshirtSizes}
            />
          ) : null}

          <Button onClick={submitSignup} title={"Pagar com PIX"} />
        </div>
      </Container>

      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Empresas que apoiam
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <PixAiLogo />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <CloudFasterLogo />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <ActuarLogo />
            </div>
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <BDadosLogo />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10 md:justify-around">
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <MaximaLogo />
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}

function PixAiLogo() {
  return (
    <a href="https://pixai.com.br" target="_blank">
      <div className="">
        <Image
          src={"/images/pixai-logo-branco.png"}
          width="260"
          height="40"
          className={"object-cover"}
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </a>
  );
}
function CloudFasterLogo() {
  return (
    <a href="https://cloudfaster.com.br/" target="_blank">
      <div className="">
        <Image
          src={"/images/cloud-faster-branco.png"}
          width="260"
          height="40"
          className={"object-cover"}
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </a>
  );
}

function ActuarLogo() {
  return (
    <a href="https://app.actuar.com/" target="_blank">
      <div className="">
        <Image
          src={"/images/actuar-logo.jpg"}
          width="260"
          height="40"
          className={"object-cover"}
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </a>
  );
}

function BDadosLogo() {
  return (
    <a href="https://www.bdados.com.br/" target="_blank">
      <div className="">
        <Image
          src={"/images/bdados-logo.jpg"}
          width="260"
          height="40"
          className={"object-cover"}
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </a>
  );
}
function MaximaLogo() {
  return (
    <a href="https://maximatech.com.br/" target="_blank">
      <div className="">
        <Image
          src={"/images/maxima-logo.png"}
          width="260"
          height="40"
          className={"object-cover"}
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
    </a>
  );
}
