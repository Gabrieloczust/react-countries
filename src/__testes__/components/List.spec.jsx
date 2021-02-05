import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import React from "react"
import List from "../../components/List"

describe("Testing List Componenet", () => {
    it("should be able to show the container element with <li>", () => {
        render(
            <List
                list={[
                    {
                        name: 'Nome',
                        value: 'Brazil'
                    },
                    {
                        name: 'Capital',
                        value: 'Brasília'
                    },
                    {
                        name: 'Área',
                        value: '1316561'
                    },
                    {
                        name: 'População',
                        value: '78641665413'
                    },
                    {
                        name: 'Domínio',
                        value: '.br'
                    },
                ]}
            />
        )

        expect(screen.getByText(/Nome/i)).toBeInTheDocument()
    })
})  