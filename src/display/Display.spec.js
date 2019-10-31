// Test away!
import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Display from "./Display";

// Snapshot Testing
test("<Display /> snapshot", () => {
  const wrapper = rtl.render(<Display />);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

describe("Display Tests", () => {
    it("It displays closed and locked on load", () => {
        const wrapper = rtl.render(<Display />);
        const lock = wrapper.getByText(/unlocked/i)
        const gate = wrapper.getByText(/open/i)

        expect(lock).toBeVisible();
        expect(gate).toBeVisible();
    })

    it ('Display items have the correct classes on load', ()=> {
        const wrapper = rtl.render(<Display />);
        const lock = wrapper.getByText(/unlocked/i)
        const gate = wrapper.getByText(/open/i)

        // I'm debating if class names counts as behavior or implementation
        // Class names are prone to change so having a data attribute would be better
        expect(lock).toHaveClass('green-led')
        expect(gate).toHaveClass('led green-led')
    })
})