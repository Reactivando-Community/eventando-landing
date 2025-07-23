"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/home/button";
import Input from "@/components/home/input";
import Select from "@/components/home/select";
import eventando from "@/network/eventando";
import VMasker from "vanilla-masker";
import QRCodePayment from "@/components/QRCodePayment";
import { communities } from "@/app/communities/communities";

const options = [
  { value: "Sem comunidade", label: "Sem comunidade" },
  ...communities
    .map((community) => ({
      value: community.name,
      label: community.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label)),
];

const tshirtSizes = [
  { value: "XS", label: "PP" },
  { value: "S", label: "P" },
  { value: "M", label: "M" },
  { value: "L", label: "G" },
  { value: "XL", label: "GG" },
  { value: "XXL", label: "XGG" },
];

export default function SideForm({
  isOpen,
  onClose,
  productsToList,
  productSelectedId,
}) {
  const [communitySelected, setCommunity] = useState(options[0].value);
  const [tshirtSize, setTShirtSize] = useState(tshirtSizes[0].value);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productSelected, setProduct] = useState("");
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PEDING_PAYMENT");

  useEffect(() => {
    console.log(productSelected);
  }, [productSelected]);

  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      alert("Preencha corretamente todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      const response = await eventando.event.signup({
        name,
        email,
        phoneNumber: phone,
        additionalInformation: communitySelected,
        tShirtSize: tshirtSize,
        paymentOption: Number(productSelected),
      });

      setPaymentResponse(response.data);
      setShowQRCode(true);

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setCommunity(options[0].value);
      setProduct(productsToList[0].value);
      setTShirtSize(tshirtSizes[0].value);
    } catch (err) {
      alert("Houve um erro ao tentar fazer sua inscrição. Entre em contato.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (showQRCode && paymentStatus === "PEDING_PAYMENT") {
      return;
    }
    setShowQRCode(false);
    setPaymentResponse(null);
    setPaymentStatus("PEDING_PAYMENT");
    onClose();
  };

  const handleBackToForm = () => {
    setShowQRCode(false);
    setPaymentResponse(null);
    setPaymentStatus("PEDING_PAYMENT");
  };

  const handlePaymentStatusChange = (status) => {
    setPaymentStatus(status);
  };

  useEffect(() => {
    console.log(productSelected);
  }, [productSelected]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-sm z-40 ${
              showQRCode && paymentStatus === "PEDING_PAYMENT"
                ? "bg-black/70 cursor-not-allowed"
                : "bg-black/50"
            }`}
            onClick={
              showQRCode && paymentStatus === "PEDING_PAYMENT"
                ? undefined
                : handleClose
            }
          />

          {/* Side Form */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-800 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {showQRCode ? "Pagamento" : "Inscrição"}
                </h2>
                {(!showQRCode || paymentStatus !== "PEDING_PAYMENT") && (
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {!showQRCode ? (
                /* Form Content */
                <div className="space-y-6">
                  <Input
                    title="Nome completo"
                    type="text"
                    value={name}
                    placeholder="Digite seu nome completo"
                    onChange={setName}
                  />

                  <Input
                    title="Email"
                    type="email"
                    placeholder="Digite seu melhor email"
                    value={email}
                    onChange={setEmail}
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
                    title="Selecione sua comunidade"
                    options={options}
                    value={communitySelected}
                  />

                  <Select
                    title="Selecione o ingresso"
                    options={productsToList}
                    onChange={setProduct}
                    value={productSelected}
                  />

                  {(() => {
                    const selectedProduct = productsToList.find(
                      (p) => p.value == productSelected
                    );
                    const hasShirt =
                      selectedProduct &&
                      selectedProduct.label &&
                      selectedProduct.label
                        .toLowerCase()
                        .includes("com camisa");

                    return (
                      hasShirt && (
                        <Select
                          onChange={setTShirtSize}
                          title="Selecione o tamanho da camisa"
                          options={tshirtSizes}
                          value={tshirtSize}
                        />
                      )
                    );
                  })()}

                  <div className="pt-4 space-y-3">
                    <Button
                      onClick={handleSubmit}
                      title={isLoading ? "Processando..." : "Pagar com PIX"}
                      disabled={isLoading}
                    />
                    
                    <a
                      href="https://doity.com.br/join-community--12-edicao"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Pagar com Cartão de Crédito
                    </a>
                  </div>
                </div>
              ) : (
                /* QR Code Content */
                <QRCodePayment
                  paymentResponse={paymentResponse}
                  onBackToForm={handleBackToForm}
                  onStatusChange={handlePaymentStatusChange}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
