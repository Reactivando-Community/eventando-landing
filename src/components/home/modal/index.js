import { useEffect, useState } from "react";

const Modal = ({
  title,
  description,
  children,
  onClick,
  buttonTitle,
  visible,
  handleVisible,
}) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);

    if (visible) {
      // Verifica se o usuário está próximo ao final da página
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      if (isNearBottom) {
        // Se estiver no final, faz scroll suave para o topo para mostrar a modal
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      document.body.classList.add("overflow-y-hidden");
      return;
    }

    document.body.classList.remove("overflow-y-hidden");
  }, [visible]);

  const handleShow = () => {
    if (handleVisible) {
      handleVisible();
    }
  };

  return (
    <div
      //   id="static-modal"
      data-modal-backdrop="static"
      //   tabindex="-1"
      //   aria-hidden="true"
      className={`${!show ? "hidden" : "flex"} `}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
        className=" bg-black bg-opacity-50 justify-center items-center"
      >
        <div className="ml-2  p-4  opacity-100 lg:w-1/3">
          <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
                onClick={() => {
                  setShow(false);
                  handleShow();
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Fechar</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {description}
              </p>
              {children}
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={onClick}
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {buttonTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
