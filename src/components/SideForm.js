"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Button from "@/components/home/button";
import Input from "@/components/home/input";
import Select from "@/components/home/select";
import eventando from "@/network/eventando";
import VMasker from "vanilla-masker";
import QRCode from "react-qr-code";

const options = [
  { value: "Sem comunidade", label: "Sem comunidade" },
  { value: "Anapolivre", label: "Anapolivre" },
  { value: "AWS User Group Goiânia", label: "AWS User Group Goiânia" },
  { value: "CS Meetup GO", label: "CS Meetup GO" },
  { value: "DevOpsGO", label: "DevOpsGO" },
  { value: "GAMEGO", label: "GAMEGO" },
  { value: "GDG Goiânia", label: "GDG Goiânia" },
  { value: "GOJava", label: "GOJava" },
  { value: "GUOCB", label: "GUOCB" },
  { value: "GynSec", label: "GynSec" },
  { value: "IxDA", label: "IxDA" },
  { value: "MulheresGO", label: "MulheresGO" },
  { value: "Override .Net Community", label: "Override .Net Community" },
  { value: "OWASP Goiânia", label: "OWASP Goiânia" },
  { value: "PorteraTech", label: "PorteraTech" },
  { value: "Product Camp Goiás", label: "Product Camp Goiás" },
  { value: "Reactivando", label: "Reactivando" },
  { value: "StartupGO", label: "StartupGO" },
];

const products = [
  {
    value: "Sem Camisa",
    label: "Inscrição sem camiseta - 2º Lote - R$ 140,00",
  },
];

const tshirtSizes = [
  { value: "XS", label: "Muito pequeno" },
  { value: "S", label: "Pequeno" },
  { value: "M", label: "Médio" },
  { value: "L", label: "Grande" },
  { value: "XL", label: "Muito Grande" },
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
  const [productSelected, setProduct] = useState(null);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        paymentOption: productSelectedId,
      });

      setPaymentResponse(response.data);
      setShowQRCode(true);

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setCommunity(options[0].value);
      setProduct(products[0].value);
      setTShirtSize(tshirtSizes[0].value);
    } catch (err) {
      alert("Houve um erro ao tentar fazer sua inscrição. Entre em contato.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowQRCode(false);
    setPaymentResponse(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
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
                    options={productsToList || products}
                    onChange={setProduct}
                    value={productSelected}
                  />

                  {productSelected === "Com Camisa" && (
                    <Select
                      onChange={setTShirtSize}
                      title="Selecione o tamanho da camisa"
                      options={tshirtSizes}
                      value={tshirtSize}
                    />
                  )}

                  <div className="pt-4">
                    <Button
                      onClick={handleSubmit}
                      title={isLoading ? "Processando..." : "Pagar com PIX"}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ) : (
                /* QR Code Content */
                <div className="text-center space-y-6">
                  <div className="bg-gray-50 dark:bg-dark-700 p-6 rounded-lg">
                    <QRCode
                      size={200}
                      value={paymentResponse?.qr_code || ""}
                      className="mx-auto"
                    />
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    Escaneie o QR Code acima para realizar o pagamento
                  </p>

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        paymentResponse?.qr_code || ""
                      )
                    }
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Copiar QR Code
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
