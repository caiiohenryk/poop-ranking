import React from 'react'

function RankCard(props) {
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{props.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{props.email}</p>
                </div>
            </div>
            <div className="shrink-0 flex items-center justify-center gap-2">
                <i class="fa-solid fa-poop" />
                <p className="text-sm/6 font-semibold text-gray-900"> {props.poops}</p>
            </div>
        </li>
    )
}

export default RankCard