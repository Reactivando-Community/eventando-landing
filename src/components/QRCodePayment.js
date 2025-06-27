"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import eventando from "../network/eventando";

export default function QRCodePayment({ paymentResponse, onBackToForm, onStatusChange }) {
  const [paymentStatus, setPaymentStatus] = useState("PEDING_PAYMENT"); // PEDING_PAYMENT, CONFIRMED, CANCELED, REFUND
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos

  // Notificar mudança de status para o componente pai
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(paymentStatus);
    }
  }, [paymentStatus, onStatusChange]);

  // Polling para verificar status do pagamento
  useEffect(() => {
    if (!paymentResponse || paymentStatus !== "PEDING_PAYMENT") return;

    const checkPayment = async () => {
      try {
        let response = await eventando.payment.detail({
          id: paymentResponse.payment_id,
        });

        const status = response.data.data.attributes.status;
        
        if (status === "CONFIRMED") {
          setPaymentStatus("CONFIRMED");
          clearInterval(confirmationPaymentInterval);
        } else if (status === "CANCELED") {
          setPaymentStatus("CANCELED");
          clearInterval(confirmationPaymentInterval);
        } else if (status === "REFUND") {
          setPaymentStatus("REFUND");
          clearInterval(confirmationPaymentInterval);
        }
      } catch (err) {
        setPaymentStatus("error");
      }
    };

    // Verificar a cada 1 segundo
    const confirmationPaymentInterval = setInterval(checkPayment, 1000);

    return () => clearInterval(confirmationPaymentInterval);
  }, [paymentResponse, paymentStatus]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setPaymentStatus("expired");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleBackToForm = () => {
    // Se o pagamento não estiver mais aguardando, pode sair sem alerta
    if (paymentStatus !== "PEDING_PAYMENT") {
      onBackToForm();
      return;
    }

    // Se ainda estiver aguardando, mostra alerta de confirmação
    const confirmar = window.confirm(
      "Tem certeza que deseja voltar ao formulário? A compra será cancelada."
    );
    if (confirmar) {
      onBackToForm();
    }
  };

  const handleCopyQRCode = () => {
    navigator.clipboard.writeText(paymentResponse?.qr_code || "");
    // TODO: Adicionar toast de confirmação
    alert("QR Code copiado para a área de transferência!");
  };

  return (
    <div className="text-center space-y-6">
      {/* Status do pagamento */}
      <div className="flex items-center justify-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          paymentStatus === "PEDING_PAYMENT" ? "bg-yellow-400 animate-pulse" :
          paymentStatus === "CONFIRMED" ? "bg-green-400" :
          paymentStatus === "CANCELED" ? "bg-red-400" :
          paymentStatus === "REFUND" ? "bg-orange-400" :
          paymentStatus === "expired" ? "bg-red-400" :
          "bg-gray-400"
        }`} />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {paymentStatus === "PEDING_PAYMENT" && "Aguardando pagamento..."}
          {paymentStatus === "CONFIRMED" && "Pagamento confirmado!"}
          {paymentStatus === "CANCELED" && "Pagamento cancelado"}
          {paymentStatus === "REFUND" && "Pagamento reembolsado"}
          {paymentStatus === "expired" && "Tempo expirado"}
          {paymentStatus === "error" && "Erro no pagamento"}
        </span>
      </div>

      {/* Timer */}
      {paymentStatus === "PEDING_PAYMENT" && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Tempo restante: {formatTime(timeLeft)}
        </div>
      )}

      {/* QR Code */}
      <div className="bg-gray-50 dark:bg-dark-700 p-6 rounded-lg">
        <QRCode
          size={200}
          value={paymentResponse?.qr_code || ""}
          className="mx-auto"
        />
      </div>

      {/* Instruções */}
      <p className="text-gray-600 dark:text-gray-300">
        {paymentStatus === "PEDING_PAYMENT" && "Escaneie o QR Code acima para realizar o pagamento"}
        {paymentStatus === "CONFIRMED" && "Pagamento realizado com sucesso! Você receberá uma confirmação por email."}
        {paymentStatus === "CANCELED" && "O pagamento foi cancelado. Tente novamente."}
        {paymentStatus === "REFUND" && "O pagamento foi reembolsado. Entre em contato para mais informações."}
        {paymentStatus === "expired" && "O tempo para pagamento expirou. Tente novamente."}
        {paymentStatus === "error" && "Houve um erro no pagamento. Tente novamente."}
      </p>

      {/* Botões */}
      <div className="space-y-3">
        {paymentStatus === "PEDING_PAYMENT" && (
          <button
            onClick={handleCopyQRCode}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Copiar QR Code
          </button>
        )}

        {(paymentStatus === "expired" || paymentStatus === "CANCELED" || paymentStatus === "error") && (
          <button
            onClick={handleBackToForm}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        )}

        {paymentStatus === "REFUND" && (
          <button
            onClick={handleBackToForm}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Entendi
          </button>
        )}

        {paymentStatus === "CONFIRMED" && (
          <button
            onClick={handleBackToForm}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Finalizar
          </button>
        )}

        {paymentStatus === "PEDING_PAYMENT" && (
          <button
            onClick={handleBackToForm}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Voltar ao formulário
          </button>
        )}
      </div>
    </div>
  );
} 