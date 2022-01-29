import { GlobalStyle } from './styles/global';
import { Header } from './components/Header/index';
import { Dashboard } from './components/Dashboard/index';
import Modal from 'react-modal';
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {

  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState<boolean>(false);

  function handleOpenNewTransactionModal (): void {
      setIsNewTransactionModalOpen(true);    
  }

  function handleCloseNewTransactionModal (): void {
      setIsNewTransactionModalOpen(false);    
  }   

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

      <GlobalStyle />
    </TransactionsProvider>
  );
}