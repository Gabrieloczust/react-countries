import { render, screen } from "@testing-library/react"

import React from "react"
import Container from "../../components/Container"

describe("Testing Container Componenet", () => {
    it("should be able to show the container element with text Hello World!", () => {
        render(<Container children="Hello World!" />)
        expect(screen.getByTestId("container-component").textContent).toBe("Hello World!")
    })
})  