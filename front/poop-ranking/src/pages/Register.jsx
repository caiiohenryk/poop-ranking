import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { instance } from '../utils/instance'

function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setErrorMessage('') // Reset error message

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        // Frontend validation
        if (!validateEmail(data.email)) {
            setErrorMessage('Por favor, insira um email válido.')
            setIsLoading(false)
            return
        }

        try {
            const response = await instance.post('/user/register', data)
            alert('Cadastro realizado com sucesso!')
            navigate('/login')
        } catch (error) {
            setErrorMessage('Erro ao registrar. Por favor, tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    return (
        <div className="flex h-full flex-1 items-center flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    cadastre-se!
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-5 rounded shadow-md" >
                    <div>
                        <label htmlFor="nome" className="block text-sm/6 font-medium text-gray-900">
                            nome
                        </label>
                        <div className="mt-2">
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                aria-label="Nome completo"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                aria-label="Endereço de email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            senha
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                aria-label="Senha"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm/6">{errorMessage}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'carregando...' : 'registrar'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    já tem uma conta?{' '}
                    <NavLink to={'/login'} className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                        faça login aqui
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Register