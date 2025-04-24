import { useState, useEffect } from 'react'
import RankCard from '../components/RankCard'
import { instance } from '../utils/instance'
import { getUserId } from '../utils/getUserId'

function Ranking() {
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [people, setPeople] = useState([])

    const token = sessionStorage.getItem('token')

    const userId = getUserId(token)

    const poop = async () => {
        try {
            const response = await instance.post(`/poop/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            alert('Cocô registrado com sucesso!')
            await getRanking()
        } catch (error) {
            setErrorMessage('Erro ao registrar o cocô.')
            console.error('Error posting poop:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getRanking = async () => {
        try {
            const response = await instance.get('/poop/ranking', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            setPeople(response.data.ranking)
        } catch (error) {
            setErrorMessage('Erro ao carregar o ranking.')
            console.error('Error fetching ranking:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getRanking()
    }, [])

    return (
        <div className='h-full flex flex-col gap-5 items-center justify-center'>
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                ranking da merda
            </h2>

            <button onClick={poop} className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                cagar!
            </button>

            <ul className="bg-white w-80 rounded-lg shadow p-6 divide-y divide-gray-200">
                {people.map((person) => (
                    <RankCard
                        key={person.userId}
                        name={person.nome}
                        poops={person.count}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Ranking