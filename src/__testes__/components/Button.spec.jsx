import { render, screen } from "@testing-library/react"

import React from "react"
import Button from "../../components/Button"

describe("Testing Button Componenet", () => {
    it("should be able to show the button element with text Send", () => {
        render(<Button children="Send" />)
        expect(screen.getByTestId("button-component").textContent).toBe("Send")
    })
})  