import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;    
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface Transaction {    
    id: number;
    title: string;
    amount: number;    
    type: string;
    category: string ;
    createdAt: string;
}

// MANEIRAS DE 'COPIAR' UMA INTERFACE

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: 'income' | 'outcome';
//     category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// type TransactionInput =  Pick<Transaction, 'title'| 'amount' | 'type' | 'category'>





const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [ transactions, setTransactions ] = useState<Transaction[]>([]);

    useEffect(() =>{
        api.get('transactions')            
            .then(response => {
                setTransactions(response.data.transactions);
            })
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {        
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });                 
        setTransactions([...transactions, response.data.transaction]);
    }

    return (
        <TransactionsContext.Provider value={{
            transactions,
            createTransaction            
        }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}