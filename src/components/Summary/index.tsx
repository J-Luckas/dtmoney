import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';
import { Container } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {

    const { transactions } = useTransactions();

    const summary = transactions.reduce((accumulator, transaction) => {
        if(transaction.type === 'deposit') {
            accumulator.deposits += transaction.amount;
            accumulator.total += transaction.amount;
        } else {
            accumulator.withdraws += transaction.amount;
            accumulator.total -= transaction.amount;
        }
        
        return accumulator;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });

    return (
        <Container>            
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImage} alt="Imagem de entrada" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'

                        }).format(Number(summary.deposits))}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImage} alt="Imagem de Saída" />
                </header>
                <strong> 
                    - { new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'

                    }).format(Number(summary.withdraws))}
                    
                </strong>
            </div>
            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImage} alt="Imagem de total" />
                </header>
                <strong>
                    { new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'

                    }).format(Number(summary.total))}
                </strong>
            </div>
        </Container>
    );
}