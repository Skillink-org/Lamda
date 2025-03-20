// Manages global state using React Context API.
import React, { createContext, useContext, useState } from 'react';

const defaultData = {
    //here you can add deafult data here
    
};

const DataContext = createContext(null);

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);

    const updateData = (newData) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const resetData = () => {
        setData(defaultData);
    };

    return (
        <DataContext.Provider value={{ data, setData: updateData, resetData }}>
            {children}
        </DataContext.Provider>
    );
};
