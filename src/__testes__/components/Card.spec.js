import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'

import React from "react"
import Card from "../../components/Card"
import "@testing-library/jest-dom"

describe("Testing Card Componenet", () => {
    test('should have a attribute  title equal Brazil and text equal Capital: Brazilia', () => {
        render(
            <Router>
                <Card to="/" name="Brazil" capital="Brazilia" bandeira="brazil.jpg" />
            </Router>
        )
        
        expect(screen.getByTestId("card-component")).toHaveAttribute('title', 'Brazil')
        expect(screen.getByTestId("card-component")).toHaveTextContent('Capital: Brazilia')
    });
})