import { useState, useEffect } from 'react'
import RankCard from '../components/RankCard'
import { instance } from '../utils/instance'
import { getUserId } from '../utils/getUserId'
import { NavLink } from 'react-router-dom'

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

    const unpoop = async () => {
        try {
            const response = await instance.delete(`/poop/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
            alert('Cocô descagado com sucesso!')
            await getRanking()
        } catch (error) {
            setErrorMessage('Erro ao descagar o cocô.')
            console.error('Error deleting poop:', error)
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

            {token ? (
                <>
                    <div className='flex flex-row gap-9 items-center justify-center'>
                        <button onClick={unpoop} className="cursor-pointer font-semibold text-gray-900">
                            <img className='w-15' src="/paper.png" alt="paper" />
                            <p>descague!</p>
                        </button>
                        <button onClick={poop} className="cursor-pointer font-semibold text-gray-900">
                            <img className='w-15' src="/poop.webp" alt="poop" />
                            <p>cague!</p>
                        </button>
                    </div>

                    <ul className="bg-white w-80 rounded-lg shadow p-6 divide-y divide-gray-200">
                        {isLoading ? (
                            <p className="text-center text-gray-500">Carregando...</p>
                        ) : errorMessage ? (
                            <p className="text-center text-red-500">{errorMessage}</p>
                        ) : people.length === 0 ? (
                            <p className="text-center text-gray-500">Nenhum ranking encontrado.</p>
                        ) : (
                            people.map((person, index) => (
                                <RankCard key={index} name={(person.nome).toLowerCase()} email={person.email} poops={person.count} />
                            ))
                        )}
                    </ul>
                </>
            ) : (
                <div className="flex flex-col gap-5 items-center justify-center">
                    <h2 className="text-center text-2xl/9 tracking-tight text-gray-900">
                        você não está logado! faça o <NavLink to={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">login</NavLink> ou <NavLink to={'/register'} className="font-semibold text-indigo-600 hover:text-indigo-500">cadastre-se</NavLink> para ver o ranking
                    </h2>
                    <img className='w-15' src="/poop.webp" alt="poop" />
                </div>
            )}

        </div>
    )
}

export default Ranking