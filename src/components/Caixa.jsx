import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Caixa = () => {
  const { data, isLoading, error, mutate } = useSWR(
    "https://api.adviceslip.com/advice",
    fetcher,
  );
  const isMobile = useMediaQuery("(max-width:1024px)");
  const [isDesabled, setIsdesabled] = useState(false)

  function reRequest() {
    mutate()// faz refetch
    setIsdesabled(true)// desabilita o botão
    setTimeout(() => {// espera 2s e executa code
        setIsdesabled(false)// habilita o botão
    }, 2000);
  }

  return (// aparencia -> tamanho/espaçamento -> layout/estrutura
    <div className="bg-[#313a49] font-principal font-extrabold rounded-2xl w-[90%] lg:w-130 max-lg:landscape:w-[60%] p-7 py-16 relative">
      <div className="flex flex-col gap-y-7 items-center justify-center text-center">
        <span className="text-[#53ffab] text-[14px] tracking-[3px]">ADVICE #{isLoading ? "?" : data?.slip?.id}</span>
        {error 
            ? <p className="text-red-600">erro in request data</p> 
            : <p className="text-gray-300 ">{isLoading ? "Loading..." : `"${data?.slip?.advice}"`}</p>
        }
        <div>
          <img src={isMobile
                ? "/advice-generatorApp/images/pattern-divider-mobile.svg"
                : "/advice-generatorApp/images/pattern-divider-desktop.svg"
            }
            alt="Two lines"
            className="select-none w-full m-auto h-auto"
          />
        </div>
      </div>
      <button disabled={isDesabled} onClick={() => reRequest()} className="shadow-[#53ffab] disabled:hover:shadow-none disabled:cursor-not-allowed disabled:bg-[#53ffab]/60 shadow-none hover:shadow-[0px_0px_40px_3px] cursor-pointer rounded-full w-17 h-17 bg-[#53ffab] -bottom-18 left-1/2 -translate-1/2 absolute flex items-center justify-center">
        <img src="/advice-generatorApp/images/icon-dice.svg" alt="icon dice" className="bg-[#53ffab] select-none h-auto" />
      </button>
    </div>
  );
};

export default Caixa;
