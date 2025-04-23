import React from 'react'
import RankCard from '../components/RankCard'

function Ranking() {

    const people = [
        {
            name: 'Leslie Alexander',
            poops: 30,
        },
        {
            name: 'Michael Foster',
            poops: 25,
        },
        {
            name: 'Lindsay Walton',
            poops: 20,
        },
        {
            name: 'Courtney Henry',
            poops: 15,
        },
        {
            name: 'Tom Cook',
            poops: 10,
        },
        {
            name: 'Carlo Albino',
            poops: 5,
        },
    ]

    return (
        <div className='w-80'>
            <h2 className="mb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                ranking da merda
            </h2>

            <ul role="list" className="bg-white rounded-lg shadow p-6 divide-y divide-gray-200">
                {people.map((person) => (
                    <RankCard
                        key={person.id}
                        name={person.name}
                        poops={person.poops}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Ranking