import { createContext, useState } from "react";

export const CourtOwnerContext = createContext();

export const CourtOwnerProvider = ({ children }) => {
  const [courtInfo, setCourtInfo] = useState(null);

  const [courtService, setCourtService] = useState([]);

  const [courtCodeList, setCourtCodeList] = useState([]);

  const [totalSlot, setTotalSlot] = useState(null);

  return (
    <CourtOwnerContext.Provider
      value={{
        courtInfo,
        setCourtInfo,
        courtService,
        setCourtService,
        courtCodeList,
        setCourtCodeList,
        totalSlot,
        setTotalSlot,
      }}
    >
      {children}
    </CourtOwnerContext.Provider>
  );
};
